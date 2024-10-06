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

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const address = inputRef.current?.value

        if (!address) {
            return
        }

        if (validatePublicKey(address)) {
            const walletBuffer = new RingBuffer<string>(3, storedWallets)

            walletBuffer.unshift(address)

            const updatedWallets = walletBuffer.getItems()

            setStoredWallets(updatedWallets)

            localStorage.setItem('wallets', JSON.stringify(updatedWallets))
        }

        pushToAddress(address)
    }

    function pushToAddress(address: string) {
        startTransition(() => {
            router.push(`/address/${address}`)
        })
    }

    function handleDropdownMouseDown(e: React.MouseEvent) {
        // Prevent blur event when interacting with the dropdown
        e.preventDefault()
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
                <div
                    className="w-full flex flex-col absolute bg-primary rounded-md "
                    style={{ top: '100%' }}
                >
                    {storedWallets.map((i, x) => (
                        <button
                            key={i}
                            type="button"
                            onMouseDown={handleDropdownMouseDown}
                            onClick={() => pushToAddress(storedWallets[x])}
                            className="w-full text-left px-6 py-4 font-bold hover:opacity-70 transition duration-300"
                        >
                            {storedWallets[x]}
                        </button>
                    ))}
                </div>
            ) : (
                ''
            )}
        </form>
    )
}
