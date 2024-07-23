import { cn } from '@/utils'
import { ReactNode } from 'react'

type ButtonProps = {
    children: ReactNode
    onClick: () => void
    size: 'none' | 'md'
    color: 'accent'
}

export const Button = ({ children, onClick, size, color }: ButtonProps) => {
    const classes = {
        common: 'rounded-md font-bold text-xs sm:text-sm md:text-lg hover:opacity-70 transition duration-300',
        sizes: {
            none: '',
            md: 'px-4 py-2',
        },
        colors: {
            accent: 'bg-accent',
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
