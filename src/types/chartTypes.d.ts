export interface DatasetType {
  label: string;
  data: string[];
  borderColor?: string;
  backgroundColor?: string;
}

export interface ChartDataType {
  labels?: string[];
  datasets: Dataset[];
}
