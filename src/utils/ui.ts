import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const copy = (address: string) => {
    navigator.clipboard.writeText(address)
}

export function generateIcon(address: string) {
    const canvas = document.createElement('canvas')
    canvas.width = 24
    canvas.height = 24
    const ctx = canvas.getContext('2d')

    if (!ctx) return ''

    ctx.fillStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.font = 'bold 12px Arial'
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    const text = address.substring(0, 4)
    ctx.fillText(text, canvas.width / 2, canvas.height / 2)

    return canvas.toDataURL()
}
