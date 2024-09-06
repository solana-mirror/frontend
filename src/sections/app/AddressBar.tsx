'use client'

import { copy } from '@/utils'
import Image from 'next/image'
import { useState } from 'react'

type Props = {
    walletAddress: string | string[]
}

export default function AddressBar({ walletAddress }: Props) {
    const [copied, setCopied] = useState(false)
    return (
        <div className="flex flex-col w-full gap-1 font-bold text-lg py-2 px-4 sm:px-9">
            <p>Address:</p>
            <div className="flex flex-col items-start sm:flex-row sm:items-center w-full gap-2">
                <p className="text-foreground/50 text-xs sm:text-base">
                    {walletAddress.toString()}
                </p>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            copy(walletAddress.toString())
                            setCopied(true)
                            setTimeout(() => setCopied(false), 1500)
                        }}
                    >
                        {copied ? (
                            <Image
                                className="opacity-50"
                                src={'/Copied.svg'}
                                width={24}
                                height={24}
                                alt="copied"
                            />
                        ) : (
                            <Image
                                className="opacity-50 hover:opacity-70"
                                src={'/Copy.svg'}
                                width={24}
                                height={24}
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
        </div>
    )
}
