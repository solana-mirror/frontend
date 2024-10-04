import Image from 'next/image'

export default function Splashscreen() {
    return (
        <div className="bg-background z-20 absolute top-0 left-0 w-screen h-screen items-center justify-center flex">
            <Image
                src="/splashscreen.png"
                width={512}
                height={256}
                className="hidden md:block animate-pulse"
                alt="solana mirror"
            />
            <Image
                src="/splashscreen_mobile.png"
                width={128}
                height={128}
                className="block md:hidden animate-pulse"
                alt="solana mirror"
            />
        </div>
    )
}
