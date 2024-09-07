import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Providers } from '@/states/providers'

const SpaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Solana Mirror',
    description: 'Check your Solana wallet at a glance',
    openGraph: {
        title: 'Solana Mirror',
        description: 'Check your Solana wallet at a glance',
        images: 'solanamirror.xyz/meta.png',
    },
    twitter: {
        title: 'Solana Mirror',
        description: 'Check your Solana wallet at a glance',
        images: 'solanamirror.xyz/meta.png',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={SpaceGrotesk.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
