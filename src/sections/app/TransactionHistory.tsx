'use client'

import { FormattedTx, formatTableTxs } from '@/utils/formatTableTxs'
import { useEffect, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import Image from 'next/image'
import Table from '@/components/Table'
import { formatAddress } from '@/utils'
import { Hyperlink } from '@/components/Hyperlink'
import { useAppSelector } from '@/state/store'
import { selectClient, selectAtas } from '@/state/user/reducer'

const columnHelper = createColumnHelper<FormattedTx>()

const columns = [
    columnHelper.accessor(
        (row) => {
            return { year: row.date[0], hour: row.date[1] }
        },
        {
            id: 'date',
            cell: (info) => {
                const { year, hour } = info.getValue()
                return (
                    <div className="flex flex-col">
                        <p>{year}</p>
                        <p>{hour}</p>
                    </div>
                )
            },
        }
    ),
    columnHelper.accessor(
        (row) => {
            return { txId: row.txId }
        },
        {
            id: 'txid',
            cell: (info) => {
                const { txId } = info.getValue()
                return (
                    <Hyperlink href={`https://solscan.io/tx/${txId}`}>
                        {formatAddress(txId, 4)}
                    </Hyperlink>
                )
            },
        }
    ),
    columnHelper.accessor(
        (row) => {
            return { types: row.types }
        },
        {
            id: 'types',
            cell: (info) => {
                const { types } = info.getValue()
                return types.length !== 1 ? (
                    <div className="flex flex-col gap-1 text-xs xl:text-sm">
                        {types.map((type, i) => (
                            <div
                                className="bg-secondary w-fit py-1 px-2 rounded-md"
                                key={i}
                            >
                                {type}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Image
                            src={`/${types[0]}Arrow.svg`}
                            alt={`${types[0]} arrow`}
                            width={20}
                            height={20}
                            className="min-w-5"
                        />
                        {types[0]}
                    </div>
                )
            },
        }
    ),
    columnHelper.accessor(
        (row) => {
            return { outgoing: row.outgoing }
        },
        {
            id: 'outgoing',
            cell: (info) => {
                const { outgoing } = info.getValue()
                return (
                    <div className="flex flex-col gap-1">
                        {outgoing.length ? (
                            outgoing.map((bal, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-1 sm:whitespace-nowrap"
                                >
                                    <Image
                                        src={bal.photo}
                                        alt={`image`}
                                        width={24}
                                        height={24}
                                        className="rounded-full min-w-6 min-h-6"
                                    />
                                    <div>
                                        {bal.amount
                                            .toString()
                                            .split('')
                                            // handle some e^-7 or less to display it accordingly
                                            .find((x) => x === 'e') ? (
                                            <p className="text-sm">
                                                {bal.amount
                                                    .toFixed(7)
                                                    .concat('...')}
                                            </p>
                                        ) : (
                                            bal.amount.toFixed(2)
                                        )}
                                    </div>
                                    <Hyperlink
                                        href={`https://solscan.io/token/${bal.mint}`}
                                    >
                                        {bal.name
                                            ? bal.name
                                            : formatAddress(
                                                  bal.mint.toString(),
                                                  4
                                              )}
                                    </Hyperlink>
                                </div>
                            ))
                        ) : (
                            <p className="text-opacity-50">-</p>
                        )}
                    </div>
                )
            },
        }
    ),
    columnHelper.accessor(
        (row) => {
            return { incoming: row.incoming }
        },
        {
            id: 'incoming',
            cell: (info) => {
                const { incoming } = info.getValue()
                return (
                    <div className="flex flex-col gap-1">
                        {incoming.length ? (
                            incoming.map((bal, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-1 sm:whitespace-nowrap"
                                >
                                    <Image
                                        src={bal.photo}
                                        alt={`image`}
                                        width={24}
                                        height={24}
                                        className="rounded-full min-w-6 min-h-6"
                                    />
                                    <div>
                                        {bal.amount
                                            .toString()
                                            .split('')
                                            // handle some e^-7 or similar to display it accordingly
                                            .find((x) => x === 'e') ? (
                                            <p className="text-sm">
                                                {bal.amount
                                                    .toFixed(7)
                                                    .concat('...')}
                                            </p>
                                        ) : (
                                            bal.amount.toFixed(2)
                                        )}
                                    </div>
                                    <Hyperlink
                                        href={`https://solscan.io/token/${bal.mint}`}
                                    >
                                        {bal.name
                                            ? bal.name
                                            : formatAddress(
                                                  bal.mint.toString(),
                                                  4
                                              )}
                                    </Hyperlink>
                                </div>
                            ))
                        ) : (
                            <p className="text-opacity-50">-</p>
                        )}
                    </div>
                )
            },
        }
    ),
]

export default function TransactionHistory() {
    const [txs, setTxs] = useState<FormattedTx[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>()

    const client = useAppSelector(selectClient)
    const atas = useAppSelector(selectAtas)
        .filter((x) => x.balance.formatted !== 0)
        .sort(
            (a, b) =>
                b.balance.formatted * b.price - a.balance.formatted * a.price
        )

    useEffect(() => {
        if (txs.length || !atas.length) {
            return
        }

        async function getData() {
            if (!client) {
                return
            }
            const limit = 10

            const _txs = await client.getTransactions({
                batchSize: limit,
                limit,
            })
            const formattedTxs = formatTableTxs(_txs, atas)
            setTxs(formattedTxs)
            setIsLoading(false)

            setIsLoadingMore(true)
            const moreTxs = await client.getTransactions({
                batchSize: limit,
                limit,
            })
            const formattedMoreTxs = formatTableTxs(moreTxs, atas)
            setTxs(formattedMoreTxs)
            setIsLoadingMore(false)
        }

        getData()
    }, [client, atas, txs.length])

    return (
        <div className="w-full h-full md:w-1/2 flex flex-col gap-6 font-semibold p-6">
            <div className="flex justify-between">
                <p className="text-2xl">Transaction History</p>
                {isLoadingMore && (
                    <p className="text-sm animate-bounce">Loading more...</p>
                )}
            </div>
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
