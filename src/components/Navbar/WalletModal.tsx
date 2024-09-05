import { cn, copy, formatAddress } from '@/utils'
import { Button } from '../UI/Button'
import { useState, useEffect } from 'react'
import { Modal } from '../UI/Modal'
import { Connection, PublicKey } from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react'

type Props = {
    onToggleModal: () => void
}

export default function WalletModal({ onToggleModal }: Props) {
    const [solBalance, setSolBalance] = useState<number>()
    const [copied, setCopied] = useState(false)

    const { disconnect, publicKey } = useWallet()

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => setCopied(false), 1000)
            return () => clearTimeout(timer)
        }
    }, [copied])

    const rpc = process.env.NEXT_PUBLIC_RPC_ENDPOINT as string
    const client = new Connection(rpc)

    useEffect(() => {
        getSolBalance()
    }, [publicKey])

    async function getSolBalance() {
        if (!publicKey) {
            return
        }

        setSolBalance(await client.getBalance(publicKey))
    }

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
                    {solBalance ? solBalance : '0.00'}
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
