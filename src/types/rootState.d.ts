export interface DataPayload {
  measures: string[];
  dimension: string;
}

export interface Column {
  name: string;
  function: string;
}

export interface Data {
  name: string;
  values: string[];
}

export default interface RootState {
  columns: Column[];
  data: Data[];
}
