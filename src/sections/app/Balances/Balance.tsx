import { ParsedAta } from 'solana-mirror'
import Hyperlink from '@/components/UI/Hyperlink'
import Image from 'next/image'

type Props = {
    ata: ParsedAta<string, string>
    balancesHidden: boolean
}

export default function Balance({ ata, balancesHidden }: Props) {
    const priceFormatter = new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD',
    })

    const amountFormatter = new Intl.NumberFormat('en', {
        minimumFractionDigits: 2,
    })

    return (
        <div className="flex items-center justify-between">
            <div className="flex gap-2">
                <Image
                    src={ata.image}
                    alt={ata.symbol}
                    width={24}
                    height={24}
                    className="rounded-full h-6 w-6"
                />
                <Hyperlink href={`https://solana.fm/address/${ata.mint}`}>
                    {ata.name}
                </Hyperlink>
            </div>
            <div className="text-right">
                <p>
                    {balancesHidden
                        ? '*****'
                        : amountFormatter.format(ata.balance.formatted)}
                </p>
                <p className="opacity-50">
                    {balancesHidden
                        ? '***'
                        : ata.price
                          ? priceFormatter.format(
                                ata.balance.formatted * ata.price
                            )
                          : '-'}
                </p>
            </div>
        </div>
    )
}
