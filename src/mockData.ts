export const raydiumPositions: ParsedPosition[] = [
    {
        totalValueUsd: 0.841455,
        protocol: {
            name: 'Raydium Concentrated Liquidity',
            symbol: 'RCL',
            image: 'https://ipfs.io/ipfs/Qme9ErqmQaznzpfDACncEW48NyXJPFP7HgzfoNdto9xQ9P/02.jpg',
            programId: 'CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK',
        },
        tokenA: {
            mint: 'So11111111111111111111111111111111111111112',
            name: 'Wrapped SOL',
            symbol: 'SOL',
            image: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=032',
            amount: {
                amount: {
                    amount: '0',
                    formatted: 0,
                },
                price: 192.209844,
            },
        },
        tokenB: {
            mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
            name: 'USD Coin',
            symbol: 'USDC',
            image: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=032',
            amount: {
                amount: {
                    amount: '841455',
                    formatted: 0.841455,
                },
                price: 1,
            },
        },
        feeTier: '',
    },
]

export type ParsedPosition = {
    totalValueUsd: number
    protocol: {
        name: string
        symbol: string
        image: string
        programId: string
    }
    tokenA: {
        mint: string
        name: string
        symbol: string
        image: string
        amount: {
            amount: {
                amount: string
                formatted: number
            }
            price: number
        }
    }
    tokenB: {
        mint: string
        name: string
        symbol: string
        image: string
        amount: {
            amount: {
                amount: string
                formatted: number
            }
            price: number
        }
    }
    feeTier: string
}
