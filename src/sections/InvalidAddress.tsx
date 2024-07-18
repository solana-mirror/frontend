type InvalidAddressProps = {
    walletAddress: string | string[]
}

export default function InvalidAddress({ walletAddress }: InvalidAddressProps) {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="font-bold text-2xl">
                Unable to find account {walletAddress}!
            </div>
        </div>
    )
}
