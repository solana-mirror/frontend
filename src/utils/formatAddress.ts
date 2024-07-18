export const formatAddress = (address: string, position: string) => {
    if (position === 'navbar') {
        return `${address.slice(0, 10)}...${address.slice(-10)}`
    } else return address
}
