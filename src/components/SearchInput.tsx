'use client'

import { useRouter } from 'next/navigation'
import { useRef, useTransition } from 'react'
import { Input } from './UI/Input'
import { cn } from '@/utils'
import useShortcut, { useMetaKey } from '@/hooks/useShortcut'
import Splashscreen from './Splashscreen'

type Props = {
    size: 'md' | 'lg'
}

export const SearchInput = ({ size }: Props) => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const inputRef = useRef<HTMLInputElement>(null)

    const metaKey = useMetaKey()
    useShortcut(() => {
        inputRef.current?.focus()
    }, ['M', 'k'])

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const address = inputRef.current?.value
        if (!address) {
            return
        }

        startTransition(() => {
            router.push(`/address/${address}`)
        })
    }

    if (isPending) {
        return <Splashscreen />
    }

    return (
        <form
            onSubmit={onSubmit}
            className={cn(size === 'md' ? 'hidden md:block' : 'w-full')}
        >
            <Input
                inputRef={inputRef}
                placeholder="Search Account"
                shortcut={`${metaKey}+K`}
                size={size === 'md' && 'sm'}
            />
        </form>
    )
}
