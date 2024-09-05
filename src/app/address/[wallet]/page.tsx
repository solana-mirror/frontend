import { PublicKey } from '@solana/web3.js'
import NavBar from '@/components/Navbar'
import AddressBar from '@/sections/app/AddressBar'
import Balances from '@/sections/app/Balances'
import TransactionHistory from '@/sections/app/TransactionHistory'
import { Suspense } from 'react'
import React from 'react'

const Chart = React.lazy(() => import('@/sections/app/Chart'))

type Props = {
    params: {
        wallet: string
    }
}

export default function App({ params }: Props) {
    const walletAddress = params.wallet

    let watch

    try {
        watch = new PublicKey(walletAddress.toString())
    } catch {
        console.error('Invalid public key input')
    }

    return (
        <div className="h-screen flex flex-col">
            <NavBar isAddress={true} />
            <div className="flex-grow overflow-y-auto no-scrollbar">
                {watch ? (
                    <div className="h-full flex flex-col">
                        <AddressBar walletAddress={walletAddress} />
                        <div className="flex flex-grow flex-col md:flex-row">
                            <div className="w-full md:w-1/2 flex flex-col">
                                <Suspense
                                    fallback={
                                        <div className="w-full flex items-center justify-center md:h-1/2">
                                            Loading...
                                        </div>
                                    }
                                >
                                    <Chart walletAddress={walletAddress} />
                                </Suspense>

                                <Balances walletAddress={walletAddress} />
                            </div>
                            <TransactionHistory walletAddress={walletAddress} />
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center w-full h-full">
                        <p className="text-center font-bold text-2xl">
                            Unable to find account {walletAddress}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
