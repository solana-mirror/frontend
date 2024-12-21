import BalancesContainer from './BalancesContainer'
import BalanceRow from './BalanceRow'
import Image from 'next/image'
import { amountFormatter, priceFormatter } from '@/utils'
import { ParsedPosition } from 'solana-mirror'

type Props = {
    totalValue: number
    positions: ParsedPosition<string>[]
}

export default function RaydiumPositions({ totalValue, positions }: Props) {
    const headerContent = (
        <>
            <div className="flex items-center gap-3">
                <Image
                    src={positions[0].protocol.image || '/defaultCoin.png'}
                    alt={positions[0].protocol.symbol}
                    width={24}
                    height={24}
                />
                <p className="text-xl">Raydium CLMM</p>
            </div>

            <div className="flex gap-4 items-center">
                {typeof totalValue === 'number' && (
                    <p className="text-accent text-xl">
                        {priceFormatter.format(totalValue)}
                    </p>
                )}
            </div>
        </>
    )

    return (
        <BalancesContainer header={headerContent}>
            {positions.map((x, i) => (
                <BalanceRow
                    key={i}
                    tokenBalance={`${amountFormatter.format(x.tokenB.amount.amount.formatted)} ${x.tokenB.symbol} / ${amountFormatter.format(x.tokenA.amount.amount.formatted)} ${x.tokenA.symbol}`}
                    value={
                        x.tokenA.amount.price || x.tokenB.amount.price
                            ? priceFormatter.format(x.totalValueUsd || 0)
                            : '-'
                    }
                    tokenIcons={
                        <div className="flex">
                            <Image
                                src={x.tokenB.image || '/defaultCoin.png'}
                                alt={x.tokenB.symbol}
                                width={24}
                                height={24}
                                className="rounded-full h-6 w-6"
                            />
                            <Image
                                src={x.tokenA.image || '/defaultCoin.png'}
                                alt={x.tokenA.symbol}
                                width={24}
                                height={24}
                                className="rounded-full h-6 w-6 ml-[-8px]"
                            />
                        </div>
                    }
                    tokenLabel={`${x.tokenB.symbol}/${x.tokenA.symbol}`}
                    url={`https://raydium.io/clmm/create-position/?pool_id=${x.protocol.poolId}`}
                />
            ))}
        </BalancesContainer>
    )
}
