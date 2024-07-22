import { cn } from '@/utils'
import { RefObject } from 'react'

type InputPros = {
    inputRef: RefObject<HTMLInputElement>
    placeholder: string
    shortcut: string
    size: string
    onChange: (e: string) => void
}

const Input = ({
    inputRef,
    placeholder,
    shortcut,
    size,
    onChange,
}: InputPros) => {
    return (
        <div
            className={cn(
                'flex gap-2 py-4 px-6 items-center bg-input rounded-md font-bold text-sm ',
                size
            )}
        >
            <input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                className="bg-inherit w-full outline-none"
                onChange={(e) => onChange(e.target.value)}
            />
            <p
                className={cn(
                    'text-placeholder text-right',
                    inputRef.current?.value && 'invisible'
                )}
            >
                {shortcut}
            </p>
        </div>
    )
}

export default Input
