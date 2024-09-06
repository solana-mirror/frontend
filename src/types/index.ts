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
    inValidAddress: boolean
}

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
