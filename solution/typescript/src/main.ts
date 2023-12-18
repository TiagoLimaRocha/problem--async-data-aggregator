import { aggregateData } from "./aggregator";
import { DataSource, DataSourceEnum } from "./types";


async function main() {
  const sources = [...Object.values(DataSourceEnum), 'unknown' as DataSource];
  const data = await aggregateData(sources);

  console.log({ data });
}

main();