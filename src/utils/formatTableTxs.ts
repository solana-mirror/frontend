import { ParsedAta, ParsedTransaction } from 'solana-mirror'
import { fromWeb3JsPublicKey } from '@metaplex-foundation/umi-web3js-adapters'
import { PublicKey } from '@solana/web3.js'
import BN from 'bn.js'

export type TokenTransactedDisplay = {
    photo: string
    amount: number
    name: string
    mint: PublicKey
}

export type FormattedTx = {
    date: string[]
    txId: string
    types: string[]
    outgoing: TokenTransactedDisplay[]
    incoming: TokenTransactedDisplay[]
}

export function formatTableTxs(
    txs: ParsedTransaction<BN>[],
    atas: ParsedAta<BN>[]
): FormattedTx[] {
    const formattedTxs: FormattedTx[] = []

    txs.sort((a, b) => b.blockTime - a.blockTime)

    for (const tx of txs) {
        const balances = tx.balances

        const date = new Date(tx.blockTime * 1000).toLocaleString().split(' ')
        const txId = tx.signatures[0]
        let types: string[] = []
        let outgoing: TokenTransactedDisplay[] = []
        let incoming: TokenTransactedDisplay[] = []

        // handle no balances (it will not be included in the following loop)
        if (Object.keys(balances).length === 0) {
            types = tx.parsedInstructions.slice(0, 2)
        }

        for (const [key, balance] of Object.entries(balances)) {
            for (let x = 0; x < atas.length; x++) {
                if (fromWeb3JsPublicKey(atas[x].mint) !== key) {
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
                        : (types = tx.parsedInstructions.slice(0, 2))
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
