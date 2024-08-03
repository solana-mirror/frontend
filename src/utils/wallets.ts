import {
    BitgetWalletName,
    MathWalletName,
    PhantomWalletName,
    SolflareWalletName,
    TokenPocketWalletName,
} from '@solana/wallet-adapter-wallets'
import { WalletName } from '@solana/wallet-adapter-base'

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
