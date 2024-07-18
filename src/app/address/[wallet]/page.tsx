'use client'

import { useParams } from 'next/navigation'
import { NavBar } from '@/components/navbar/NavBar'
import { PublicKey } from '@solana/web3.js'
import SolanaMirror from 'solana-mirror'
import ValidAddress from '@/sections/ValidAddress'

export default function Transactions() {
    const params = useParams()
    const walletAddress = params.wallet

    let watch
    let client
    const rpc = process.env.NEXT_PUBLIC_RPC_ENDPOINT as string

    if (new PublicKey(walletAddress.toString())) {
        watch = new PublicKey(walletAddress.toString())
        client = new SolanaMirror({ watch, rpc })
    } else {
        console.error('Invalid public key input')
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <NavBar isAddress={true} />
            <div className="flex flex-col items-center justify-center w-full h-full">
                {client ? (
                    <ValidAddress
                        client={client}
                        walletAddress={walletAddress}
                    />
                ) : (
                    <p className="text-center font-bold text-2xl">
                        Unable to find account {walletAddress}
                    </p>
                )}
            </div>
        </div>
    )
}
