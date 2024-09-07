import { normalizeData } from '@/utils'
import { PublicKey } from '@solana/web3.js'
import BN from 'bn.js'
import { ChartDataWithPrice, getChartData } from 'solana-mirror'
import TimeframeSelector from './TimeframeSelector'

type Props = {
    walletAddress: string
}

export default async function Chart({ walletAddress }: Props) {
    let chartData: ChartDataWithPrice<BN>[] = []

    try {
        chartData = await getChartData(new PublicKey(walletAddress), 90, 'd')
    } catch (e) {
        console.log('e fetching chart data:', e)
    }

    return <TimeframeSelector chartData={normalizeData(chartData)} />
}
