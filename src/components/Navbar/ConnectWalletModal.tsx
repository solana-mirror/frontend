import { Modal } from '../UI/Modal'
import Image from 'next/image'
import { useCallback } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Wallet, wallets } from '@/utils/wallets'

type Props = {
    onToggleModal: () => void
    onWalletConnect?: () => void
}

export default function ConnectWalletModal({
    onToggleModal,
    onWalletConnect = () => {},
}: Props) {
    const { select } = useWallet()

    const connectWallet = useCallback(
        (walletName: string) => {
            select(wallets[walletName as Wallet])
            onWalletConnect()
        },
        [select, onWalletConnect]
    )
    return (
        <Modal
            onClose={onToggleModal}
            className={'flex flex-col w-96 items-start gap-[18px]'}
        >
            <p className="text-xl font-bold">Connect Wallet</p>
            <div className="flex flex-col gap-2 w-full">
                {Object.keys(wallets).map((walletName, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            connectWallet(walletName)
                            onToggleModal()
                        }}
                        className="flex items-center w-full gap-3 py-3 px-4 bg-secondary rounded-sm hover:opacity-70 transition duration-300"
                    >
                        <Image
                            src={`/wallets/${walletName}.png`}
                            alt={walletName}
                            width={24}
                            height={24}
                            className="text-[6px] text-left"
                        />
                        <p className="text-sm font-bold">{walletName}</p>
                    </button>
                ))}
            </div>
        </Modal>
    )
}
