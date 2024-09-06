import { ParsedAta, ParsedTransaction } from 'solana-mirror'
import { fromWeb3JsPublicKey } from '@metaplex-foundation/umi-web3js-adapters'
import BN from 'bn.js'
import { FormattedTx, TokenTransactedDisplay } from '@/types'
import { PublicKey } from '@solana/web3.js'

export function formatAddress(address: string, chars: number) {
    return `${address.slice(0, chars)}...${address.slice(-chars)}`
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

// helper functions to normalize data

function isBN(value: any): value is BN {
    return BN.isBN(value)
}

function isPublicKey(value: any): value is PublicKey {
    return value instanceof PublicKey
}

function normalizeValue(value: any): any {
    if (isBN(value)) {
        return value.toString()
    }

    if (isPublicKey(value)) {
        return value.toBase58()
    }

    if (Array.isArray(value)) {
        return value.map(normalizeValue)
    }

    if (value && typeof value === 'object') {
        const normalizedObject: any = {}
        for (const [key, val] of Object.entries(value)) {
            normalizedObject[key] = normalizeValue(val)
        }
        return normalizedObject
    }

    return value
}

export function normalizeData<T>(data: T): T {
    return normalizeValue(data)
}
