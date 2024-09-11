import { cn } from '@/utils'

type Props = {
    className?: string
}

export default function SuspenseFallback({ className }: Props) {
    return (
        <div
            className={cn(
                className,
                'w-full h-full rounded-lg bg-primary animate-pulse'
            )}
        />
    )
}
