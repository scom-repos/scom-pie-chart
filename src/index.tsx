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
  PieChart
} from '@ijstech/components';
import { IPieChartConfig, IPieChartOptions, callAPI, formatNumberByFormat } from './global/index';
import { chartStyle, containerStyle } from './index.css';
import assets from './assets';
import dataJson from './data.json';
const Theme = Styles.Theme.ThemeVars;
const currentTheme = Styles.Theme.currentTheme;

const options = {
  type: 'object',
  properties: {
    xColumn: {
      type: 'string',
      title: 'X column',
      required: true
    },
    yColumn: {
      type: 'string',
      title: 'Y column',
      required: true
    },
    serieName: {
      type: 'string'
    },
    numberFormat: {
      type: 'string'
    },
    legend: {
      type: 'object',
      title: 'Show Chart Legend',
      properties: {
        show: {
          type: 'boolean'
        },
        scroll: {
          type: 'boolean'
        },
        position: {
          type: 'string',
          enum: ['top', 'bottom', 'left', 'right']
        }
      }
    },
    showDataLabels: {
      type: 'boolean'
    },
    valuesOptions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            required: true
          },
          color: {
            type: 'string',
            format: 'color',
            required: true
          }
        }
      }
    }
  }
}

interface ScomPieChartElement extends ControlElement {
  data: IPieChartConfig
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-pie-chart']: ScomPieChartElement;
    }
  }
}

@customModule
@customElements('i-scom-pie-chart')
export default class ScomPieChart extends Module {
  private pieChartContainer: VStack;
  private vStackInfo: HStack;
  private pnlPieChart: Panel;
  private loadingElm: Panel;
  private lbTitle: Label;
  private lbDescription: Label;
  private pieChartData: { [key: string]: string | number }[] = [];
  private apiEndpoint = '';

  private _data: IPieChartConfig = { apiEndpoint: '', title: '', options: undefined };
  tag: any = {};
  defaultEdit: boolean = true;
  readonly onConfirm: () => Promise<void>;
  readonly onDiscard: () => Promise<void>;
  readonly onEdit: () => Promise<void>;

  static async create(options?: ScomPieChartElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: ScomPieChartElement) {
    super(parent, options);
  }

  private getData() {
    return this._data;
  }

  private async setData(data: IPieChartConfig) {
    this._data = data;
    this.updateChartData();
  }

  private getTag() {
    return this.tag;
  }

  private async setTag(value: any) {
    const newValue = value || {};
    for (let prop in newValue) {
      if (newValue.hasOwnProperty(prop)) {
        this.tag[prop] = newValue[prop];
      }
    }
    this.width = this.tag.width || 700;
    this.height = this.tag.height || 500;
    this.onUpdateBlock();
  }

  private getEmbeddersJSONSchema() {
    const propertiesSchema = {
      type: 'object',
      properties: {
        apiEndpoint: {
          type: 'string',
          title: 'API Endpoint',
          required: true
        },
        title: {
          type: 'string',
          required: true
        },
        description: {
          type: 'string'
        },
        options
      }
    }
    return propertiesSchema as any;
  }

  private getGeneralSchema() {
    const propertiesSchema = {
      type: 'object',
      required: ['apiEndpoint', 'title'],
      properties: {
        apiEndpoint: {
          type: 'string'
        },
        title: {
          type: 'string'
        },
        description: {
          type: 'string'
        }
      }
    }
    return propertiesSchema as IDataSchema;
  }

  private getAdvanceSchema() {
    const propertiesSchema = {
      type: 'object',
      properties: {
        options
      }
    };
    return propertiesSchema as any;
  }

  private getThemeSchema() {
    const themeSchema = {
      type: 'object',
      properties: {
        darkShadow: {
          type: 'boolean'
        },
        fontColor: {
          type: 'string',
          format: 'color'
        },
        backgroundColor: {
          type: 'string',
          format: 'color'
        },
        width: {
          type: 'string'
        },
        height: {
          type: 'string'
        }
      }
    }
    return themeSchema as IDataSchema;
  }

  private _getActions(propertiesSchema: IDataSchema, themeSchema: IDataSchema, advancedSchema?: IDataSchema) {
    const actions = [
      {
        name: 'Settings',
        icon: 'cog',
        command: (builder: any, userInputData: any) => {
          let _oldData: IPieChartConfig = { apiEndpoint: '', title: '', options: undefined };
          return {
            execute: async () => {
              _oldData = { ...this._data };
              if (userInputData) {
                if (advancedSchema) {
                  this._data = { ...this._data, ...userInputData };
                } else {
                  this._data = { ...userInputData };
                }
              }
              if (builder?.setData) builder.setData(userInputData);
              this.setData(this._data);
            },
            undo: () => {
              if (advancedSchema) _oldData = { ..._oldData, options: this._data.options };
              if (builder?.setData) builder.setData(_oldData);
              this.setData(_oldData);
            },
            redo: () => { }
          }
        },
        userInputDataSchema: propertiesSchema,
        userInputUISchema: advancedSchema ? undefined : {
          type: 'VerticalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/apiEndpoint',
              title: 'API Endpoint'
            },
            {
              type: 'Control',
              scope: '#/properties/title'
            },
            {
              type: 'Control',
              scope: '#/properties/description'
            },
            {
              type: 'Control',
              scope: '#/properties/options',
              options: {
                detail: {
                  type: 'VerticalLayout'
                }
              }
            }
          ]
        }
      },
      {
        name: 'Theme Settings',
        icon: 'palette',
        command: (builder: any, userInputData: any) => {
          let oldTag = {};
          return {
            execute: async () => {
              if (!userInputData) return;
              oldTag = JSON.parse(JSON.stringify(this.tag));
              if (builder?.setTag) builder.setTag(userInputData);
              else this.setTag(userInputData);
            },
            undo: () => {
              if (!userInputData) return;
              this.tag = JSON.parse(JSON.stringify(oldTag));
              if (builder?.setTag) builder.setTag(oldTag);
              else this.setTag(oldTag);
            },
            redo: () => { }
          }
        },
        userInputDataSchema: themeSchema
      }
    ]
    if (advancedSchema) {
      const advanced = {
        name: 'Advanced',
        icon: 'sliders-h',
        command: (builder: any, userInputData: any) => {
          let _oldData: IPieChartOptions = { };
          return {
            execute: async () => {
              _oldData = { ...this._data?.options };
              if (userInputData?.options !== undefined) this._data.options = userInputData.options;
              if (builder?.setData) builder.setData(this._data);
              this.setData(this._data);
            },
            undo: () => {
              this._data.options = { ..._oldData };
              if (builder?.setData) builder.setData(this._data);
              this.setData(this._data);
            },
            redo: () => { }
          }
        },
        userInputDataSchema: advancedSchema,
        userInputUISchema: {
          type: 'VerticalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/options',
              options: {
                detail: {
                  type: 'VerticalLayout'
                }
              }
            }
          ]
        }
      }
      actions.push(advanced);
    }
    return actions
  }

  getConfigurators() {
    const self = this;
    return [
      {
        name: 'Builder Configurator',
        target: 'Builders',
        getActions: () => {
          return this._getActions(this.getGeneralSchema(), this.getThemeSchema(), this.getAdvanceSchema());
        },
        getData: this.getData.bind(this),
        setData: async (data: IPieChartConfig) => {
          const defaultData = dataJson.defaultBuilderData;
          await this.setData({ ...defaultData, ...data });
        },
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this)
      },
      {
        name: 'Embedder Configurator',
        target: 'Embedders',
        getActions: () => {
          return this._getActions(this.getEmbeddersJSONSchema(), this.getThemeSchema())
        },
        getLinkParams: () => {
          const data = this._data || {};
          return {
            data: window.btoa(JSON.stringify(data))
          }
        },
        setLinkParams: async (params: any) => {
          if (params.data) {
            const utf8String = decodeURIComponent(params.data);
            const decodedString = window.atob(utf8String);
            const newData = JSON.parse(decodedString);
            let resultingData = {
              ...self._data,
              ...newData
            };
            await this.setData(resultingData);
          }
        },
        getData: this.getData.bind(this),
        setData: this.setData.bind(this),
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this)
      }
    ]
  }

  private updateStyle(name: string, value: any) {
    value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
  }

  private updateTheme() {
    if (this.pieChartContainer) {
      this.pieChartContainer.style.boxShadow = this.tag?.darkShadow ? '0 -2px 10px rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.16) 0px 1px 4px';
    }
    this.updateStyle('--text-primary', this.tag?.fontColor);
    this.updateStyle('--background-main', this.tag?.backgroundColor);
  }

  private onUpdateBlock() {
    this.renderChart();
    this.updateTheme();
  }

  private async updateChartData() {
    if (this._data.apiEndpoint === this.apiEndpoint) {
      this.onUpdateBlock();
      return;
    }
    const apiEndpoint = this._data.apiEndpoint;
    this.apiEndpoint = apiEndpoint;
    if (apiEndpoint) {
      this.loadingElm.visible = true;
      const data = await callAPI(apiEndpoint);
      this.loadingElm.visible = false;
      if (data && this._data.apiEndpoint === apiEndpoint) {
        this.pieChartData = data;
        this.onUpdateBlock();
        return;
      }
    }
    this.pieChartData = [];
    this.onUpdateBlock();
  }

  private renderChart() {
    if ((!this.pnlPieChart && this._data.options) || !this._data.options) return;
    const { title, description, options } = this._data;
    this.lbTitle.caption = title;
    this.lbDescription.caption = description;
    this.lbDescription.visible = !!description;
    this.pnlPieChart.height = `calc(100% - ${this.vStackInfo.offsetHeight + 10}px)`;
    const { xColumn, yColumn, legend, showDataLabels, serieName, numberFormat, valuesOptions } = options;
    let _legend = {
      show: legend?.show,
    }
    if (legend?.position) {
      _legend[legend.position] = 'auto';
      if (['left', 'right'].includes(legend.position)) {
        _legend['orient'] = 'vertical';
      }
    }
    if (legend?.scroll) {
      _legend['type'] = 'scroll';
    }
    const data = this.pieChartData.map((v) => {
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
    this.pnlPieChart.clearInnerHTML();
    const pieChart = new PieChart(this.pnlPieChart, {
      data: _chartData,
      width: '100%',
      height: '100%'
    });
    pieChart.data = _chartData;
    pieChart.drawChart();
  }

  private resizeChart() {
    if (this.pnlPieChart) {
      (this.pnlPieChart.firstChild as PieChart)?.resize();
    }
  }

  async init() {
    this.isReadyCallbackQueued = true;
    this.updateTheme();
    super.init();
    this.setTag({
      fontColor: currentTheme.text.primary,
      backgroundColor: currentTheme.background.main,
      darkShadow: false,
      height: 500
    })
    this.classList.add(chartStyle);
    // const { width, height, darkShadow } = this.tag || {};
    // this.width = width || 700;
    // this.height = height || 500;
    this.maxWidth = '100%';
    this.pieChartContainer.style.boxShadow = 'rgba(0, 0, 0, 0.16) 0px 1px 4px';
    const data = this.getAttribute('data', true);
    if (data) {
      this.setData(data);
    }
    this.isReadyCallbackQueued = false;
    this.executeReadyCallback();
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.resizeChart();
      }, 300);
    });
  }

  render() {
    return (
      <i-vstack
        id="pieChartContainer"
        position="relative"
        background={{ color: Theme.background.main }}
        height="100%"
        padding={{ top: 10, bottom: 10, left: 10, right: 10 }}
        class={containerStyle}
      >
        <i-vstack id="loadingElm" class="i-loading-overlay">
          <i-vstack class="i-loading-spinner" horizontalAlignment="center" verticalAlignment="center">
            <i-icon
              class="i-loading-spinner_icon"
              image={{ url: assets.fullPath('img/loading.svg'), width: 36, height: 36 }}
            />
          </i-vstack>
        </i-vstack>
        <i-vstack
          id="vStackInfo"
          width="100%"
          maxWidth="100%"
          margin={{ left: 'auto', right: 'auto', bottom: 10 }}
          verticalAlignment="center"
        >
          <i-label id="lbTitle" font={{ bold: true, color: Theme.text.primary }} />
          <i-label id="lbDescription" margin={{ top: 5 }} font={{ color: Theme.text.primary }} />
        </i-vstack>
        <i-panel id="pnlPieChart" width="100%" height="inherit" />
      </i-vstack>
    )
  }
}