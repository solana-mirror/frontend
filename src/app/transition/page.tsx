import Hyperlink from '@/components/UI/Hyperlink'

export default function TransitionPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex items-center justify-center flex-1 p-8">
                <div className="flex flex-col items-center w-full max-w-2xl">
                    <h1 className="font-bold text-4xl md:text-5xl text-accent text-center mb-8">
                        SolanaMirror is Evolving
                    </h1>
                    <div className="flex flex-col items-center w-full">
                        <p className="text-center mb-4">
                            We're shifting our focus to provide more flexible
                            data solutions.
                        </p>
                        <div className="flex flex-col items-center w-full bg-primary p-6 rounded-lg gap-4">
                            <h2 className="text-xl font-semibold text-center">
                                What's Coming:
                            </h2>
                            <p className="text-sm text-center">
                                Visit the GitHub repositories to stay up-to-date
                                with progress
                            </p>
                            <div className="flex items-center gap-4">
                                <Hyperlink href="https://github.com/solana-mirror/ts-sdk">
                                    TypeScript SDK
                                </Hyperlink>
                                -
                                <Hyperlink href="https://github.com/solana-mirror/rust-sdk">
                                    Rust Crate
                                </Hyperlink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-auto py-2">
                Follow us on{' '}
                <Hyperlink href="https://x.com/solanamirrorxyz">
                    Twitter
                </Hyperlink>{' '}
                for updates.
            </div>
        </div>
    )
}
