export interface IPieChartOptions {
  title: string,
  description?: string,
  options: {
    xColumn: string,
    yColumn: string,
    serieName?: string,
    legend?: boolean,
    showDataLabels?: boolean,
    numberFormat?: string,
    valuesOptions?: {
      name: string,
      color: string
    }[]
  }
}

export interface IPieChartConfig {
  apiEndpoint: string,
  options: IPieChartOptions
}