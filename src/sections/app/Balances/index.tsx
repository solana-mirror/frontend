import { getTokenAccounts, ParsedAta } from 'solana-mirror'
import { PublicKey } from '@solana/web3.js'
import BalancesToggles from './BalancesToggles'

type Props = {
    walletAddress: string
}

export default async function Balances({ walletAddress }: Props) {
    let atas: ParsedAta<string, string>[] = []
    let netWorth: number = 0

    try {
        let rawAtas = (await getTokenAccounts(
            new PublicKey(walletAddress)
        )) as ParsedAta<string, string>[]
        atas = rawAtas
            .filter((x) => x.balance.formatted !== 0)
            .sort(
                (a, b) =>
                    b.balance.formatted * b.price -
                    a.balance.formatted * a.price
            )

        //TODO: default image
        for (let i = 0; i < atas.length; i++) {
            netWorth += atas[i].price * atas[i].balance.formatted
        }
    } catch (e) {
        console.error('Error fetching balances:', e)
    }

    return (
        <div className="flex-grow text-center font-bold md:h-1/2">
            <BalancesToggles netWorth={netWorth} atas={atas} />
        </div>
    )
}
