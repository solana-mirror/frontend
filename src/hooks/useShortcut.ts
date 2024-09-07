import { useEffect, useState } from 'react'

export default function useShortcut(callback: () => void, shortcut: string[]) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const isPressed = shortcut.map((key) => {
                if (key === 'M') {
                    return e.metaKey
                }
                return e.key === key
            })
            if (isPressed.every((key) => key)) {
                e.preventDefault()
                callback()
            }
        }

        document.addEventListener('keydown', (e) => handleKeyDown(e))
        return () => {
            document.removeEventListener('keydown', (e) => handleKeyDown(e))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export function useMetaKey() {
    const [metaKey, setMetaKey] = useState<'Cmd' | 'Ctrl'>('Ctrl')

    useEffect(() => {
        if (!window?.navigator?.userAgent.includes('Win')) {
            setMetaKey('Cmd')
        }
    }, [])

    return metaKey
}
