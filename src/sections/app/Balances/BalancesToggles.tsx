'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ParsedAta } from 'solana-mirror'
import Balance from './Balance'

type Props = {
    netWorth: number
    atas: ParsedAta<string, string>[]
}

export default function BalancesToggles({ netWorth, atas }: Props) {
    const [balancesHidden, setBalancesHidden] = useState(false)
    const [noPriceTokensHidden, setNoPriceTokensHidden] = useState(false)

    return (
        <div className="flex flex-col gap-4 p-4 bg-primary rounded-md min-h-48">
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <p className="text-xl">Spot Balances</p>
                    <div className="flex items-center gap-1 text-[6px]">
                        <Image
                            onClick={() => setBalancesHidden(!balancesHidden)}
                            src={balancesHidden ? '/Eye.svg' : '/EyeOff.svg'}
                            alt="Show/hide balances"
                            width={24}
                            height={24}
                        />
                    </div>
                </div>

                <div className="flex gap-4 items-center">
                    <div className="flex gap-1 items-center">
                        <p className="text-sm">Show 0 bals</p>
                        <Image
                            onClick={() =>
                                setNoPriceTokensHidden(!noPriceTokensHidden)
                            }
                            src={
                                noPriceTokensHidden
                                    ? '/ToggleOff.svg'
                                    : '/ToggleOn.svg'
                            }
                            alt="Show/hide 0 balance tokens"
                            width={34}
                            height={18}
                        />
                    </div>
                    {typeof netWorth === 'number' && (
                        <p className="text-accent text-xl">
                            {balancesHidden
                                ? '*****'
                                : netWorth.toLocaleString('en-US', {
                                      style: 'currency',
                                      currency: 'USD',
                                  })}
                        </p>
                    )}
                </div>
            </div>
            {atas.length ? (
                <>
                    {atas
                        .filter((ata) => !noPriceTokensHidden || ata.price)
                        .map((ata, i) => (
                            <Balance
                                key={i}
                                ata={ata}
                                balancesHidden={balancesHidden}
                            />
                        ))}
                </>
            ) : (
                <div className="flex flex-grow items-center justify-center text-white/30">
                    No token accounts found
                </div>
            )}
        </div>
    )
}
