'use client'

import { EChart } from '@/components/EChart'
import { cn } from '@/utils'
import BN from 'bn.js'
import { useEffect, useState } from 'react'
import { ChartDataWithPrice } from 'solana-mirror'

type Props = {
    chartData: ChartDataWithPrice<string>[]
}

enum Timeframes {
    OneWeek = '7d',
    OneMonth = '30d',
    ThreeMonths = '90d',
}

export default function TimeframeSelector({ chartData }: Props) {
    // Something something filter the timestamps
    const [timeframe, setTimeframe] = useState<Timeframes>(Timeframes.OneMonth)
    const [selectedChartData, setSelectedChartData] =
        useState<ChartDataWithPrice<string>[]>(chartData)

    function filterChartData(
        chartData: ChartDataWithPrice<string>[],
        startT: number
    ) {
        const newData: ChartDataWithPrice<string>[] = []

        for (let i = chartData.length - 1; i >= 0; i--) {
            if (chartData[i].timestamp > startT) {
                newData.unshift(chartData[i])
            } else {
                break
            }
        }

        return newData
    }

    useEffect(() => {
        switch (timeframe) {
            case Timeframes.ThreeMonths:
                setSelectedChartData(chartData)
                break
            case Timeframes.OneMonth:
                const oneMonthT = Math.floor(Date.now() / 1000) - 30 * 86400
                const oneMonthFiltered = filterChartData(chartData, oneMonthT)
                setSelectedChartData(oneMonthFiltered)
                break
            case Timeframes.OneWeek:
                const oneWeekT = Math.floor(Date.now() / 1000) - 7 * 86400
                const oneWeekFiltered = filterChartData(chartData, oneWeekT)
                setSelectedChartData(oneWeekFiltered)
                break
        }
    }, [timeframe, chartData])

    return (
        <div className="w-full flex flex-col h-full md:h-1/2 min-h-96 gap-4 p-4 bg-primary rounded-md">
            <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-left">Chart</p>
                <div className="flex bg-background rounded-md">
                    {[
                        Timeframes.ThreeMonths,
                        Timeframes.OneMonth,
                        Timeframes.OneWeek,
                    ].map((t, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                timeframe == t && 'bg-dark_accent',
                                'py-1 px-2 rounded-md'
                            )}
                        >
                            <p
                                className="cursor-pointer font-semibold"
                                onClick={() => setTimeframe(t)}
                            >
                                {t}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <EChart chartData={selectedChartData} />
        </div>
    )
}
