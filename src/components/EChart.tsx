'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { ChartDataWithPrice } from 'solana-mirror'

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false })

type EChartProps = {
    chartData: ChartDataWithPrice[]
}

export function EChart({ chartData }: EChartProps) {
    const [chartOptions, setChartOptions] = useState({})

    useEffect(() => {
        if (!chartData) {
            return
        }
        const timestamps = chartData.map((x) =>
            new Date(x.timestamp * 1000).toLocaleString()
        )
        const usdValues = chartData.map((x) => x.usdValue)

        setChartOptions({
            title: false,
            tooltip: {
                trigger: 'axis',
            },
            grid: {
                show: false,
            },
            xAxis: {
                type: 'category',
                data: timestamps,
                axisLine: {
                    lineStyle: {
                        color: '#87B7E2',
                    },
                },
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: false,
                },
                axisLine: {
                    lineStyle: {
                        color: '#87B7E2',
                    },
                },
            },
            series: [
                {
                    name: 'USD Value',
                    type: 'line',
                    data: usdValues,
                    showSymbol: false,
                    lineStyle: {
                        color: '#87B7E2',
                        width: 4,
                        cap: 'round',
                    },
                },
            ],
        })
    }, [chartData])

    return (
        <>
            {chartOptions && (
                <ReactECharts
                    option={chartOptions}
                    className="h-full md:h-fit"
                />
            )}
        </>
    )
}
