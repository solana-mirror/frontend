import { AddressValidation } from '@/types'
import { PublicKey } from '@solana/web3.js'

export function handleSearchAccInputChange(
    walletAddress: string
): AddressValidation {
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
