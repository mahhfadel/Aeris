export interface DataDashboardResponse {
  name: string;
  value: number;
  fill: string;
  [key: string]: string | number; 
}

export interface DashboardResponse {
  titulo: string;
  descricao: string;
  values: DataDashboardResponse[];
}