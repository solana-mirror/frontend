import { cn } from '@/utils'
import { ReactNode } from 'react'

type ButtonProps = {
    children: ReactNode
    onClick: () => void
    size: 'icon' | 'none' | 'md'
    color: 'accent' | 'dark_accent' | 'primary' | 'red'
}

export const Button = ({ children, onClick, size, color }: ButtonProps) => {
    const classes = {
        common: 'rounded-md font-bold text-xs sm:text-sm md:text-lg hover:opacity-70 transition duration-300',
        sizes: {
            icon: 'p-[7px] sm:p-[9px] md:p-[13px]',
            none: 'px-0 py-0',
            md: 'px-4 py-2',
        },
        colors: {
            accent: 'bg-accent',
            dark_accent: 'bg-dark_accent',
            primary: 'bg-primary',
            red: 'bg-red',
        },
    }

    return (
        <button
            onClick={onClick}
            className={cn(
                classes.common,
                classes.sizes[size],
                classes.colors[color]
            )}
        >
            {children}
        </button>
    )
}
