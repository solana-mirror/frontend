import { ParsedAta } from 'solana-mirror'

export async function fetchImages(atas: ParsedAta[]): Promise<ParsedAta[]> {
    const updatedAtas = [...atas]

    const fetchPromises = updatedAtas.map(async (ata) => {
        if (ata.image) {
            const response = await fetch(`/api/images`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: ata.image }),
            })

            const data = await response.json()

            ata.image = data.image
        }
        if (ata.coingeckoId === 'wrapped-solana') {
            ata.image = '/Solana.svg'
        }
        if (!ata.image) {
            ata.image = generateIcon(ata.mint.toString())
        }
    })

    await Promise.all(fetchPromises)

    return updatedAtas
}

function generateIcon(address: string) {
    const canvas = document.createElement('canvas')
    canvas.width = 24
    canvas.height = 24
    const ctx = canvas.getContext('2d')

    if (!ctx) return ''

    ctx.fillStyle = '#b22222'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.font = 'semibold 24px Arial'
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    const text = address.substring(0, 4)
    ctx.fillText(text, canvas.width / 2, canvas.height / 2)

    return canvas.toDataURL()
}
