import { cn } from '@/utils'
import React, { RefObject } from 'react'

type Props = {
    inputRef: RefObject<HTMLInputElement>
    placeholder: string
    shortcut: string
    size: 'sm' | false
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({
    inputRef,
    placeholder,
    shortcut,
    size,
    onChange,
}: Props) => {
    const classes = {
        common: 'flex gap-2 py-4 px-6 items-center bg-primary rounded-md font-bold',
        sizes: {
            sm: 'max-h-[40px]',
        },
    }
    return (
        <div className={cn(classes.common, size && classes.sizes[size])}>
            <input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                className="bg-inherit w-full outline-none"
                onChange={onChange}
            />
            <p className="text-white/70">{shortcut}</p>
        </div>
    )
}
