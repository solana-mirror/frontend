'use client'

import { handleSearchAccInputChange } from '@/utils/app/handleSearchAccInputChange'
import { PublicKey } from '@solana/web3.js'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Input from './Input'
import { cn } from '@/utils/style/cn'
import { formatAddress } from '@/utils/app/formatAddress'

type SearchInputProps = {
    position: 'navbar' | 'landing'
}

export const SearchInput = ({ position }: SearchInputProps) => {
    const [invalidAddress, setInvalidAddress] = useState<boolean>()
    const [address, setAddress] = useState<PublicKey | string>()

    const router = useRouter()
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.metaKey && e.key === 'k') {
                e.preventDefault()
                inputRef.current?.focus()
            }
        }

        document.addEventListener('keydown', (e) => handleKeyDown(e))
        return () => {
            document.removeEventListener('keydown', (e) => handleKeyDown(e))
        }
    }, [])

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                router.push(`/address/${address}`)
            }}
            className={cn(
                'relative',
                position === 'navbar'
                    ? 'hidden sm:block'
                    : position === 'landing' && 'w-full'
            )}
        >
            <Input
                inputRef={inputRef}
                placeholder="Search Account"
                shortcut="Cmd+K"
                size={cn(position === 'navbar' && 'max-h-[40px]')}
                onChange={(address) => {
                    setAddress(handleSearchAccInputChange(address).address)
                    setInvalidAddress(
                        handleSearchAccInputChange(address).inValidAddress
                    )
                }}
            />
            <div className="mt-2 w-full absolute">
                {address && (
                    <div className="flex gap-2 py-4 px-6 bg-input rounded-md font-bold text-sm">
                        {invalidAddress ? (
                            <p>Not found</p>
                        ) : (
                            <button
                                type="submit"
                                className="flex gap-2 items-center"
                                onClick={() =>
                                    router.push(`/address/${address}`)
                                }
                            >
                                <div className="h-4 w-4 border"></div>
                                <p>
                                    {formatAddress(
                                        address.toString(),
                                        position
                                    )}
                                </p>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </form>
    )
}
