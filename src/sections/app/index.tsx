import SolanaMirror from 'solana-mirror'
import AddressBar from './AddressBar'
import Balances from './Balances'
import Chart from './Chart'
import TransactionHistory from './TransactionHistory'

type ValidAddressProps = {
    client: SolanaMirror
    walletAddress: string | string[]
}

export default function ValidAddress({
    client,
    walletAddress,
}: ValidAddressProps) {
    return (
        <div className="h-full flex flex-col">
            <AddressBar walletAddress={walletAddress} />
            <div className="flex flex-grow flex-col md:flex-row">
                <div className="w-full md:w-1/2 flex flex-col">
                    <Chart />
                    <Balances />
                </div>
                <TransactionHistory client={client} />
            </div>
        </div>
    )
}
