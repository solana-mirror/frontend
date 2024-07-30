import Image from 'next/image'
import { Button } from '../Button'
import { Modal } from '../Modal'
import { Wallet } from '.'
import { WalletName } from '@solana/wallet-adapter-base'

type Props = {
    wallets: Record<Wallet, WalletName>
    isModalOpen: boolean
    onToggleModal: () => void
    onConnectWallet: (walletName: string) => void
}

export const NoAddress = ({
    wallets,
    isModalOpen,
    onToggleModal,
    onConnectWallet,
}: Props) => {
    return (
        <>
            <Button onClick={onToggleModal} size={'md'} color={'dark_accent'}>
                Connect Wallet
            </Button>
            {isModalOpen && (
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
                                    onConnectWallet(walletName)
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
                                <p className="text-sm font-bold">
                                    {walletName}
                                </p>
                            </button>
                        ))}
                    </div>
                </Modal>
            )}
        </>
    )
}
