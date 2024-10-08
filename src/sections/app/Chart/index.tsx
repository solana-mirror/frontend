import { PublicKey } from '@solana/web3.js'
import { MinimalChartData, getChartData } from 'solana-mirror'
import TimeframeSelector from './TimeframeSelector'

type Props = {
    walletAddress: string
}

export default async function Chart({ walletAddress }: Props) {
    let chartData: MinimalChartData[] = []

    try {
        chartData = (await getChartData(
            new PublicKey(walletAddress),
            90,
            'd',
            false
        )) as MinimalChartData[]
    } catch (e) {
        console.log('e fetching chart data:', e)
    }

    return <TimeframeSelector chartData={chartData} />
}
