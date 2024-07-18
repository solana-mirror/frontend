import SolanaMirror from 'solana-mirror'
import AddressBar from './AddressBar'

type ValidAddressProps = {
    client: SolanaMirror
    walletAddress: string | string[]
}

export default function ValidAddress({
    client,
    walletAddress,
}: ValidAddressProps) {
    return (
        <>
            <AddressBar walletAddress={walletAddress} />

            <div className="h-full w-full flex flex-col items-center justify-center">
                Here will be displayed the account data
            </div>
        </>
    )
}
