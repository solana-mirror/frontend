'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { ChartDataWithPrice } from 'solana-mirror'
import dayjs from 'dayjs'

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false })

type EChartProps = {
    chartData: ChartDataWithPrice[]
}

export function EChart({ chartData }: EChartProps) {
    const [chartOptions, setChartOptions] = useState({})

    const priceFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })

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
                    'background-color: #1B1B21;border-width: 0px;color: #DFDEE7; display: flex;flex-direction: column;gap: 8px',
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
    }, [chartData])

    return (
        <>
            {chartOptions && (
                <ReactECharts
                    option={chartOptions}
                    opts={{ renderer: 'svg' }}
                    style={{
                        height: '100%',
                        width: '100%',
                        minHeight: '256px',
                    }}
                />
            )}
        </>
    )
}
