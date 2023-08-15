/// <amd-module name="@scom/scom-pie-chart/global/interfaces.ts" />
declare module "@scom/scom-pie-chart/global/interfaces.ts" {
    import { ModeType } from "@scom/scom-chart-data-source-setup";
    export interface IPieChartOptions {
        xColumn?: string;
        yColumn?: string;
        serieName?: string;
        legend?: {
            show?: boolean;
            scroll?: boolean;
            position?: 'top' | 'bottom' | 'left' | 'right';
        };
        showDataLabels?: boolean;
        numberFormat?: string;
        valuesOptions?: {
            name: string;
            color: string;
        }[];
    }
    export interface IPieChartConfig {
        apiEndpoint?: string;
        title: string;
        description?: string;
        options: IPieChartOptions;
        file?: {
            cid: string;
            name: string;
        };
        mode: ModeType;
    }
}
/// <amd-module name="@scom/scom-pie-chart/global/utils.ts" />
declare module "@scom/scom-pie-chart/global/utils.ts" {
    export const formatNumber: (num: number, options?: {
        format?: string;
        decimals?: number;
        percentValues?: boolean;
    }) => any;
    export const formatNumberByFormat: (num: number, format: string, separators?: boolean) => any;
    export const formatNumberWithSeparators: (value: number, precision?: number) => string;
    export const callAPI: (apiEndpoint: string) => Promise<any>;
}
/// <amd-module name="@scom/scom-pie-chart/global/index.ts" />
declare module "@scom/scom-pie-chart/global/index.ts" {
    export interface PageBlock {
        getData: () => any;
        setData: (data: any) => Promise<void>;
        getTag: () => any;
        setTag: (tag: any) => Promise<void>;
        validate?: () => boolean;
        defaultEdit?: boolean;
        tag?: any;
        readonly onEdit: () => Promise<void>;
        readonly onConfirm: () => Promise<void>;
        readonly onDiscard: () => Promise<void>;
        edit: () => Promise<void>;
        confirm: () => Promise<void>;
        discard: () => Promise<void>;
        config: () => Promise<void>;
    }
    export * from "@scom/scom-pie-chart/global/interfaces.ts";
    export * from "@scom/scom-pie-chart/global/utils.ts";
}
/// <amd-module name="@scom/scom-pie-chart/index.css.ts" />
declare module "@scom/scom-pie-chart/index.css.ts" {
    export const containerStyle: string;
    export const chartStyle: string;
}
/// <amd-module name="@scom/scom-pie-chart/assets.ts" />
declare module "@scom/scom-pie-chart/assets.ts" {
    function fullPath(path: string): string;
    const _default: {
        fullPath: typeof fullPath;
    };
    export default _default;
}
/// <amd-module name="@scom/scom-pie-chart/data.json.ts" />
declare module "@scom/scom-pie-chart/data.json.ts" {
    const _default_1: {
        defaultBuilderData: {
            apiEndpoint: string;
            title: string;
            options: {
                xColumn: string;
                yColumn: string;
                serieName: string;
                numberFormat: string;
                showDataLabels: boolean;
                valuesOptions: {
                    name: string;
                    color: string;
                }[];
            };
        };
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-pie-chart/formSchema.ts" />
declare module "@scom/scom-pie-chart/formSchema.ts" {
    export function getBuilderSchema(): {
        general: {
            dataSchema: {
                type: string;
                required: string[];
                properties: {
                    title: {
                        type: string;
                    };
                    description: {
                        type: string;
                    };
                };
            };
            uiSchema: {
                type: string;
                elements: ({
                    type: string;
                    scope: string;
                    options?: undefined;
                } | {
                    type: string;
                    scope: string;
                    options: {
                        detail: {
                            type: string;
                        };
                    };
                })[];
            };
        };
        advanced: {
            dataSchema: {
                type: string;
                properties: {
                    options: {
                        type: string;
                        title: string;
                        properties: {
                            xColumn: {
                                type: string;
                                title: string;
                                required: boolean;
                            };
                            yColumn: {
                                type: string;
                                title: string;
                                required: boolean;
                            };
                            serieName: {
                                type: string;
                            };
                            numberFormat: {
                                type: string;
                            };
                            legend: {
                                type: string;
                                title: string;
                                properties: {
                                    show: {
                                        type: string;
                                    };
                                    scroll: {
                                        type: string;
                                    };
                                    position: {
                                        type: string;
                                        enum: string[];
                                    };
                                };
                            };
                            showDataLabels: {
                                type: string;
                            };
                            valuesOptions: {
                                type: string;
                                items: {
                                    type: string;
                                    properties: {
                                        name: {
                                            type: string;
                                            required: boolean;
                                        };
                                        color: {
                                            type: string;
                                            format: string;
                                            required: boolean;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            uiSchema: {
                type: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        scope: string;
                        options: {
                            detail: {
                                type: string;
                            };
                        };
                    }[];
                }[];
            };
        };
        theme: {
            dataSchema: {
                type: string;
                properties: {
                    darkShadow: {
                        type: string;
                    };
                    fontColor: {
                        type: string;
                        format: string;
                    };
                    backgroundColor: {
                        type: string;
                        format: string;
                    };
                    width: {
                        type: string;
                    };
                    height: {
                        type: string;
                    };
                };
            };
        };
    };
    export function getEmbedderSchema(): {
        general: {
            dataSchema: {
                type: string;
                properties: {
                    apiEndpoint: {
                        type: string;
                        title: string;
                        required: boolean;
                    };
                    title: {
                        type: string;
                        required: boolean;
                    };
                    description: {
                        type: string;
                    };
                    options: {
                        type: string;
                        title: string;
                        properties: {
                            xColumn: {
                                type: string;
                                title: string;
                                required: boolean;
                            };
                            yColumn: {
                                type: string;
                                title: string;
                                required: boolean;
                            };
                            serieName: {
                                type: string;
                            };
                            numberFormat: {
                                type: string;
                            };
                            legend: {
                                type: string;
                                title: string;
                                properties: {
                                    show: {
                                        type: string;
                                    };
                                    scroll: {
                                        type: string;
                                    };
                                    position: {
                                        type: string;
                                        enum: string[];
                                    };
                                };
                            };
                            showDataLabels: {
                                type: string;
                            };
                            valuesOptions: {
                                type: string;
                                items: {
                                    type: string;
                                    properties: {
                                        name: {
                                            type: string;
                                            required: boolean;
                                        };
                                        color: {
                                            type: string;
                                            format: string;
                                            required: boolean;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        theme: {
            dataSchema: {
                type: string;
                properties: {
                    darkShadow: {
                        type: string;
                    };
                    fontColor: {
                        type: string;
                        format: string;
                    };
                    backgroundColor: {
                        type: string;
                        format: string;
                    };
                    width: {
                        type: string;
                    };
                    height: {
                        type: string;
                    };
                };
            };
        };
    };
}
/// <amd-module name="@scom/scom-pie-chart/dataOptionsForm.tsx" />
declare module "@scom/scom-pie-chart/dataOptionsForm.tsx" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    interface IData {
        options: any;
    }
    interface ScomPieChartDataOptionsFormElement extends ControlElement {
        dataSchema?: string;
        uiSchema?: string;
        options: any;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ["i-scom-pie-chart-data-options-form"]: ScomPieChartDataOptionsFormElement;
            }
        }
    }
    export default class ScomPieChartDataOptionsForm extends Module {
        private formEl;
        private _dataSchema;
        private _uiSchema;
        private _data;
        constructor(parent?: Container, options?: any);
        get data(): IData;
        set data(value: IData);
        refreshFormData(): Promise<IData>;
        private renderUI;
        private onInputChanged;
        onCustomInputChanged(data: IData): Promise<void>;
        init(): Promise<void>;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-pie-chart" />
declare module "@scom/scom-pie-chart" {
    import { Module, ControlElement, Container, IDataSchema, VStack } from '@ijstech/components';
    import { IPieChartConfig } from "@scom/scom-pie-chart/global/index.ts";
    interface ScomPieChartElement extends ControlElement {
        lazyLoad?: boolean;
        data: IPieChartConfig;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-pie-chart']: ScomPieChartElement;
            }
        }
    }
    export default class ScomPieChart extends Module {
        private pieChartContainer;
        private vStackInfo;
        private pnlPieChart;
        private loadingElm;
        private lbTitle;
        private lbDescription;
        private pieChartData;
        private _data;
        tag: any;
        defaultEdit: boolean;
        readonly onConfirm: () => Promise<void>;
        readonly onDiscard: () => Promise<void>;
        readonly onEdit: () => Promise<void>;
        static create(options?: ScomPieChartElement, parent?: Container): Promise<ScomPieChart>;
        constructor(parent?: Container, options?: ScomPieChartElement);
        private getData;
        private setData;
        private getTag;
        private setTag;
        private _getActions;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => ({
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                userInputUISchema: {
                    type: string;
                    elements: ({
                        type: string;
                        scope: string;
                        options?: undefined;
                    } | {
                        type: string;
                        scope: string;
                        options: {
                            detail: {
                                type: string;
                            };
                        };
                    })[];
                };
                customUI?: undefined;
            } | {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                customUI: {
                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;
                };
                userInputDataSchema?: undefined;
                userInputUISchema?: undefined;
            } | {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                userInputUISchema?: undefined;
                customUI?: undefined;
            })[];
            getData: any;
            setData: (data: IPieChartConfig) => Promise<void>;
            getTag: any;
            setTag: any;
            getLinkParams?: undefined;
            setLinkParams?: undefined;
        } | {
            name: string;
            target: string;
            getActions: () => ({
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                userInputUISchema: {
                    type: string;
                    elements: ({
                        type: string;
                        scope: string;
                        options?: undefined;
                    } | {
                        type: string;
                        scope: string;
                        options: {
                            detail: {
                                type: string;
                            };
                        };
                    })[];
                };
                customUI?: undefined;
            } | {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                customUI: {
                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;
                };
                userInputDataSchema?: undefined;
                userInputUISchema?: undefined;
            } | {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                userInputUISchema?: undefined;
                customUI?: undefined;
            })[];
            getLinkParams: () => {
                data: string;
            };
            setLinkParams: (params: any) => Promise<void>;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        })[];
        private updateStyle;
        private updateTheme;
        private onUpdateBlock;
        private updateChartData;
        private renderSnapshotData;
        private renderLiveData;
        private renderChart;
        private resizeChart;
        init(): Promise<void>;
        render(): any;
    }
}
