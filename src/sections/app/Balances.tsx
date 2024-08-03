'use client'

import { useEffect, useState } from 'react'
import SolanaMirror from 'solana-mirror'
import Image from 'next/image'
import { Hyperlink } from '@/components/Hyperlink'
import { useAppDispatch, useAppSelector } from '@/state/store'
import { selectAtasValue, selectClientValue } from '@/state/user/selector'
import { fetchAtas } from '@/state/user/thunk'
import { setClient } from '@/state/user/reducer'
import { PublicKey } from '@solana/web3.js'

type BalancesProps = {
    walletAddress: string
}

export default function Balances({ walletAddress }: BalancesProps) {
    const [netWorth, setNetWorth] = useState<number>()
    const [balancesHidden, setBalancesHidden] = useState(false)
    const [noPriceTokensHidden, setNoPriceTokensHidden] = useState(true)

    const dispatch = useAppDispatch()

    const rpc = process.env.NEXT_PUBLIC_RPC_ENDPOINT as string

    const client = useAppSelector(selectClientValue)
    const atas = useAppSelector(selectAtasValue)
        .filter((x) => x.balance.formatted !== 0)
        .sort(
            (a, b) =>
                b.balance.formatted * b.price - a.balance.formatted * a.price
        )

    async function _getNetWorth() {
        const _netWorth = await client?.getNetWorth()
        setNetWorth(_netWorth)
    }

    useEffect(
        () => {
            if (
                client &&
                walletAddress === client.getWatchAddress().toString()
            ) {
                _getNetWorth()
                return
            }
            dispatch(
                setClient(
                    new SolanaMirror({
                        watch: new PublicKey(walletAddress),
                        rpc,
                    })
                )
            )
            dispatch(fetchAtas({}))
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        [client, dispatch, rpc, walletAddress]
    )

    return (
        <div className="flex-grow text-center p-4 font-bold md:h-1/2">
            <div className="flex flex-col gap-4 p-4 bg-primary rounded-md">
                <div className="flex justify-between">
                    <div className="flex items-center gap-1">
                        <p className="text-xl">Spot Balances</p>
                        {typeof netWorth === 'number' && (
                            <div className="flex items-center gap-1 text-[6px]">
                                <Image
                                    onClick={() =>
                                        setBalancesHidden(!balancesHidden)
                                    }
                                    src={`/Eye${balancesHidden ? 'Off' : ''}.svg`}
                                    alt={`Eye ${balancesHidden ? 'Off' : ''}`}
                                    width={24}
                                    height={24}
                                />
                                <Image
                                    onClick={() =>
                                        setNoPriceTokensHidden(
                                            !noPriceTokensHidden
                                        )
                                    }
                                    src={`/Zoom${noPriceTokensHidden ? 'Close' : 'Check'}.svg`}
                                    alt={`Zoom ${noPriceTokensHidden ? 'Close' : 'Check'}`}
                                    width={20}
                                    height={20}
                                />
                            </div>
                        )}
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
                        <div
                            key={i}
                            className="flex items-center justify-between"
                        >
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
                                                ata.balance.formatted *
                                                ata.price
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
        </div>
    )
}
