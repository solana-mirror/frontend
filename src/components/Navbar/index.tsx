'use client'

import { SearchInput } from '../SearchInput'
import { Button } from '../Button'
import Link from 'next/link'
import { cn } from '@/utils'

type NavBarProps = {
    isAddress: boolean
}

export const NavBar = ({ isAddress }: NavBarProps) => {
    const handleConnectWallet = () => {
        console.log('Connected wallet!')
    }
    return (
        <div
            className={cn(
                'w-full flex items-center justify-between py-4 md:py-6 px-4 sm:px-9 border-b border-accent',
                !isAddress && 'fixed'
            )}
        >
            <div className="font-bold text-accent text-base md:text-xl">
                <Link href={'/'}>SolanaMirror</Link>
            </div>
            {isAddress && <SearchInput position={'navbar'} />}

            <Button
                onClick={() => handleConnectWallet()}
                size={'md'}
                color={'accent'}
            >
                Connect Wallet
            </Button>
        </div>
    )
}
