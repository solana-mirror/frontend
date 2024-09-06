'use client'

import { useEffect, useState, useTransition } from 'react'
import { SearchInput } from '../SearchInput'
import Link from 'next/link'
import { cn, formatAddress } from '@/utils'
import { useWallet } from '@solana/wallet-adapter-react'
import { useRouter } from 'next/navigation'
import { Button } from '../UI/Button'
import Image from 'next/image'
import ConnectWalletModal from './ConnectWalletModal'
import WalletModal from './WalletModal'

type Props = {
    isAddress: boolean
}

export default function NavBar({ isAddress }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [justConnected, setJustConnected] = useState(false)
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const { publicKey } = useWallet()

    useEffect(() => {
        if (publicKey && justConnected) {
            startTransition(() => {
                router.push(`/address/${publicKey.toString()}`)
            })
            setJustConnected(false)
        }
    }, [publicKey, justConnected, router])

    return (
        <>
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
                    <Button
                        onClick={() => setIsModalOpen(!isModalOpen)}
                        size={'md'}
                        color={'dark_accent'}
                    >
                        Connect Wallet
                    </Button>
                ) : (
                    <>
                        {isPending ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href={`/address/${publicKey.toString()}`}>
                                    <Button
                                        onClick={() => {}}
                                        color={'primary'}
                                        size={'icon'}
                                    >
                                        <Image
                                            src={'/User.svg'}
                                            alt="user"
                                            width={18}
                                            height={18}
                                        />
                                    </Button>
                                </Link>

                                <Button
                                    onClick={() => setIsModalOpen(!isModalOpen)}
                                    size={'md'}
                                    color={'primary'}
                                >
                                    {formatAddress(publicKey.toString(), 4)}
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {isModalOpen && publicKey ? (
                <WalletModal
                    onToggleModal={() => setIsModalOpen(!isModalOpen)}
                />
            ) : isModalOpen && !publicKey ? (
                <ConnectWalletModal
                    onToggleModal={() => setIsModalOpen(!isModalOpen)}
                    onWalletConnect={() => setJustConnected(true)}
                />
            ) : (
                ''
            )}
        </>
    )
}
