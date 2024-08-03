import { cn, copy, formatAddress } from '@/utils'
import { Button } from '../Button'
import { useAppSelector } from '@/state/store'
import { selectAtasValue } from '@/state/user/selector'
import { useState, useEffect } from 'react'
import { Modal } from '../Modal'
import { PublicKey } from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react'

type Props = {
    onToggleModal: () => void
}

export default function WalletModal({ onToggleModal }: Props) {
    const { disconnect, publicKey } = useWallet()

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
        <Modal
            onClose={onToggleModal}
            className={'flex flex-col items-center gap-4'}
        >
            <div className="flex flex-col items-center gap-1 font-bold">
                <p className={cn('text-xl', copied && 'opacity-50')}>
                    {formatAddress((publicKey as PublicKey).toString(), 4)}
                </p>
                <p className="text-sm opacity-50">
                    {solAta ? solAta.balance.formatted.toFixed(2) : '0.00'}
                </p>
            </div>
            <div className="flex gap-3">
                <Button
                    onClick={() => {
                        copy((publicKey as PublicKey).toString())
                        setCopied(true)
                    }}
                    size={'md'}
                    color={'dark_accent'}
                >
                    Copy Address
                </Button>
                <Button
                    onClick={() => {
                        disconnect()
                        onToggleModal()
                    }}
                    size={'md'}
                    color={'red'}
                >
                    Disconnect
                </Button>
            </div>
        </Modal>
    )
}
