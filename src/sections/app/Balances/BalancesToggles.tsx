'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ParsedAta } from 'solana-mirror'
import BN from 'bn.js'
import { Hyperlink } from '@/components/UI/Hyperlink'

type Toggle = {
    label: string
    state: boolean
    setState: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = {
    netWorth: number
    atas: ParsedAta<BN>[]
}

export default function BalancesToggles({ netWorth, atas }: Props) {
    const [balancesHidden, setBalancesHidden] = useState(false)
    const [noPriceTokensHidden, setNoPriceTokensHidden] = useState(false)

    const toggles: Toggle[] = [
        {
            label: 'Eye',
            state: balancesHidden,
            setState: setBalancesHidden,
        },
        {
            label: 'Zoom',
            state: noPriceTokensHidden,
            setState: setNoPriceTokensHidden,
        },
    ]

    return (
        <div className="flex flex-col gap-4 p-4 bg-primary rounded-md">
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <p className="text-xl">Spot Balances</p>
                    <div className="flex items-center gap-1 text-[6px]">
                        {toggles.map((toggle, i) => (
                            <Image
                                key={i}
                                onClick={() => toggle.setState(!toggle.state)}
                                src={`/${toggle.label}${toggle.state ? 'Off' : ''}.svg`}
                                alt={`${toggle.label} ${toggle.state ? 'Off' : 'On'}`}
                                width={24}
                                height={24}
                            />
                        ))}
                    </div>
                </div>

                {typeof netWorth === 'number' && (
                    <p className="text-accent">
                        {balancesHidden
                            ? '*****'
                            : netWorth.toLocaleString('en-US', {
                                  style: 'currency',
                                  currency: 'USD',
                              })}
                    </p>
                )}
            </div>

            {atas
                .filter((ata) => !noPriceTokensHidden || ata.price)
                .map((ata, i) => (
                    <div key={i} className="flex items-center justify-between">
                        <div className="flex gap-2">
                            <Image
                                src={ata.image}
                                alt={ata.symbol}
                                width={24}
                                height={24}
                                className="rounded-full h-6 w-6"
                            />
                            <Hyperlink
                                href={`https://solscan.io/token/${ata.mint}`}
                            >
                                {ata.name}
                            </Hyperlink>
                        </div>
                        <div className="text-right">
                            <p>
                                {balancesHidden
                                    ? '*****'
                                    : ata.balance.formatted.toLocaleString(
                                          'en-US',
                                          {
                                              minimumFractionDigits: 3,
                                          }
                                      )}
                            </p>
                            <p className="opacity-50">
                                {balancesHidden
                                    ? '***'
                                    : ata.price
                                      ? (
                                            ata.balance.formatted * ata.price
                                        ).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        })
                                      : 'Not available'}
                            </p>
                        </div>
                    </div>
                ))}
        </div>
    )
}
