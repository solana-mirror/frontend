'use client'

import { useParams } from 'next/navigation'
import { NavBar } from '@/components/navbar/NavBar'
import { PublicKey } from '@solana/web3.js'
import SolanaMirror from 'solana-mirror'
import InvalidAddress from '@/sections/InvalidAddress'

export default function Transactions() {
    const params = useParams()
    const walletAddress = params.wallet

    let watch
    let client
    const rpc = process.env.NEXT_PUBLIC_RPC_ENDPOINT as string

    try {
        watch = new PublicKey(walletAddress.toString())
        client = new SolanaMirror({ watch, rpc })
    } catch {
        console.error('Invalid public key input')
    }

    return (
        <div className="h-screen flex flex-col items-center">
            <NavBar isAddress={true} />
            {watch ? (
                <div className="flex flex-col items-center justify-center w-full h-full">
                    Address: {walletAddress.toString()}
                </div>
            ) : (
                <InvalidAddress walletAddress={walletAddress} />
            )}
        </div>
    )
}
