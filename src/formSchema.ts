const visualizationOptions = {
    type: 'object',
    title: 'Visualization Options',
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

export function getBuilderSchema() {
    return {
        general: {
            dataSchema: {
                type: 'object',
                required: ['title'],
                properties: {
                    title: {
                        type: 'string'
                    },
                    description: {
                        type: 'string'
                    }
                }
            },
            uiSchema: {
                type: 'VerticalLayout',
                elements: [
                    // {
                    //   type: 'Control',
                    //   scope: '#/properties/apiEndpoint',
                    //   title: 'API Endpoint'
                    // },
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
        advanced: {
            dataSchema: {
                type: 'object',
                properties: {
                    options: visualizationOptions
                }
            },
            uiSchema: {
                type: 'VerticalLayout',
                elements: [
                    {
                        type: "HorizontalLayout",
                        elements: [
                            {
                                type: "Control",
                                scope: '#/properties/options',
                                options: {
                                    detail: {
                                        type: "VerticalLayout"
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        },
        theme: {
            dataSchema: {
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
        }
    }
}

export function getEmbedderSchema() {
    return {
        general: {
            dataSchema: {
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
                    options: visualizationOptions
                }
            }
        },
        theme: {
            dataSchema: {
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
        }
    }
}