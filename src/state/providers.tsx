'use client'

import { Provider } from 'react-redux'
import { store } from './store'
import { Wallet } from '@/app/walletProvider'

interface Props {
    children: React.ReactNode
}

export function Providers({ children }: Props) {
    return (
        <Provider store={store}>
            <Wallet>{children}</Wallet>
        </Provider>
    )
}
