function visualizationOptions(columns: string[]) {
    return {
        type: 'object',
        title: 'Visualization Options',
        properties: {
            xColumn: {
                type: 'string',
                title: 'X column',
                enum: columns,
                required: true
            },
            yColumn: {
                type: 'string',
                title: 'Y column',
                enum: columns,
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
}

const theme = {
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
    // width: {
    //     type: 'string'
    // },
    height: {
        type: 'string'
    }
}

const themeUISchema = {
    type: 'Category',
    label: 'Theme',
    elements: [
        {
            type: 'VerticalLayout',
            elements: [
                {
                    type: 'Control',
                    scope: '#/properties/darkShadow'
                },
                {
                    type: 'Control',
                    scope: '#/properties/fontColor'
                },
                {
                    type: 'Control',
                    scope: '#/properties/backgroundColor'
                },
                {
                    type: 'Control',
                    scope: '#/properties/height'
                }
            ]
        }
    ]
}

export function getBuilderSchema(columns: string[]) {
    return {
        dataSchema: {
            type: 'object',
            required: ['title'],
            properties: {
                title: {
                    type: 'string'
                },
                description: {
                    type: 'string'
                },
                ...theme
            }
        },
        uiSchema: {
            type: 'Categorization',
            elements: [
                {
                    type: 'Category',
                    label: 'General',
                    elements: [
                        {
                            type: 'VerticalLayout',
                            elements: [
                                {
                                    type: 'Control',
                                    scope: '#/properties/title'
                                },
                                {
                                    type: 'Control',
                                    scope: '#/properties/description'
                                }
                            ]
                        }
                    ]
                },
                themeUISchema
            ]
        },
        advanced: {
            dataSchema: {
                type: 'object',
                properties: {
                    options: visualizationOptions(columns)
                }
            },
            uiSchema: {
                type: 'VerticalLayout',
                elements: [
                    {
                        type: 'HorizontalLayout',
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
                ]
            }
        }
    }
}

export function getEmbedderSchema(columns: string[]) {
    return {
        dataSchema: {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                    required: true
                },
                description: {
                    type: 'string'
                },
                options: visualizationOptions(columns),
                ...theme
            }
        },
        uiSchema: {
            type: 'Categorization',
            elements: [
                {
                    type: 'Category',
                    label: 'General',
                    elements: [
                        {
                            type: 'VerticalLayout',
                            elements: [
                                {
                                    type: 'Control',
                                    scope: '#/properties/title'
                                },
                                {
                                    type: 'Control',
                                    scope: '#/properties/description'
                                },
                                {
                                    type: 'HorizontalLayout',
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
                            ]
                        }
                    ]
                },
                themeUISchema
            ]
        }
    }
}