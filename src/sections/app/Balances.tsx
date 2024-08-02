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

    const dispatch = useAppDispatch()

    const rpc = process.env.NEXT_PUBLIC_RPC_ENDPOINT as string

    const client = useAppSelector(selectClientValue)
    const atas = useAppSelector(selectAtasValue)
        .filter((x) => x.balance.formatted !== 0)
        .sort(
            (a, b) =>
                b.balance.formatted * b.price - a.balance.formatted * a.price
        ) // only tokens with balance !== 0 and sorted from highest to lowest balance

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
                    <p className="text-xl">Spot Balances</p>
                    <p className="text-accent">
                        {netWorth?.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        })}
                    </p>
                </div>
                {atas?.map((ata, i) => (
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
                                {ata.balance.formatted.toLocaleString('en-US', {
                                    minimumFractionDigits: 3,
                                })}
                            </p>
                            <p className="opacity-50">
                                {ata.price
                                    ? (
                                          ata.balance.formatted * ata.price
                                      ).toLocaleString('en-US', {
                                          style: 'currency',
                                          currency: 'USD',
                                      })
                                    : '—'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
