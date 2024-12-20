import { ParsedPosition } from '@/mockData'
import BalancesContainer from './BalancesContainer'

type Props = {
    positions: ParsedPosition[]
}

export default function RaydiumPositions({ positions }: Props) {
    return (
        <BalancesContainer title="Raydium CLMM">
            {positions.map((x, i) => (
                <div
                    key={i}
                    className="flex items-center justify-between gap-4 border-b border-white/10 pb-2 mb-2 last:border-none last:mb-0"
                >
                    {x.totalValueUsd}
                </div>
            ))}
        </BalancesContainer>
    )
}
