export function formatAddress(address: string, chars: number) {
    return `${address.slice(0, chars)}...${address.slice(-chars)}`
}
