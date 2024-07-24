import { useEffect, useState } from 'react'
import SolanaMirror, { ParsedAta } from 'solana-mirror'
import Image from 'next/image'
import { Hyperlink } from '@/components/Hyperlink'

type BalancesProps = {
    client: SolanaMirror
    atas: ParsedAta[]
}

export default function Balances({ client, atas }: BalancesProps) {
    const [netWorth, setNetWorth] = useState<number>()

    useEffect(() => {
        async function getData() {
            const _netWorth = await client.getNetWorth()
            setNetWorth(_netWorth)
        }
        getData()
    }, [client])

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
                                children={ata.name}
                                href={`https://solscan.io/token/${ata.mint}`}
                            />
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
