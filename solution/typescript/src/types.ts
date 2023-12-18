import * as dataSources from './data.json';

export const MAX_TIMEOUT = 5000; // 5 seconds
export const MAX_RETRIES = 3;

export enum DataSourceEnum {
  DataSource1 = 'dataSource1',
  DataSource2 = 'dataSource2',
  DataSource3 = 'dataSource3',
}

export enum PromiseStatusEnum {
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
}

export type DataSource = keyof typeof dataSources;

export type Data = typeof dataSources[DataSource];

export type Resolve<T> = (value: T | PromiseLike<T>) => void

export type Reject = (reason?: any) => void;
