import { EChart } from '@/components/EChart'
import { PublicKey } from '@solana/web3.js'
import SolanaMirror, { ChartDataWithPrice } from 'solana-mirror'

type ChartProps = {
    walletAddress: string
}

export default async function Chart({ walletAddress }: ChartProps) {
    const rpc = process.env.NEXT_PUBLIC_RPC_ENDPOINT as string

    const client = new SolanaMirror({
        watch: new PublicKey(walletAddress),
        rpc,
    })

    let chartData: ChartDataWithPrice[] = []

    try {
        chartData = await client.getChartData({
            timeframe: 'D',
            range: 14,
        })
    } catch (error) {
        console.error('Error fetching chart data:', error)
    }

    return (
        <div className="w-full flex flex-col justify-between h-full md:h-1/2">
            <p className="text-2xl font-bold text-left pl-6 pt-6">Chart</p>
            <EChart chartData={chartData} />
        </div>
    )
}
