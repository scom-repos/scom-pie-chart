import { Module, customModule, Container } from '@ijstech/components';
import { ModeType } from '@scom/scom-chart-data-source-setup';
import ScomPieChart from '@scom/scom-pie-chart';

@customModule
export default class Module1 extends Module {
    constructor(parent?: Container, options?: any) {
        super(parent, options);
    }

    async init() {
        super.init();
    }

    render() {
        return <i-panel>
            <i-scom-pie-chart
                margin={{ left: 'auto', right: 'auto' }}
                data={{
                    dataSource: 'Dune',
                    mode: ModeType.LIVE,
                    queryId: '2030664',
                    title: 'Ethereum Beacon Chain Deposits Entity',
                    options: {
                        xColumn: 'entity',
                        yColumn: 'eth_deposited',
                        serieName: 'ETH deposited',
                        numberFormat: '0,000.00ma',
                        showDataLabels: true,
                        valuesOptions: [
                            { name: 'Lido', color: '#e58f8f' },
                            { name: 'Other', color: '#a9a4a4' },
                            { name: 'Kraken', color: '#0077ff' },
                            { name: 'Binance', color: '#f4f000' },
                            { name: 'Coinbase', color: '#0c22e3' }
                        ]
                    }
                }}
            />
        </i-panel>
    }
}