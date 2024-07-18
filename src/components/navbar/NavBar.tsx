'use client'

import { handleSearchAccInputChange } from '@/utils/handleSearchAccInputChange'
import { PublicKey } from '@solana/web3.js'
import { useState } from 'react'
import Input from '../Input'
import { useRouter } from 'next/navigation'
import { SearchInput } from '../SearchInput'

type NavBarProps = {
    isAddress: boolean
}

export const NavBar = ({ isAddress }: NavBarProps) => {
    const router = useRouter()

    const [invalidAddress, setInvalidAddress] = useState<boolean>()
    const [address, setAddress] = useState<PublicKey | string>()

    return (
        <div className="w-full fixed flex items-center justify-between py-4 md:py-6 px-9">
            <div className="font-bold text-blue text-base md:text-lg">
                SolanaMirror
            </div>
            {isAddress && <SearchInput position={'navbar'} />}

            <button className="truncate px-4 py-2 bg-blue rounded-md font-bold text-xs sm:text-sm md:text-lg">
                Connect wallet
            </button>
        </div>
    )
}
