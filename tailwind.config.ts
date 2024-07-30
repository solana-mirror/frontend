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
                background: '#1F2427', // app background
                foreground: '#FFFFFF', // white text color
                accent: '#87B7E2', // lightblue
                dark_accent: '#3B6C90',
                primary: '#222B32', // contrast with background
                secondary: '#25323B', // secondary contrast
                red: '#A43E3E',
            },
        },
    },
    plugins: [],
}
export default config
