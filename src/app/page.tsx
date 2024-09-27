import NavBar from '@/components/Navbar'
import { SearchInput } from '@/components/SearchInput'

// Force dynamic for env
export const dynamic = 'force-dynamic'

export default function Home() {
    const rpc = process.env.RPC as string

    return (
        <main className="h-screen flex flex-col items-center">
            <NavBar rpc={rpc} hasSearch={false} />
            <div className="flex px-10 flex-col items-center justify-center w-full h-full">
                <div className="flex flex-col items-center gap-9">
                    <div className="flex flex-col gap-3 max-w-[560px]">
                        <div className="font-bold text-4xl md:text-5xl text-accent text-center">
                            Check your Solana account at a glance
                        </div>
                        <p className="font-bold text-base md:text-lg text-center">
                            Your balances, transactions and history, all in one
                            view
                        </p>
                    </div>
                    <SearchInput size="lg" />
                </div>
            </div>
        </main>
    )
}
