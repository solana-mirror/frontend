import Hyperlink from '@/components/UI/Hyperlink'

type Props = {
    tokenBalance: string
    value: string
    tokenIcons: JSX.Element
    tokenLabel: string
    publicKey: string
    balancesHidden?: boolean
}

export default function BalanceRow({
    tokenBalance,
    value,
    tokenIcons,
    tokenLabel,
    publicKey,
    balancesHidden,
}: Props) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex gap-2">
                {tokenIcons}
                <Hyperlink href={`https://solana.fm/address/${publicKey}`}>
                    {tokenLabel}
                </Hyperlink>
            </div>
            <div className="text-right">
                <p>{balancesHidden ? '*****' : tokenBalance}</p>
                <p className="opacity-50">{balancesHidden ? '***' : value}</p>
            </div>
        </div>
    )
}
