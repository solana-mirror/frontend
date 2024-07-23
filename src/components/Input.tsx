import { cn } from '@/utils'
import { RefObject } from 'react'

type InputPros = {
    inputRef: RefObject<HTMLInputElement>
    placeholder: string
    shortcut: string
    size: 'sm' | false
    onChange: (e: string) => void
}

const Input = ({
    inputRef,
    placeholder,
    shortcut,
    size,
    onChange,
}: InputPros) => {
    const classes = {
        common: 'flex gap-2 py-4 px-6 items-center bg-primary rounded-md font-bold text-sm',
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
                onChange={(e) => onChange(e.target.value)}
            />
            <p
                className={cn(
                    'text-right',
                    inputRef.current?.value && 'invisible'
                )}
            >
                {shortcut}
            </p>
        </div>
    )
}

export default Input
