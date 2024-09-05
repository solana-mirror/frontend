import { getTokenAccounts, ParsedAta } from 'solana-mirror'
import { PublicKey } from '@solana/web3.js'
import BN from 'bn.js'
import BalancesToggles from './BalancesToggles'

type Props = {
    walletAddress: string
}

export default async function Balances({ walletAddress }: Props) {
    let atas: ParsedAta<BN>[] = []
    let netWorth: number = 0

    try {
        let rawAtas = await getTokenAccounts(new PublicKey(walletAddress))
        atas = rawAtas
            .filter((x) => x.balance.formatted !== 0)
            .sort(
                (a, b) =>
                    b.balance.formatted * b.price -
                    a.balance.formatted * a.price
            )

        let balance = 0
        for (let i = 0; i < atas.length; i++) {
            balance += atas[i].price * atas[i].balance.formatted
        }
        netWorth = balance
    } catch (e) {
        console.log('Error fetching balances:', e)
    }

    return (
        <div className="flex-grow text-center p-4 font-bold md:h-1/2">
            <BalancesToggles netWorth={netWorth} atas={atas} />
        </div>
    )
}
