import { ReactNode } from 'react'

type Props = {
    title: string
    children: ReactNode
    rightContent?: ReactNode
}

export default function BalancesContainer({
    title,
    children,
    rightContent,
}: Props) {
    return (
        <div className="flex flex-col gap-4 p-4 bg-primary rounded-md">
            <div className="flex justify-between items-center">
                <p className="text-xl">{title}</p>
                {rightContent && (
                    <div className="flex items-center gap-2">
                        {rightContent}
                    </div>
                )}
            </div>
            {children}
        </div>
    )
}
