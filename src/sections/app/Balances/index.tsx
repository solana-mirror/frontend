import {
    BalancesResponse,
    getTokenAccounts,
    ParsedAta,
    ParsedPosition,
} from 'solana-mirror'
import { PublicKey } from '@solana/web3.js'
import SpotBalances from './SpotBalances'
import RaydiumPositions from './RaydiumPositions'

type Props = {
    walletAddress: string
}

export default async function Balances({ walletAddress }: Props) {
    let atas: ParsedAta<string, string>[] = []
    let raydiumPositions: ParsedPosition<string>[] | undefined
    let netWorth: number = 0

    try {
        let balances = (await getTokenAccounts(
            new PublicKey(walletAddress)
        )) as BalancesResponse<string, string>
        atas = balances.accounts
            .filter((x) => x.balance.formatted !== 0)
            .sort(
                (a, b) =>
                    b.balance.formatted * b.price -
                    a.balance.formatted * a.price
            )
        raydiumPositions = balances.raydium

        //TODO: default image
        for (let i = 0; i < atas.length; i++) {
            netWorth += atas[i].price * atas[i].balance.formatted
        }
    } catch (e) {
        console.error('Error fetching balances:', e)
    }

    return (
        <div className="flex flex-col gap-2.5 font-bold md:h-1/2">
            <SpotBalances netWorth={netWorth} atas={atas} />
            {raydiumPositions?.length ? (
                <RaydiumPositions
                    totalValue={raydiumPositions.reduce(
                        (prev, x) => prev + Number(x.totalValueUsd || 0),
                        0
                    )}
                    positions={raydiumPositions}
                />
            ) : (
                ''
            )}
        </div>
    )
}
