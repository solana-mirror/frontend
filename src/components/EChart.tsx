'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { MinimalChartData } from 'solana-mirror'
import { priceFormatter } from '@/utils'

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false })

type Props = {
    chartData: MinimalChartData[]
}

export function EChart({ chartData }: Props) {
    const [chartOptions, setChartOptions] = useState({})

    const xAxisFormatter = (v: string) => {
        return v.split(',')[0]
    }

    useEffect(() => {
        if (!chartData) {
            return
        }
        const timestamps = chartData.map((x) =>
            new Date(x.timestamp * 1000).toLocaleString()
        )
        const usdValues = chartData.map((x) => x.usdValue)
        const minValue = Math.min(...usdValues)

        const option = {
            grid: {
                left: 50,
                top: 40,
                right: 30,
                bottom: 40,
            },
            tooltip: {
                trigger: 'axis',
                extraCssText:
                    'background-color: #1F2427;border-width: 0px;color: #DFDEE7; display: flex;flex-direction: column;gap: 8px',
                formatter: (params: any) => {
                    const formattedData = priceFormatter.format(params[0].data)

                    return `
                  <div className="">${params[0].name}</div>
                  <div>${params[0].seriesName}: ${formattedData}</div>
                `
                },
            },
            xAxis: {
                type: 'category',
                data: timestamps,
                boundaryGap: false,
                axisLabel: {
                    formatter: xAxisFormatter,
                },
                splitLine: {
                    show: false,
                },
            },
            yAxis: {
                min: minValue * 0.95,
                type: 'value',
                splitLine: {
                    show: false,
                },
            },
            series: [
                {
                    name: 'USD Value',
                    data: usdValues,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        color: '#87B7E2',
                        width: 4,
                        cap: 'round',
                    },
                },
            ],
        }

        setChartOptions(option)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chartData])

    if (!chartData.length) {
        return (
            <div className="flex items-center justify-center h-full w-full min-h-64 rounded-md border border-white/30 border-dashed">
                <p className="text-white/30">
                    No data available for the selected timeframe
                </p>
            </div>
        )
    }

    return (
        <ReactECharts
            option={chartOptions}
            opts={{ renderer: 'svg' }}
            className="rounded-md border border-dashed border-white/30"
            style={{
                height: '100%',
                width: '100%',
                minHeight: '256px',
            }}
        />
    )
}
