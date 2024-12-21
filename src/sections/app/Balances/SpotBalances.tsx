'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ParsedAta } from 'solana-mirror'
import BalanceRow from './BalanceRow'
import BalancesContainer from './BalancesContainer'
import { amountFormatter, priceFormatter } from '@/utils'

type Props = {
    netWorth: number
    atas: ParsedAta<string, string>[]
}

export default function SpotBalances({ netWorth, atas }: Props) {
    const [balancesHidden, setBalancesHidden] = useState(false)
    const [noPriceTokensHidden, setNoPriceTokensHidden] = useState(false)

    const headerContent = (
        <>
            <div className="flex items-center gap-1">
                <p className="text-xl">Spot Balances</p>
                <div className="flex items-center gap-1 text-[6px]">
                    <Image
                        onClick={() => setBalancesHidden(!balancesHidden)}
                        src={balancesHidden ? '/EyeOff.svg' : '/Eye.svg'}
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
                            : priceFormatter.format(netWorth)}
                    </p>
                )}
            </div>
        </>
    )

    return (
        <BalancesContainer header={headerContent}>
            {atas.length ? (
                <>
                    {atas
                        .filter((ata) => !noPriceTokensHidden || ata.price)
                        .map((ata, i) => (
                            <BalanceRow
                                key={i}
                                tokenBalance={amountFormatter.format(
                                    ata.balance.formatted
                                )}
                                value={
                                    ata.price
                                        ? priceFormatter.format(
                                              ata.balance.formatted * ata.price
                                          )
                                        : '-'
                                }
                                tokenIcons={
                                    <Image
                                        src={ata.image || '/defaultCoin.png'}
                                        alt={ata.symbol}
                                        width={24}
                                        height={24}
                                        className="rounded-full h-6 w-6"
                                    />
                                }
                                tokenLabel={ata.name}
                                url={`https://solana.fm/address/${ata.mint}`}
                                balancesHidden={balancesHidden}
                            />
                        ))}
                </>
            ) : (
                <div className="flex flex-grow items-center justify-center text-white/30">
                    No token accounts found
                </div>
            )}
        </BalancesContainer>
    )
}
