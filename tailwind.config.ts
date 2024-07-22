import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: '#1A1C1D',
                foreground: '#EDEDED',
                blue: '#87B7E2',
                placeholder: '#585858',
                input: '#222B32',
                type_bg: '#25323B',
            },
        },
    },
    plugins: [],
}
export default config
