import SolanaMirror, { ParsedAta } from 'solana-mirror'
import AddressBar from './AddressBar'
import Balances from './Balances'
import Chart from './Chart'
import TransactionHistory from './TransactionHistory'
import { fetchImages } from '@/services/fetchImage'
import { useState, useEffect } from 'react'

type ValidAddressProps = {
    client: SolanaMirror
    walletAddress: string | string[]
}

export default function ValidAddress({
    client,
    walletAddress,
}: ValidAddressProps) {
    const [atas, setAtas] = useState<ParsedAta[]>([])

    useEffect(() => {
        async function getData() {
            const _atas = await client.getTokenAccounts()
            console.log(_atas)
            const _atasWithImages = await fetchImages(_atas)
            setAtas(_atasWithImages)
        }

        getData()
    }, [client])

    return (
        <div className="h-full flex flex-col">
            <AddressBar walletAddress={walletAddress} />
            <div className="flex flex-grow flex-col md:flex-row">
                <div className="w-full md:w-1/2 flex flex-col">
                    <Chart />
                    <Balances
                        client={client}
                        atas={atas
                            .filter((x) => x.balance.formatted !== 0)
                            .sort(
                                (a, b) =>
                                    b.balance.formatted * b.price -
                                    a.balance.formatted * a.price
                            )} // pass only tokens with balance !== 0 and sorted from highest to lowest balance
                    />
                </div>
                <TransactionHistory client={client} atas={atas} />
            </div>
        </div>
    )
}
