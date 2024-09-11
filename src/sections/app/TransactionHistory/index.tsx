import { formatTableTxs } from '@/utils'
import Table from '@/components/Table'
import {
    getTokenAccounts,
    getTransactions,
    ParsedAta,
    TransactionResponse,
} from 'solana-mirror'
import { PublicKey } from '@solana/web3.js'
import { transactionColumns } from './transactionColumns'
import { FormattedTx } from '@/types'

type Props = {
    walletAddress: string
}

export default async function TransactionHistory({ walletAddress }: Props) {
    let txs: FormattedTx<string>[] = []
    let isLoading = false

    try {
        let rawTxs = (await getTransactions(
            new PublicKey(walletAddress)
        )) as TransactionResponse<string>
        let atas = (await getTokenAccounts(
            new PublicKey(walletAddress)
        )) as ParsedAta<string, string>[]
        // TODO: default image
        txs = formatTableTxs(rawTxs.transactions, atas)
    } catch (e) {
        console.log('Error fetching transaction history: ', e)
    }

    return (
        <div className="w-full h-full lg:w-1/2 flex flex-col gap-6 font-semibold p-6">
            <div className="flex justify-between">
                <p className="text-2xl">Transaction History</p>
            </div>
            {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                    <p>Loading Transactions...</p>
                </div>
            ) : (
                <>
                    {txs.length ? (
                        <Table data={txs} columns={transactionColumns} />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center ">
                            <p>No transactions found for this wallet</p>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
