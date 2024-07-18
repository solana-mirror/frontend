import { PublicKey } from '@solana/web3.js'

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
