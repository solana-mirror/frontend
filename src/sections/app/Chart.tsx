import { EChart } from '@/components/EChart'
import { PublicKey } from '@solana/web3.js'
import BN from 'bn.js'
import { ChartDataWithPrice, getChartData } from 'solana-mirror'

type ChartProps = {
    walletAddress: string
}

export default async function Chart({ walletAddress }: ChartProps) {
    let chartData: ChartDataWithPrice<BN>[] = []

    try {
        chartData = await getChartData(new PublicKey(walletAddress), 30, 'd')
    } catch (e) {
        console.log('e fetching chart data:', e)
    }

    return (
        <div className="w-full flex flex-col h-full md:h-1/2 p-4">
            <div className="flex flex-col gap-4 p-4 bg-primary rounded-md h-full">
                <p className="text-2xl font-bold text-left">Chart</p>
                <EChart chartData={JSON.parse(JSON.stringify(chartData))} />
            </div>
        </div>
    )
}
