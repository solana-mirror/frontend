import {
    FormattedTx,
    TokenTransactedDisplay,
    formatTableTxs,
} from '@/utils/formatTableTxs'

import { useEffect, useState } from 'react'
import SolanaMirror, { ParsedAta } from 'solana-mirror'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import Image from 'next/image'
import Table from '@/components/Table'
import { fetchImages } from '@/services/fetchImage'
import { formatAddress } from '@/utils'

type TransactionHistoryProps = {
    client: SolanaMirror
}

const columns: ColumnDef<FormattedTx>[] = [
    {
        header: 'Date',
        accessorKey: 'date',
        cell: ({ getValue }) => {
            const value = getValue() as string[]
            return (
                <div className="flex flex-col mr-1">
                    {value.map((x, i) => (
                        <div key={i}>{x}</div>
                    ))}
                </div>
            )
        },
    },
    {
        header: 'TX ID',
        accessorKey: 'txId',
        cell: ({ getValue }) => {
            const value = getValue() as string
            return (
                <Link
                    className="text-blue underline hover:opacity-70 mr-1"
                    href={`https://solscan.io/tx/${value}`}
                >
                    {formatAddress(value, 4)}
                </Link>
            )
        },
    },
    {
        header: 'Type',
        accessorKey: 'types',
        cell: ({ getValue }) => {
            const value = getValue() as string[]
            return value.length !== 1 ? (
                <div className="flex flex-col gap-1 mr-1 text-xs xl:text-sm">
                    {value.map((x, i) => (
                        <div
                            className="bg-type_bg w-fit py-1 px-2 rounded-md"
                            key={i}
                        >
                            {x}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center gap-2 mr-1">
                    <Image
                        src={`/${value[0]}Arrow.svg`}
                        alt={`${value[0]} arrow`}
                        width={18}
                        height={18}
                        className="min-w-5"
                    />
                    {value[0]}
                </div>
            )
        },
    },
    {
        header: 'Outgoing',
        accessorKey: 'outgoing',
        cell: ({ getValue }) => {
            const value = getValue() as TokenTransactedDisplay[]
            return (
                <div className="flex flex-col gap-1 mr-1">
                    {value.length ? (
                        value.map((bal, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-1 sm:whitespace-nowrap"
                            >
                                <Image
                                    src={bal.photo}
                                    alt={`image`}
                                    width={32}
                                    height={32}
                                    className="rounded-full min-w-8"
                                />
                                <p>{bal.amount.toFixed(2)}</p>
                                <Link
                                    href={`https://solscan.io/token/${bal.mint}`}
                                    className="text-blue underline hover:opacity-70"
                                >
                                    {bal.name
                                        ? bal.name
                                        : formatAddress(bal.mint.toString(), 4)}
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="text-opacity-50">-</p>
                    )}
                </div>
            )
        },
    },
    {
        header: 'Incoming',
        accessorKey: 'incoming',
        cell: ({ getValue }) => {
            const value = getValue() as TokenTransactedDisplay[]
            return (
                <div className="flex flex-col gap-1 mr-1">
                    {value.length ? (
                        value.map((bal, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-1 sm:whitespace-nowrap"
                            >
                                <Image
                                    src={bal.photo}
                                    alt={`image`}
                                    width={32}
                                    height={32}
                                    className="rounded-full min-w-8"
                                />
                                <p>{bal.amount.toFixed(2)}</p>
                                <Link
                                    href={`https://solscan.io/token/${bal.mint}`}
                                    className="text-blue underline hover:opacity-70"
                                >
                                    {bal.name
                                        ? bal.name
                                        : formatAddress(bal.mint.toString(), 4)}
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="text-opacity-50">-</p>
                    )}
                </div>
            )
        },
    },
]

export default function TransactionHistory({
    client,
}: TransactionHistoryProps) {
    const [txs, setTxs] = useState<FormattedTx[]>([])
    const [atas, setAtas] = useState<ParsedAta[]>()
    const [isLoading, setIsLoading] = useState<boolean>()

    useEffect(() => {
        if (txs.length) {
            return
        }

        async function getData() {
            setIsLoading(true)
            const limit = 5

            const _txs = await client.getTransactions({
                batchSize: limit,
                limit,
            })
            const _atas = await client.getTokenAccounts()
            const _atasWithImages = await fetchImages(_atas)
            const formattedTxs = formatTableTxs(_txs, _atasWithImages)

            setTxs(formattedTxs)
            setAtas(_atasWithImages)
            setIsLoading(false)

            const moreTxs = await client.getTransactions({
                batchSize: limit,
                limit,
            })
            const formattedMoreTxs = formatTableTxs(moreTxs, _atasWithImages)
            setTxs(formattedMoreTxs)
        }

        getData()
    }, [client])

    return (
        <div className="w-full h-full md:w-1/2 flex flex-col gap-6 font-semibold py-6 px-4">
            <p className="text-2xl">Transaction History</p>
            {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                    <p className="animate-bounce">Loading Transactions</p>
                </div>
            ) : (
                <div className="h-full">
                    <Table data={txs} columns={columns} />
                </div>
            )}
        </div>
    )
}
