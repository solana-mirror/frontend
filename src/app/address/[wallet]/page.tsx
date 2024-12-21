import { PublicKey } from '@solana/web3.js'
import NavBar from '@/components/Navbar'
import AddressBar from '@/sections/app/AddressBar'
import Balances from '@/sections/app/Balances'
import TransactionHistory from '@/sections/app/TransactionHistory'
import { Suspense } from 'react'
import React from 'react'
import SuspenseFallback from '@/components/SuspenseFallback'
import { revalidatePath } from 'next/cache'
import { validatePublicKey } from '@/utils'

const Chart = React.lazy(() => import('@/sections/app/Chart'))

type Props = {
    params: {
        wallet: string
    }
}

export default function App({ params }: Props) {
    const walletAddress = params.wallet
    const rpc = process.env.RPC as string

    // Disable caching
    const path = `/address/${walletAddress}`
    revalidatePath(path)

    const isValidPublicKey = validatePublicKey(walletAddress)

    return (
        <div className="h-screen flex flex-col">
            <NavBar rpc={rpc} hasSearch={true} />
            {isValidPublicKey ? (
                <div className="flex flex-col h-full overflow-y-auto no-scrollbar">
                    <AddressBar walletAddress={walletAddress} />
                    <div className="flex flex-col lg:flex-row flex-grow lg:overflow-hidden">
                        <div className="h-full p-6 gap-6 lg:overflow-y-scroll no-scrollbar w-full lg:w-1/2 flex flex-col">
                            <Suspense
                                fallback={
                                    <SuspenseFallback className="lg:h-1/2 h-96 lg:min-h-96 " />
                                }
                            >
                                <Chart walletAddress={walletAddress} />
                            </Suspense>
                            <Balances walletAddress={walletAddress} />
                        </div>
                        {/* <TransactionHistory walletAddress={walletAddress} /> */}
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
    )
}
