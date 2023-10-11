import { BigNumber } from "@ijstech/eth-wallet";
import { ModeType } from "@scom/scom-chart-data-source-setup"

export interface IPieChartOptions {
  xColumn?: string,
  yColumn?: string,
  serieName?: string,
  legend?: {
    show?: boolean,
    fontColor?: string,
    scroll?: boolean,
    position?: 'top' | 'bottom' | 'left' | 'right' // top, bottom: horizontal -- left, right: vertical
  },
  padding?: {
    top?: number,
    bottom?: number,
    left?: number,
    right?: number
  },
  showDataLabels?: boolean,
  numberFormat?: string,
  valuesOptions?: {
    name: string,
    color: string
  }[]
}

export interface IPieChartConfig {
  dataSource: string;
  queryId?: string;
  apiEndpoint?: string;
  title: string,
  description?: string,
  options: IPieChartOptions,
  file?: {
    cid: string,
    name: string
  },
  mode: ModeType
}

export interface IFormatNumberOptions {
  precision?: number;
  roundingMode?: BigNumber.RoundingMode;
}
