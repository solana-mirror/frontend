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
            range: 30,
        })
    } catch (error) {
        console.error('Error fetching chart data:', error)
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
