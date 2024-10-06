import { AddressValidation } from '@/types'
import { PublicKey } from '@solana/web3.js'

export function handleSearchAccInputChange(
    walletAddress: string
): AddressValidation {
    try {
        return {
            address: new PublicKey(walletAddress),
            invalidAddress: false,
        }
    } catch {
        return {
            address: walletAddress,
            invalidAddress: true,
        }
    }
}

export function validatePublicKey(address: string) {
    try {
        new PublicKey(address.toString())
        return true
    } catch {
        return false
    }
}
