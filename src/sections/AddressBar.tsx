'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { copy } from '@/utils/app/copy'
import { useState } from 'react'

type AddressBarProps = {
    walletAddress: string | string[]
}

export default function AddressBar({ walletAddress }: AddressBarProps) {
    const [copied, setCopied] = useState(false)
    const router = useRouter()
    return (
        <div className="flex flex-col items-left w-full gap-1 font-bold text-lg py-2 px-4 sm:px-9 border-b border-blue">
            <p>Address:</p>
            <div className="flex w-full items-center justify-between">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <p className="text-foreground/50 text-xs sm:text-base">
                        {walletAddress.toString()}
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                copy(walletAddress.toString())
                                setCopied(true)
                                setTimeout(() => setCopied(false), 2000)
                            }}
                        >
                            {copied ? (
                                <Image
                                    className="opacity-50"
                                    src={'/Copied.svg'}
                                    width={23}
                                    height={23}
                                    alt="copied"
                                />
                            ) : (
                                <Image
                                    className="opacity-50 hover:opacity-70"
                                    src={'/Copy.svg'}
                                    width={18}
                                    height={18}
                                    alt={'copy icon'}
                                />
                            )}
                        </button>

                        <Image
                            className="opacity-50 hover:opacity-70"
                            src={'/Arrow.svg'}
                            width={18}
                            height={18}
                            alt={'arrow icon'}
                        />
                    </div>
                </div>
                <button
                    onClick={() => router.push('/')}
                    className="border-2 border-foreground/50 rounded-md hover:opacity-70 transition duration-300 mt-auto mb-0.5 sm:m-0"
                >
                    <Image
                        className="opacity-50"
                        src={'/Quit.svg'}
                        width={18}
                        height={18}
                        alt={'quit icon'}
                    />
                </button>
            </div>
        </div>
    )
}
