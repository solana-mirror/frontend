'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState, useTransition } from 'react'
import { Input } from './UI/Input'
import { cn, RingBuffer, validatePublicKey } from '@/utils'
import useShortcut, { useMetaKey } from '@/hooks/useShortcut'
import Splashscreen from './Splashscreen'

type Props = {
    size: 'md' | 'lg'
}

export const SearchInput = ({ size }: Props) => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const inputRef = useRef<HTMLInputElement>(null)
    const [storedWallets, setStoredWallets] = useState<string[]>([])
    const [isFocus, setIsFocus] = useState(false)

    const metaKey = useMetaKey()
    useShortcut(() => {
        inputRef.current?.focus()
    }, ['M', 'k'])

    useEffect(() => {
        const wallets = JSON.parse(localStorage.getItem('wallets') || '[]')
        setStoredWallets(wallets)
    }, [])

    function handleWalletSelected(address: string | undefined) {
        if (!address) {
            return
        }

        // Only store if it's a valid public key
        if (validatePublicKey(address)) {
            const walletBuffer = new RingBuffer<string>(storedWallets, 3)
            walletBuffer.add(address)
            const updatedWallets = walletBuffer.items
            setStoredWallets(updatedWallets)
            localStorage.setItem('wallets', JSON.stringify(updatedWallets))
        }

        // Always push to the address route
        startTransition(() => {
            router.push(`/address/${address}`)
        })
    }

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        handleWalletSelected(inputRef.current?.value)
    }

    if (isPending) {
        return <Splashscreen />
    }

    return (
        <form
            onSubmit={onSubmit}
            className={cn(
                'relative',
                size === 'md' ? 'hidden md:block' : 'w-full'
            )}
        >
            <div className="relative w-full mb-2">
                <Input
                    inputRef={inputRef}
                    placeholder="Search Account"
                    shortcut={`${metaKey}+K`}
                    size={size === 'md' && 'sm'}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                />
            </div>
            {isFocus && storedWallets.length ? (
                <div className="w-full flex flex-col absolute bg-primary rounded-md top-full">
                    {storedWallets.map((x, i) => (
                        <button
                            key={i}
                            type="button"
                            onMouseDown={(e: React.MouseEvent) =>
                                e.preventDefault()
                            }
                            onClick={() => handleWalletSelected(x)}
                            className="w-full text-left px-6 py-4 font-bold hover:opacity-70 transition duration-300"
                        >
                            {x}
                        </button>
                    ))}
                </div>
            ) : (
                ''
            )}
        </form>
    )
}
