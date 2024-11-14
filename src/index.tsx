import {
  Module,
  customModule,
  ControlElement,
  customElements,
  Container,
  IDataSchema,
  HStack,
  Label,
  VStack,
  Styles,
  Panel,
  Button,
  IUISchema,
  Modal
} from '@ijstech/components';
import { ScomCharts, formatNumberByFormat } from '@scom/scom-charts';
import { IPieChartConfig, IPieChartOptions } from './interfaces';
import dataJson from './data.json';
import { getBuilderSchema, getEmbedderSchema } from './formSchema';

import types from './dts/index';
const Theme = Styles.Theme.ThemeVars;

interface ScomPieChartElement extends ControlElement {
  lazyLoad?: boolean;
  data: IPieChartConfig
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-pie-chart']: ScomPieChartElement;
    }
  }
}

interface ICustomWidget {
  showConfigurator: (parent: Modal, prop: string) => void;
  register: () => { types: string; defaultData: IPieChartConfig };
}

@customModule
@customElements('i-scom-pie-chart', {
  icon: 'chart-pie',
    className: 'ScomPieChart',
    props: {
      data: {type: 'object'}
    },
    events: {}
})
export default class ScomPieChart extends ScomCharts<IPieChartOptions> implements ICustomWidget {
  static async create(options?: ScomPieChartElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: ScomPieChartElement) {
    super(parent, options);
  }

  register() {
    return { types, defaultData: dataJson.defaultBuilderData as IPieChartConfig };
  }

  getFormSchema(columns: string[]) {
    return {
      builderSchema: getBuilderSchema(columns),
      embededSchema: getEmbedderSchema(columns)
    }
  }

  getChartData(options?: IPieChartOptions) {
    if (!options) return;
    const { xColumn, yColumn, legend, showDataLabels, serieName, numberFormat, valuesOptions, padding = {} } = options;
    let _legend = {
      show: legend?.show,
    }
    if (legend) {
      if (legend.position) {
        _legend[legend.position] = 'auto';
        if (['left', 'right'].includes(legend.position)) {
          _legend['orient'] = 'vertical';
        }
      }
      if (legend.scroll) {
        _legend['type'] = 'scroll';
      }
      if (legend.fontColor) {
        _legend['textStyle'] = { color: legend.fontColor };
      }
    }
    const data = this.chartData.map((v) => {
      const values = valuesOptions.find(f => f.name === v[xColumn]);
      return {
        value: v[yColumn],
        name: values?.name || v[xColumn],
        itemStyle: values ? { color: values.color } : undefined,
        label: showDataLabels ? {
          show: true,
          position: 'inside',
          formatter: function (params: any) {
            return params.percent >= 5 ? params.percent + '%' : '';
          }
        } : undefined
      }
    });

    const gridPadding = {
      top: padding.top || 60,
      bottom: padding.bottom || 60,
      left: padding.left || '10%',
      right: padding.right || '10%'
    }
    const _chartData: any = {
      tooltip: {
        trigger: 'item',
        position: function (point: any, params: any, dom: any, rect: any, size: any) {
          var x = point[0];
          var y = point[1];
          var viewWidth = document.documentElement.clientWidth;
          var viewHeight = document.documentElement.clientHeight;
          var boxWidth = size.contentSize[0];
          var boxHeight = size.contentSize[1];
          // calculate x position of tooltip
          if (x + boxWidth > viewWidth) {
            x = x - boxWidth;
          }
          // calculate y position of tooltip
          if (y + boxHeight > viewHeight) {
            y = y - boxHeight;
          }
          if (x < 0) x = 0;
          if (y < 0) y = 0;
          return [x, y];
        },
        formatter: (params: any) => {
          return `<b>${params.name}</b> <br />
            ${params.marker} ${params.seriesName}: ${formatNumberByFormat(params.value, numberFormat)}`;
        }
      },
      legend: _legend,
      grid: {
        ...gridPadding
      },
      series: [
        {
          name: serieName || yColumn,
          data: data,
          type: 'pie',
          radius: ['40%', '70%'],
          label: {
            show: false,
            formatter: '{d}%'
          }
        }
      ]
    };
    return { chartData: _chartData, defaulBuildertData: dataJson.defaultBuilderData as IPieChartConfig };
  }

  async init() {
    super.init();
  }
}