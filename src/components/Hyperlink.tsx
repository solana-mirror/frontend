import { cn } from '@/utils'
import { ReactNode } from 'react'

type HyperlinkPros = {
    children: ReactNode
    href: string
    className?: string
}

export const Hyperlink = ({ children, href, className }: HyperlinkPros) => {
    const classes = {
        common: 'text-accent underline hover:opacity-70',
    }
    return (
        <a
            className={cn(classes.common, className)}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    )
}
