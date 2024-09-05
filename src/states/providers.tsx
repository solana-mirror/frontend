'use client'

import {
    ConnectionProvider,
    WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { ReactNode, useMemo } from 'react'

interface IProps {
    children: React.ReactNode
}

type Props = {
    children: ReactNode
}

export function Providers({ children }: IProps) {
    return <Wallet>{children}</Wallet>
}

const Wallet = ({ children }: Props) => {
    const network = WalletAdapterNetwork.Devnet

    const endpoint = useMemo(() => clusterApiUrl(network), [network])

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
            new LedgerWalletAdapter(),
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    )

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}
