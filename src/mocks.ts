import { PublicKey } from '@solana/web3.js'
import { FormattedTx } from './utils/formatTableTxs'
import { ChartDataWithPrice } from 'solana-mirror'

export const MOCKED_TX_DATA: FormattedTx[] = [
    {
        date: ['21/07/2024,', '15:36:05'],
        txId: '3r2ssk84oUtSGgpGgnF1VVTGUbeDBWdA3JG7skanV3oYKqm1UeLVuvbEoas4MoEZWoWZTzdhFAcp3YJvNY8ovemM',
        types: ['receive'],
        outgoing: [
            {
                amount: 0.7377684040000001,
                name: 'SOL',
                photo: '',
                mint: new PublicKey(
                    'So11111111111111111111111111111111111111112'
                ),
            },
            {
                amount: 1164.5119169999998,
                name: 'BILLY',
                photo: 'https://cf-ipfs.com/ipfs/QmY3epPEsekJtJe5wQFcCD5YUowSPE2bkPJ1L6XL8aZimx',
                mint: new PublicKey(
                    '3B5wuUrMEi5yATD7on46hKfej3pfmd7t1RKgrsN3pump'
                ),
            },
        ],
        incoming: [
            {
                amount: 1,
                name: 'RCL',
                photo: 'https://cloudflare-ipfs.com/ipfs/QmbzJafuKY3B4t25eq9zdKZMgXiMeW4jHLzf6KE6ZmHWn1/02.json',
                mint: new PublicKey(
                    'Ckk9iLjEtwhAjA8RVTgNoH5fH4LJvsH4NAvimu4DpBWX'
                ),
            },
        ],
    },
    {
        date: ['21/07/2024,', '15:36:05'],
        txId: '3r2ssk84oUtSGgpGgnF1VVTGUbeDBWdA3JG7skanV3oYKqm1UeLVuvbEoas4MoEZWoWZTzdhFAcp3YJvNY8ovemM',
        types: ['send'],
        outgoing: [
            {
                amount: 0.7377684040000001,
                name: 'SOL',
                photo: '',
                mint: new PublicKey(
                    'So11111111111111111111111111111111111111112'
                ),
            },
            {
                amount: 1164.5119169999998,
                name: 'BILLY',
                photo: 'https://cf-ipfs.com/ipfs/QmY3epPEsekJtJe5wQFcCD5YUowSPE2bkPJ1L6XL8aZimx',
                mint: new PublicKey(
                    '3B5wuUrMEi5yATD7on46hKfej3pfmd7t1RKgrsN3pump'
                ),
            },
        ],
        incoming: [
            {
                amount: 1,
                name: 'RCL',
                photo: 'https://cloudflare-ipfs.com/ipfs/QmbzJafuKY3B4t25eq9zdKZMgXiMeW4jHLzf6KE6ZmHWn1/02.json',
                mint: new PublicKey(
                    'Ckk9iLjEtwhAjA8RVTgNoH5fH4LJvsH4NAvimu4DpBWX'
                ),
            },
        ],
    },
    {
        date: ['21/07/2024,', '15:36:05'],
        txId: '3r2ssk84oUtSGgpGgnF1VVTGUbeDBWdA3JG7skanV3oYKqm1UeLVuvbEoas4MoEZWoWZTzdhFAcp3YJvNY8ovemM',
        types: ['swap'],
        outgoing: [
            {
                amount: 0.7377684040000001,
                name: 'SOL',
                photo: '',
                mint: new PublicKey(
                    'So11111111111111111111111111111111111111112'
                ),
            },
            {
                amount: 1164.5119169999998,
                name: 'BILLY',
                photo: 'https://cf-ipfs.com/ipfs/QmY3epPEsekJtJe5wQFcCD5YUowSPE2bkPJ1L6XL8aZimx',
                mint: new PublicKey(
                    '3B5wuUrMEi5yATD7on46hKfej3pfmd7t1RKgrsN3pump'
                ),
            },
        ],
        incoming: [
            {
                amount: 1,
                name: 'RCL',
                photo: 'https://cloudflare-ipfs.com/ipfs/QmbzJafuKY3B4t25eq9zdKZMgXiMeW4jHLzf6KE6ZmHWn1/02.json',
                mint: new PublicKey(
                    'Ckk9iLjEtwhAjA8RVTgNoH5fH4LJvsH4NAvimu4DpBWX'
                ),
            },
        ],
    },
    {
        date: ['21/07/2024,', '15:36:05'],
        txId: '3r2ssk84oUtSGgpGgnF1VVTGUbeDBWdA3JG7skanV3oYKqm1UeLVuvbEoas4MoEZWoWZTzdhFAcp3YJvNY8ovemM',
        types: ['InitializeAccount', 'OpenPositionV2'],
        outgoing: [
            {
                amount: 0.7377684040000001,
                name: 'SOL',
                photo: '',
                mint: new PublicKey(
                    'So11111111111111111111111111111111111111112'
                ),
            },
            {
                amount: 1164.5119169999998,
                name: 'BILLY',
                photo: 'https://cf-ipfs.com/ipfs/QmY3epPEsekJtJe5wQFcCD5YUowSPE2bkPJ1L6XL8aZimx',
                mint: new PublicKey(
                    '3B5wuUrMEi5yATD7on46hKfej3pfmd7t1RKgrsN3pump'
                ),
            },
        ],
        incoming: [
            {
                amount: 1,
                name: 'RCL',
                photo: 'https://cloudflare-ipfs.com/ipfs/QmbzJafuKY3B4t25eq9zdKZMgXiMeW4jHLzf6KE6ZmHWn1/02.json',
                mint: new PublicKey(
                    'Ckk9iLjEtwhAjA8RVTgNoH5fH4LJvsH4NAvimu4DpBWX'
                ),
            },
        ],
    },
    {
        date: ['21/07/2024,', '15:36:05'],
        txId: '3r2ssk84oUtSGgpGgnF1VVTGUbeDBWdA3JG7skanV3oYKqm1UeLVuvbEoas4MoEZWoWZTzdhFAcp3YJvNY8ovemM',
        types: ['InitializeAccount', 'OpenPositionV2'],
        outgoing: [
            {
                amount: 0.7377684040000001,
                name: 'SOL',
                photo: '',
                mint: new PublicKey(
                    'So11111111111111111111111111111111111111112'
                ),
            },
            {
                amount: 1164.5119169999998,
                name: 'BILLY',
                photo: 'https://cf-ipfs.com/ipfs/QmY3epPEsekJtJe5wQFcCD5YUowSPE2bkPJ1L6XL8aZimx',
                mint: new PublicKey(
                    '3B5wuUrMEi5yATD7on46hKfej3pfmd7t1RKgrsN3pump'
                ),
            },
        ],
        incoming: [
            {
                amount: 1,
                name: 'RCL',
                photo: 'https://cloudflare-ipfs.com/ipfs/QmbzJafuKY3B4t25eq9zdKZMgXiMeW4jHLzf6KE6ZmHWn1/02.json',
                mint: new PublicKey(
                    'Ckk9iLjEtwhAjA8RVTgNoH5fH4LJvsH4NAvimu4DpBWX'
                ),
            },
        ],
    },
]

export const MOCKED_CHARTDATA = [
    {
        timestamp: 1720742400,
        balances: {
            So11111111111111111111111111111111111111112: [Object],
            EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: [Object],
        },
        usdValue: 3.220699625937942,
    },
    {
        timestamp: 1720828800,
        balances: {
            So11111111111111111111111111111111111111112: [Object],
            EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: [Object],
        },
        usdValue: 3.252366400467422,
    },
    {
        timestamp: 1720915200,
        balances: {
            So11111111111111111111111111111111111111112: [Object],
            EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: [Object],
        },
        usdValue: 3.2747480777330527,
    },
    {
        timestamp: 1721001600,
        balances: {
            So11111111111111111111111111111111111111112: [Object],
            EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: [Object],
        },
        usdValue: 3.322859749317364,
    },
    {
        timestamp: 1721088000,
        balances: {
            So11111111111111111111111111111111111111112: [Object],
            EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: [Object],
            '3B5wuUrMEi5yATD7on46hKfej3pfmd7t1RKgrsN3pump': [Object],
        },
        usdValue: 3.6018540904681657,
    },
    {
        timestamp: 1721174400,
        balances: {
            So11111111111111111111111111111111111111112: [Object],
            EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: [Object],
            '3B5wuUrMEi5yATD7on46hKfej3pfmd7t1RKgrsN3pump': [Object],
        },
        usdValue: 3.592423892681787,
    },
    {
        timestamp: 1721260800,
        balances: {
            So11111111111111111111111111111111111111112: [Object],
            EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: [Object],
            '3B5wuUrMEi5yATD7on46hKfej3pfmd7t1RKgrsN3pump': [Object],
        },
        usdValue: 3.518174462759361,
    },
    {
        timestamp: 1721347200,
        balances: {
            So11111111111111111111111111111111111111112: [Object],
            EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: [Object],
            '3B5wuUrMEi5yATD7on46hKfej3pfmd7t1RKgrsN3pump': [Object],
        },
        usdValue: 3.569261729501071,
    },
    {
        timestamp: 1721433600,
        balances: {
            So11111111111111111111111111111111111111112: [Object],
            EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: [Object],
            '3B5wuUrMEi5yATD7on46hKfej3pfmd7t1RKgrsN3pump': [Object],
        },
        usdValue: 3.690110321597719,
    },
    {
        timestamp: 1721520000,
        balances: {
            So11111111111111111111111111111111111111112: [Object],
            EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: [Object],
            '3B5wuUrMEi5yATD7on46hKfej3pfmd7t1RKgrsN3pump': [Object],
        },
        usdValue: 3.763055902976795,
    },
    {
        timestamp: 1721606400,
        balances: {
            So11111111111111111111111111111111111111112: [Object],
            EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: [Object],
            '3B5wuUrMEi5yATD7on46hKfej3pfmd7t1RKgrsN3pump': [Object],
        },
        usdValue: 3.870069393393317,
    },
    {
        timestamp: 1721692800,
        balances: {
            So11111111111111111111111111111111111111112: [Object],
            EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: [Object],
            '3B5wuUrMEi5yATD7on46hKfej3pfmd7t1RKgrsN3pump': [Object],
        },
        usdValue: 3.7899677131416922,
    },
    {
        timestamp: 1721779200,
        balances: {
            So11111111111111111111111111111111111111112: [Object],
            EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: [Object],
            '3B5wuUrMEi5yATD7on46hKfej3pfmd7t1RKgrsN3pump': [Object],
        },
        usdValue: 3.730597905759394,
    },
    {
        timestamp: 1721865600,
        balances: {
            So11111111111111111111111111111111111111112: [Object],
            EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: [Object],
            '3B5wuUrMEi5yATD7on46hKfej3pfmd7t1RKgrsN3pump': [Object],
        },
        usdValue: 3.760582300713372,
    },
    {
        timestamp: 1721952000,
        balances: {
            So11111111111111111111111111111111111111112: [Object],
            EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: [Object],
            '3B5wuUrMEi5yATD7on46hKfej3pfmd7t1RKgrsN3pump': [Object],
        },
        usdValue: 3.718065470063977,
    },
    {
        timestamp: 1722013177,
        balances: {
            So11111111111111111111111111111111111111112: [Object],
            EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: [Object],
            '3B5wuUrMEi5yATD7on46hKfej3pfmd7t1RKgrsN3pump': [Object],
        },
        usdValue: 3.742275127569675,
    },
]
