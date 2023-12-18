import { timeout } from './timeout';
import { request } from './request';
import { Data, DataSource, PromiseStatusEnum, Reject, Resolve } from './types';

/**
 * Aggregates data from multiple sources asynchronously.
 * @param sources An array of DataSource objects representing the data sources.
 * @returns A Promise that resolves to the aggregated data.
 * @throws If an error occurs during the aggregation process.
 */
export async function aggregateData(sources: DataSource[]) {
  try {
    const promises = sources.map(async (source) => {
      return timeout<Data>(async (resolve: Resolve<Data>, reject: Reject) => {
        request(source)
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      });
    });

    const data = await Promise.allSettled(promises);

    return data.reduce((acc, curr) => {
      if (curr.status === PromiseStatusEnum.Rejected) {
        console.error(curr.reason);
        return acc;
      }

      const { data } = curr.value;

      return {
        ...acc,
        ...data,
      };
    }, {});
  } catch (error) {
    throw error;
  }
}
