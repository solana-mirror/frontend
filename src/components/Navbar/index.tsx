'use client'

import { useCallback, useEffect, useState, useTransition } from 'react'
import { SearchInput } from '../SearchInput'
import Link from 'next/link'
import { cn } from '@/utils'
import { useWallet } from '@solana/wallet-adapter-react'
import {
    BitgetWalletName,
    MathWalletName,
    PhantomWalletName,
    SolflareWalletName,
    TokenPocketWalletName,
} from '@solana/wallet-adapter-wallets'
import { NoAddress } from './NoAddress'
import { UserItems } from './UserItems'
import { useRouter } from 'next/navigation'
import { WalletName } from '@solana/wallet-adapter-base'

type NavBarProps = {
    isAddress: boolean
}

export enum Wallet {
    Phantom = 'Phantom',
    Solflare = 'Solflare',
    Bitget = 'Bitget',
    TokenPocket = 'TokenPocket',
    MathWallet = 'MathWallet',
}

const wallets: Record<Wallet, WalletName> = {
    Phantom: PhantomWalletName,
    Solflare: SolflareWalletName,
    Bitget: BitgetWalletName,
    TokenPocket: TokenPocketWalletName,
    MathWallet: MathWalletName,
}

export const NavBar = ({ isAddress }: NavBarProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [justConnected, setJustConnected] = useState(false)
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const { select, publicKey, disconnect } = useWallet()

    const connectWallet = useCallback(
        (walletName: string) => {
            select(wallets[walletName as Wallet])
        },
        [select]
    )

    useEffect(() => {
        if (publicKey && justConnected) {
            startTransition(() => {
                router.push(`/address/${publicKey.toString()}`)
            })
            setJustConnected(false)
        }
    }, [publicKey, justConnected, router])

    const handleConnectWallet = (walletName: string) => {
        setJustConnected(true)
        connectWallet(walletName)
    }

    return (
        <div
            className={cn(
                'w-full flex items-center justify-between py-4 md:py-6 px-4 sm:px-9',
                !isAddress && 'fixed'
            )}
        >
            <div className="font-bold text-accent text-base md:text-xl">
                <Link href={'/'}>SolanaMirror</Link>
            </div>
            {isAddress && <SearchInput position={'navbar'} />}
            {!publicKey ? (
                <NoAddress
                    wallets={wallets}
                    isModalOpen={isModalOpen}
                    onToggleModal={() => {
                        setIsModalOpen(!isModalOpen)
                    }}
                    onConnectWallet={(walletName) =>
                        handleConnectWallet(walletName)
                    }
                />
            ) : (
                <>
                    {isPending ? (
                        <p>Loading...</p>
                    ) : (
                        <UserItems
                            publicKey={publicKey}
                            isModalOpen={isModalOpen}
                            onToggleModal={() => setIsModalOpen(!isModalOpen)}
                            onDisconnectWallet={() => disconnect()}
                        />
                    )}
                </>
            )}
        </div>
    )
}
