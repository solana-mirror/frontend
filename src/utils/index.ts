import { PublicKey } from '@solana/web3.js'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

type HandleSearchAccInputChange = {
    address: PublicKey | string
    inValidAddress: boolean
}

export function handleSearchAccInputChange(
    walletAddress: string
): HandleSearchAccInputChange {
    try {
        return {
            address: new PublicKey(walletAddress),
            inValidAddress: false,
        }
    } catch {
        console.error('Error: Invalid public key input')
        return {
            address: walletAddress,
            inValidAddress: true,
        }
    }
}

export const copy = (address: string) => {
    navigator.clipboard.writeText(address)
}

export function formatAddress(address: string, chars: number) {
    return `${address.slice(0, chars)}...${address.slice(-chars)}`
}
