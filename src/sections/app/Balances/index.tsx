import { getTokenAccounts, ParsedAta } from 'solana-mirror'
import { PublicKey } from '@solana/web3.js'
import BN from 'bn.js'
import BalancesToggles from './BalancesToggles'
import { normalizeData } from '@/utils'

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

        //TODO: handle a proper way of adding inaccessible images
        for (const ata of atas) {
            if (ata.symbol === 'BILLY') {
                ata.image = '/Billy.svg'
                break
            }
        }

        for (let i = 0; i < atas.length; i++) {
            netWorth += atas[i].price * atas[i].balance.formatted
        }
    } catch (e) {
        console.log('Error fetching balances:', e)
    }

    return (
        <div className="flex-grow text-center p-4 font-bold md:h-1/2">
            <BalancesToggles netWorth={netWorth} atas={normalizeData(atas)} />
        </div>
    )
}
