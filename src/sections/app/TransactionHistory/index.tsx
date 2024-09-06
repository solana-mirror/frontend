import { formatTableTxs, normalizeData } from '@/utils'
import Table from '@/components/Table'
import { getTokenAccounts, getTransactions } from 'solana-mirror'
import { PublicKey } from '@solana/web3.js'
import { columns } from './Columns'
import { FormattedTx } from '@/types'

type Props = {
    walletAddress: string
}

export default async function TransactionHistory({ walletAddress }: Props) {
    let txs: FormattedTx[] = []
    let isLoading = false

    try {
        let rawTxs = await getTransactions(new PublicKey(walletAddress))
        let atas = await getTokenAccounts(new PublicKey(walletAddress))

        //TODO: handle a proper way of adding inaccesible images
        for (const ata of atas) {
            if (ata.symbol === 'BILLY') {
                ata.image = '/Billy.svg'
                break
            }
        }

        txs = formatTableTxs(rawTxs, atas)
    } catch (e) {
        console.log('Error fetching transaction history: ', e)
    }

    return (
        <div className="w-full h-full md:w-1/2 flex flex-col gap-6 font-semibold p-6">
            <div className="flex justify-between">
                <p className="text-2xl">Transaction History</p>
            </div>
            {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                    <p>Loading Transactions...</p>
                </div>
            ) : (
                <div className="h-full">
                    {txs.length ? (
                        <Table data={normalizeData(txs)} columns={columns} />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <p>No transactions found for this wallet</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
