'use client'

import Table from '@/components/Table'
import { transactionColumns } from './transactionColumns'
import { FormattedTx } from '@/types'
import { useEffect, useMemo, useState } from 'react'
import { PublicKey } from '@solana/web3.js'
import {
    getTokenAccounts,
    getTransactions,
    ParsedAta,
    TransactionResponse,
} from 'solana-mirror'
import { debounce, formatTableTxs } from '@/utils'

type Props = {
    walletAddress: string
}

export default function TransactionHistory({ walletAddress }: Props) {
    const publicKey = useMemo(
        () => new PublicKey(walletAddress),
        [walletAddress]
    )

    const [isLoading, setIsLoading] = useState(true)
    const [txs, setTxs] = useState<FormattedTx<string>[]>([])
    const [atas, setAtas] = useState<ParsedAta<string, string>[]>([])
    const [count, setCount] = useState(0)
    const [pageIdx, setPageIdx] = useState(0)

    useEffect(() => {
        setIsLoading(true)
    }, [])

    useEffect(() => {
        async function fetchAtas() {
            const _atas = (await getTokenAccounts(publicKey)) as ParsedAta<
                string,
                string
            >[]
            setAtas(_atas)
        }

        fetchAtas()
    }, [publicKey])

    useEffect(() => {
        const debouncedFetchData = debounce(async () => {
            setIsLoading(true)
            const rawTxs = (await getTransactions(publicKey, [
                pageIdx * 15,
                pageIdx * 15 + 14,
            ])) as TransactionResponse<string>

            setCount(rawTxs.count)

            const formattedTxs = formatTableTxs(rawTxs.transactions, atas)
            setTxs(formattedTxs)
            setIsLoading(false)
        }, 500)

        if (atas.length) {
            debouncedFetchData()
        }

        return () => {
            debouncedFetchData.cancel()
        }
    }, [walletAddress, pageIdx, atas, publicKey])

    return (
        <div className="w-full h-full lg:w-1/2 flex flex-col gap-6 font-semibold p-6">
            <div className="flex justify-between">
                <p className="text-2xl">Transaction History</p>
            </div>
            {txs.length || isLoading ? (
                <Table
                    data={txs}
                    columns={transactionColumns}
                    pageIdx={pageIdx}
                    setPageIdx={setPageIdx}
                    count={count}
                    isLoading={isLoading}
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <p>No transactions found for this wallet</p>
                </div>
            )}
        </div>
    )
}
