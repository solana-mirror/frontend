import { PublicKey } from '@solana/web3.js'
import {
    BitgetWalletName,
    MathWalletName,
    PhantomWalletName,
    SolflareWalletName,
    TokenPocketWalletName,
} from '@solana/wallet-adapter-wallets'
import { WalletName } from '@solana/wallet-adapter-base'

export type AddressValidation = {
    address: PublicKey | string
    invalidAddress: boolean
}

export type TokenTransactedDisplay<P extends PublicKey | string> = {
    photo: string
    amount: number
    name: string
    mint: P
}

export type FormattedTx<P extends PublicKey | string> = {
    date: string[]
    txId: string
    types: string[]
    outgoing: TokenTransactedDisplay<P>[]
    incoming: TokenTransactedDisplay<P>[]
}

export enum Wallet {
    Phantom = 'Phantom',
    Solflare = 'Solflare',
    Bitget = 'Bitget',
    TokenPocket = 'TokenPocket',
    MathWallet = 'MathWallet',
}

export const wallets: Record<Wallet, WalletName> = {
    Phantom: PhantomWalletName,
    Solflare: SolflareWalletName,
    Bitget: BitgetWalletName,
    TokenPocket: TokenPocketWalletName,
    MathWallet: MathWalletName,
}
