import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Providers } from '@/state/providers'

const SpaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Solana Mirror',
    description: 'The view of the best Solana wallet checker',
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
