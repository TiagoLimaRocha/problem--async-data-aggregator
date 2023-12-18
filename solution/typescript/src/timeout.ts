import { NotFoundError, TimeoutError } from './exception';
import { MAX_TIMEOUT, MAX_RETRIES } from './types';

/**
 * Executes a callback function with a timeout.
 * @param callback - The callback function to execute.
 * @param retry - The number of times to retry the callback function if it times out. Default is 0.
 * @returns A promise that resolves with the result of the callback function or rejects with an error if it times out.
 */
export async function timeout<T>(callback: Function, retry = 0): Promise<T> {
  let pid: NodeJS.Timeout;

  const timeoutPromise = new Promise<T>((_, reject) => {
    pid = setTimeout(async () => {
      reject(new TimeoutError(`Timeout after ${MAX_TIMEOUT}ms`));
    }, MAX_TIMEOUT);
  });

  const callbackPromise = new Promise<T>((resolve, reject) => {
    callback(resolve, reject);
  });

  return Promise.race([timeoutPromise, callbackPromise])
    .then((fulfilled) => fulfilled)
    .catch((rejected) => {
      if (rejected instanceof NotFoundError) {
        throw rejected;
      }

      if (retry < MAX_RETRIES) {
        console.warn('Oops, request timed out!');
        console.info(`Retrying request...`);
        return timeout(callback, retry + 1);
      }
      return rejected;
    })
    .finally(() => {
      clearTimeout(pid);
    });
}
