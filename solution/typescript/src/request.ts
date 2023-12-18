import { NotFoundError } from './exception';
import * as dataSources from './data.json';
import { DataSource, Data } from './types';

/**
 * Makes an asynchronous request to a data source.
 * @param source The data source to request from.
 * @returns A promise that resolves to the requested data.
 * @throws {NotFoundError} If the data source is unknown.
 */
export async function request(source: DataSource) {
  return new Promise<Data>((resolve, reject) => {
    setTimeout(() => {
      const result: Data = dataSources[source];

      if (!result) {
        const error = new NotFoundError(`Unknown data source: ${source}`);
        console.error(error);
        reject(error);
      }

      resolve(result);
    }, Math.random() * 10000);
  });
}
