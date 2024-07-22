import { NavBar } from '@/components/Navbar'
import { SearchInput } from '@/components/SearchInput'

export default function Home() {
    return (
        <main className="h-screen flex flex-col items-center">
            <NavBar isAddress={false} />
            <div className="flex px-10 flex-col items-center justify-center w-full h-full">
                <div className="flex flex-col items-center gap-9">
                    <div className=" flex flex-col gap-3 max-w-[560px]">
                        <div className="font-bold text-4xl md:text-5xl text-blue text-center">
                            Check your Solana account at a glance
                        </div>
                        <div className="font-bold text-base md:text-lg text-center">
                            Manage your LP positions, your stakes,
                            <span className="inline md:block"> etc.</span>
                        </div>
                    </div>
                    <SearchInput position={'landing'} />
                </div>
            </div>
        </main>
    )
}
