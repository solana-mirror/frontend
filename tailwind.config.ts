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
                blue: '#7BA0C3',
                placeholder: '#585858',
                input: '#24292E',
                type_bg: '#272B2F',
            },
        },
    },
    plugins: [],
}
export default config
