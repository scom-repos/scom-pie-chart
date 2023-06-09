var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-pie-chart/global/interfaces.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-pie-chart/global/utils.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.callAPI = exports.formatNumberWithSeparators = exports.formatNumberByFormat = exports.formatNumber = void 0;
    ///<amd-module name='@scom/scom-pie-chart/global/utils.ts'/> 
    const formatNumber = (num, options) => {
        if (num === null)
            return '-';
        const { decimals, format, percentValues } = options || {};
        if (percentValues) {
            return `${(0, exports.formatNumberWithSeparators)(num, 2)}%`;
        }
        if (format) {
            return (0, exports.formatNumberByFormat)(num, format);
        }
        const absNum = Math.abs(num);
        if (absNum >= 1000000000) {
            return (0, exports.formatNumberWithSeparators)((num / 1000000000), decimals || 3) + 'B';
        }
        if (absNum >= 1000000) {
            return (0, exports.formatNumberWithSeparators)((num / 1000000), decimals || 3) + 'M';
        }
        if (absNum >= 1000) {
            return (0, exports.formatNumberWithSeparators)((num / 1000), decimals || 3) + 'K';
        }
        if (absNum < 0.0000001) {
            return (0, exports.formatNumberWithSeparators)(num);
        }
        if (absNum < 0.00001) {
            return (0, exports.formatNumberWithSeparators)(num, 6);
        }
        if (absNum < 0.001) {
            return (0, exports.formatNumberWithSeparators)(num, 4);
        }
        return (0, exports.formatNumberWithSeparators)(num, 2);
    };
    exports.formatNumber = formatNumber;
    const formatNumberByFormat = (num, format, separators) => {
        const decimalPlaces = format.split('.')[1] ? format.split('.').length : 0;
        if (format.includes('%')) {
            return (0, exports.formatNumberWithSeparators)((num * 100), decimalPlaces) + '%';
        }
        const currencySymbol = format.indexOf('$') !== -1 ? '$' : '';
        const roundedNum = (0, exports.formatNumberWithSeparators)(num, decimalPlaces);
        if (separators || !(format.includes('m') || format.includes('a'))) {
            return format.indexOf('$') === 0 ? `${currencySymbol}${roundedNum}` : `${roundedNum}${currencySymbol}`;
        }
        const parts = roundedNum.split('.');
        const decimalPart = parts.length > 1 ? parts[1] : '';
        const integerPart = (0, exports.formatNumber)(parseInt(parts[0].replace(/,/g, '')), { decimals: decimalPart.length });
        return `${currencySymbol}${integerPart}`;
    };
    exports.formatNumberByFormat = formatNumberByFormat;
    const formatNumberWithSeparators = (value, precision) => {
        if (!value)
            value = 0;
        if (precision || precision === 0) {
            let outputStr = '';
            if (value >= 1) {
                outputStr = value.toLocaleString('en-US', { maximumFractionDigits: precision });
            }
            else {
                outputStr = value.toLocaleString('en-US', { maximumSignificantDigits: precision });
            }
            return outputStr;
        }
        return value.toLocaleString('en-US');
    };
    exports.formatNumberWithSeparators = formatNumberWithSeparators;
    const callAPI = async (apiEndpoint) => {
        if (!apiEndpoint)
            return [];
        try {
            const response = await fetch(apiEndpoint);
            const jsonData = await response.json();
            return jsonData.result.rows || [];
        }
        catch (error) {
            console.log(error);
        }
        return [];
    };
    exports.callAPI = callAPI;
});
define("@scom/scom-pie-chart/global/index.ts", ["require", "exports", "@scom/scom-pie-chart/global/interfaces.ts", "@scom/scom-pie-chart/global/utils.ts"], function (require, exports, interfaces_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(interfaces_1, exports);
    __exportStar(utils_1, exports);
});
define("@scom/scom-pie-chart/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.chartStyle = exports.containerStyle = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.containerStyle = components_1.Styles.style({
        width: 'var(--layout-container-width)',
        maxWidth: 'var(--layout-container-max_width)',
        textAlign: 'var(--layout-container-text_align)',
        margin: '0 auto',
        padding: 10
    });
    exports.chartStyle = components_1.Styles.style({
        display: 'block',
    });
});
define("@scom/scom-pie-chart/assets.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let moduleDir = components_2.application.currentModuleDir;
    function fullPath(path) {
        if (path.indexOf('://') > 0)
            return path;
        return `${moduleDir}/${path}`;
    }
    exports.default = {
        fullPath
    };
});
define("@scom/scom-pie-chart/data.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-pie-chart/data.json.ts'/> 
    exports.default = {
        "defaultBuilderData": {
            "apiEndpoint": "/dune/query/2030664",
            "title": "Ethereum Beacon Chain Deposits Entity",
            "options": {
                "xColumn": "entity",
                "yColumn": "eth_deposited",
                "serieName": "ETH deposited",
                "numberFormat": "0,000.00ma",
                "showDataLabels": true,
                "valuesOptions": [
                    {
                        "name": "Lido",
                        "color": "#e58f8f"
                    },
                    {
                        "name": "Other",
                        "color": "#a9a4a4"
                    },
                    {
                        "name": "Kraken",
                        "color": "#0077ff"
                    },
                    {
                        "name": "Binance",
                        "color": "#f4f000"
                    },
                    {
                        "name": "Coinbase",
                        "color": "#0c22e3"
                    }
                ]
            }
        }
    };
});
define("@scom/scom-pie-chart", ["require", "exports", "@ijstech/components", "@scom/scom-pie-chart/global/index.ts", "@scom/scom-pie-chart/index.css.ts", "@scom/scom-pie-chart/assets.ts", "@scom/scom-pie-chart/data.json.ts"], function (require, exports, components_3, index_1, index_css_1, assets_1, data_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_3.Styles.Theme.ThemeVars;
    const currentTheme = components_3.Styles.Theme.currentTheme;
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
    };
    let ScomPieChart = class ScomPieChart extends components_3.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
            this.pieChartData = [];
            this.apiEndpoint = '';
            this._data = { apiEndpoint: '', title: '', options: undefined };
            this.tag = {};
            this.defaultEdit = true;
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._data = data;
            this.updateChartData();
        }
        getTag() {
            return this.tag;
        }
        async setTag(value) {
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
        getEmbeddersJSONSchema() {
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
            };
            return propertiesSchema;
        }
        getGeneralSchema() {
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
            };
            return propertiesSchema;
        }
        getAdvanceSchema() {
            const propertiesSchema = {
                type: 'object',
                properties: {
                    options
                }
            };
            return propertiesSchema;
        }
        getThemeSchema() {
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
            };
            return themeSchema;
        }
        _getActions(propertiesSchema, themeSchema, advancedSchema) {
            const actions = [
                {
                    name: 'Settings',
                    icon: 'cog',
                    command: (builder, userInputData) => {
                        let _oldData = { apiEndpoint: '', title: '', options: undefined };
                        return {
                            execute: async () => {
                                _oldData = Object.assign({}, this._data);
                                if (userInputData) {
                                    if (advancedSchema) {
                                        this._data = Object.assign(Object.assign({}, this._data), userInputData);
                                    }
                                    else {
                                        this._data = Object.assign({}, userInputData);
                                    }
                                }
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(userInputData);
                                this.setData(this._data);
                            },
                            undo: () => {
                                if (advancedSchema)
                                    _oldData = Object.assign(Object.assign({}, _oldData), { options: this._data.options });
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(_oldData);
                                this.setData(_oldData);
                            },
                            redo: () => { }
                        };
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
                    command: (builder, userInputData) => {
                        let oldTag = {};
                        return {
                            execute: async () => {
                                if (!userInputData)
                                    return;
                                oldTag = JSON.parse(JSON.stringify(this.tag));
                                if (builder === null || builder === void 0 ? void 0 : builder.setTag)
                                    builder.setTag(userInputData);
                                else
                                    this.setTag(userInputData);
                            },
                            undo: () => {
                                if (!userInputData)
                                    return;
                                this.tag = JSON.parse(JSON.stringify(oldTag));
                                if (builder === null || builder === void 0 ? void 0 : builder.setTag)
                                    builder.setTag(oldTag);
                                else
                                    this.setTag(oldTag);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: themeSchema
                }
            ];
            if (advancedSchema) {
                const advanced = {
                    name: 'Advanced',
                    icon: 'sliders-h',
                    command: (builder, userInputData) => {
                        let _oldData = {};
                        return {
                            execute: async () => {
                                var _a;
                                _oldData = Object.assign({}, (_a = this._data) === null || _a === void 0 ? void 0 : _a.options);
                                if ((userInputData === null || userInputData === void 0 ? void 0 : userInputData.options) !== undefined)
                                    this._data.options = userInputData.options;
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._data);
                                this.setData(this._data);
                            },
                            undo: () => {
                                this._data.options = Object.assign({}, _oldData);
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._data);
                                this.setData(this._data);
                            },
                            redo: () => { }
                        };
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
                };
                actions.push(advanced);
            }
            return actions;
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
                    setData: async (data) => {
                        const defaultData = data_json_1.default.defaultBuilderData;
                        await this.setData(Object.assign(Object.assign({}, defaultData), data));
                    },
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                },
                {
                    name: 'Embedder Configurator',
                    target: 'Embedders',
                    getActions: () => {
                        return this._getActions(this.getEmbeddersJSONSchema(), this.getThemeSchema());
                    },
                    getLinkParams: () => {
                        const data = this._data || {};
                        return {
                            data: window.btoa(JSON.stringify(data))
                        };
                    },
                    setLinkParams: async (params) => {
                        if (params.data) {
                            const utf8String = decodeURIComponent(params.data);
                            const decodedString = window.atob(utf8String);
                            const newData = JSON.parse(decodedString);
                            let resultingData = Object.assign(Object.assign({}, self._data), newData);
                            await this.setData(resultingData);
                        }
                    },
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                }
            ];
        }
        updateStyle(name, value) {
            value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
        }
        updateTheme() {
            var _a, _b, _c;
            if (this.pieChartContainer) {
                this.pieChartContainer.style.boxShadow = ((_a = this.tag) === null || _a === void 0 ? void 0 : _a.darkShadow) ? '0 -2px 10px rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.16) 0px 1px 4px';
            }
            this.updateStyle('--text-primary', (_b = this.tag) === null || _b === void 0 ? void 0 : _b.fontColor);
            this.updateStyle('--background-main', (_c = this.tag) === null || _c === void 0 ? void 0 : _c.backgroundColor);
        }
        onUpdateBlock() {
            this.renderChart();
            this.updateTheme();
        }
        async updateChartData() {
            if (this._data.apiEndpoint === this.apiEndpoint) {
                this.onUpdateBlock();
                return;
            }
            const apiEndpoint = this._data.apiEndpoint;
            this.apiEndpoint = apiEndpoint;
            if (apiEndpoint) {
                this.loadingElm.visible = true;
                const data = await (0, index_1.callAPI)(apiEndpoint);
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
        renderChart() {
            if ((!this.pnlPieChart && this._data.options) || !this._data.options)
                return;
            const { title, description, options } = this._data;
            this.lbTitle.caption = title;
            this.lbDescription.caption = description;
            this.lbDescription.visible = !!description;
            this.pnlPieChart.height = `calc(100% - ${this.vStackInfo.offsetHeight + 10}px)`;
            const { xColumn, yColumn, legend, showDataLabels, serieName, numberFormat, valuesOptions } = options;
            let _legend = {
                show: legend === null || legend === void 0 ? void 0 : legend.show,
            };
            if (legend === null || legend === void 0 ? void 0 : legend.position) {
                _legend[legend.position] = 'auto';
                if (['left', 'right'].includes(legend.position)) {
                    _legend['orient'] = 'vertical';
                }
            }
            if (legend === null || legend === void 0 ? void 0 : legend.scroll) {
                _legend['type'] = 'scroll';
            }
            const data = this.pieChartData.map((v) => {
                const values = valuesOptions.find(f => f.name === v[xColumn]);
                return {
                    value: v[yColumn],
                    name: (values === null || values === void 0 ? void 0 : values.name) || v[xColumn],
                    itemStyle: values ? { color: values.color } : undefined,
                    label: showDataLabels ? {
                        show: true,
                        position: 'inside',
                        formatter: function (params) {
                            return params.percent >= 5 ? params.percent + '%' : '';
                        }
                    } : undefined
                };
            });
            const _chartData = {
                tooltip: {
                    trigger: 'item',
                    position: function (point, params, dom, rect, size) {
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
                        if (x < 0)
                            x = 0;
                        if (y < 0)
                            y = 0;
                        return [x, y];
                    },
                    formatter: (params) => {
                        return `<b>${params.name}</b> <br />
            ${params.marker} ${params.seriesName}: ${(0, index_1.formatNumberByFormat)(params.value, numberFormat)}`;
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
            const pieChart = new components_3.PieChart(this.pnlPieChart, {
                data: _chartData,
                width: '100%',
                height: '100%'
            });
            pieChart.data = _chartData;
            pieChart.drawChart();
        }
        resizeChart() {
            var _a;
            if (this.pnlPieChart) {
                (_a = this.pnlPieChart.firstChild) === null || _a === void 0 ? void 0 : _a.resize();
            }
        }
        async init() {
            this.isReadyCallbackQueued = true;
            this.updateTheme();
            super.init();
            this.classList.add(index_css_1.chartStyle);
            this.setTag({
                fontColor: currentTheme.text.primary,
                backgroundColor: currentTheme.background.main,
                darkShadow: false,
                height: 500
            });
            // const { width, height, darkShadow } = this.tag || {};
            // this.width = width || 700;
            // this.height = height || 500;
            this.maxWidth = '100%';
            this.pieChartContainer.style.boxShadow = 'rgba(0, 0, 0, 0.16) 0px 1px 4px';
            const lazyLoad = this.getAttribute('lazyLoad', true, false);
            if (!lazyLoad) {
                const data = this.getAttribute('data', true);
                if (data) {
                    this.setData(data);
                }
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
            return (this.$render("i-vstack", { id: "pieChartContainer", position: "relative", background: { color: Theme.background.main }, height: "100%", padding: { top: 10, bottom: 10, left: 10, right: 10 }, class: index_css_1.containerStyle },
                this.$render("i-vstack", { id: "loadingElm", class: "i-loading-overlay" },
                    this.$render("i-vstack", { class: "i-loading-spinner", horizontalAlignment: "center", verticalAlignment: "center" },
                        this.$render("i-icon", { class: "i-loading-spinner_icon", image: { url: assets_1.default.fullPath('img/loading.svg'), width: 36, height: 36 } }))),
                this.$render("i-vstack", { id: "vStackInfo", width: "100%", maxWidth: "100%", margin: { left: 'auto', right: 'auto', bottom: 10 }, verticalAlignment: "center" },
                    this.$render("i-label", { id: "lbTitle", font: { bold: true, color: Theme.text.primary } }),
                    this.$render("i-label", { id: "lbDescription", margin: { top: 5 }, font: { color: Theme.text.primary } })),
                this.$render("i-panel", { id: "pnlPieChart", width: "100%", height: "inherit" })));
        }
    };
    ScomPieChart = __decorate([
        components_3.customModule,
        (0, components_3.customElements)('i-scom-pie-chart')
    ], ScomPieChart);
    exports.default = ScomPieChart;
});
