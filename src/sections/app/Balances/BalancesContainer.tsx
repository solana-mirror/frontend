import { ReactNode } from 'react'

type Props = {
    header: ReactNode
    children: ReactNode
}

export default function BalancesContainer({ header, children }: Props) {
    return (
        <div className="flex flex-col gap-4 p-4 bg-primary rounded-md">
            <div className="flex justify-between items-center">{header}</div>
            {children}
        </div>
    )
}
