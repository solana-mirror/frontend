import { ParsedAta, ParsedTransaction } from 'solana-mirror'
import { FormattedTx, TokenTransactedDisplay } from '@/types'

export function formatAddress(address: string, chars: number) {
    return `${address.slice(0, chars)}...${address.slice(-chars)}`
}

export function formatTableTxs(
    txs: ParsedTransaction<string>[],
    atas: ParsedAta<string, string>[]
): FormattedTx<string>[] {
    const formattedTxs: FormattedTx<string>[] = []

    txs.sort((a, b) => b.blockTime - a.blockTime)

    for (const tx of txs) {
        const balances = tx.balances

        const date = new Date(tx.blockTime * 1000).toLocaleString().split(' ')
        const txId = tx.signatures[0]
        let types: string[] = []
        let outgoing: TokenTransactedDisplay<string>[] = []
        let incoming: TokenTransactedDisplay<string>[] = []

        // handle no balances (it will not be included in the following loop)
        if (Object.keys(balances).length === 0) {
            types = tx.parsedInstructions
        }

        for (const [key, balance] of Object.entries(balances)) {
            for (let x = 0; x < atas.length; x++) {
                if (atas[x].mint !== key) {
                    continue
                }

                const change = balance.post.formatted - balance.pre.formatted

                if (change > 0) {
                    types = ['Receive']
                    incoming.push({
                        photo: atas[x].image,
                        amount: change,
                        name: atas[x].symbol,
                        mint: atas[x].mint,
                    })
                }

                if (change < 0) {
                    types = ['Send']
                    outgoing.push({
                        photo: atas[x].image,
                        amount: -change,
                        name: atas[x].symbol,
                        mint: atas[x].mint,
                    })
                }

                // handle swap or liquidity pool movement
                if (incoming.length && outgoing.length) {
                    const swapInstruction = tx.parsedInstructions.find(
                        (x) => x === 'Swap'
                    )
                    swapInstruction
                        ? (types = [swapInstruction])
                        : (types = tx.parsedInstructions)
                }
            }
        }

        formattedTxs.push({
            date,
            txId,
            types,
            outgoing,
            incoming,
        })
    }

    return formattedTxs
}
