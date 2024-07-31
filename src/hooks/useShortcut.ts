import { useEffect, useCallback } from 'react'

export function useShortcut(callback: () => void, shortcut: string[]) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const isPressed = shortcut.map((key) => {
                if (key === 'cmd') {
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
