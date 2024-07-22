import SolanaMirror from 'solana-mirror'

export const getTransactions = async (client: SolanaMirror, limit?: number) => {
    const transactions = await client.getTransactions({
        batchSize: limit || 10,
        limit: limit,
    })
    return transactions
}

export const getAtas = async (client: SolanaMirror) => {
    const atas = await client.getTokenAccounts()
    return atas
}
