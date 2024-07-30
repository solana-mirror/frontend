import { formatAddress, copy, cn } from '@/utils'
import Link from 'next/link'
import { Button } from '../Button'
import { Modal } from '../Modal'
import Image from 'next/image'
import { PublicKey } from '@solana/web3.js'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/state/store'
import { selectAtasValue } from '@/state/user/selector'

type Props = {
    publicKey: PublicKey
    isModalOpen: boolean
    onToggleModal: () => void
    onDisconnectWallet: () => void
}

export const UserItems = ({
    publicKey,
    isModalOpen,
    onToggleModal,
    onDisconnectWallet,
}: Props) => {
    const [copied, setCopied] = useState(false)
    const atas = useAppSelector(selectAtasValue)

    const solAta = atas.find((x) => x.symbol === 'SOL')

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => setCopied(false), 1000)
            return () => clearTimeout(timer)
        }
    }, [copied])

    return (
        <>
            <div className="flex items-center gap-2">
                <Link href={`/address/${publicKey.toString()}`}>
                    <Button onClick={() => {}} color={'primary'} size={'icon'}>
                        <Image
                            src={'/User.svg'}
                            alt="user"
                            width={18}
                            height={18}
                        />
                    </Button>
                </Link>

                <Button onClick={onToggleModal} size={'md'} color={'primary'}>
                    {formatAddress(publicKey.toString(), 4)}
                </Button>
            </div>
            {isModalOpen && (
                <Modal
                    onClose={onToggleModal}
                    className={'flex flex-col items-center gap-4'}
                >
                    <div className="flex flex-col items-center gap-1 font-bold">
                        <p className={cn('text-xl', copied && 'opacity-50')}>
                            {formatAddress(publicKey.toString(), 4)}
                        </p>
                        <p className="text-sm opacity-50">
                            {solAta
                                ? solAta.balance.formatted.toFixed(2)
                                : '0.00'}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            onClick={() => {
                                copy(publicKey.toString())
                                setCopied(true)
                            }}
                            size={'md'}
                            color={'dark_accent'}
                        >
                            Copy Address
                        </Button>
                        <Button
                            onClick={() => {
                                onDisconnectWallet()
                                onToggleModal()
                            }}
                            size={'md'}
                            color={'red'}
                        >
                            Disconnect
                        </Button>
                    </div>
                </Modal>
            )}
        </>
    )
}
