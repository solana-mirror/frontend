import { ParsedAta } from 'solana-mirror'

export async function fetchImages(atas: ParsedAta[]): Promise<ParsedAta[]> {
    const updatedAtas = [...atas]

    const fetchPromises = updatedAtas.map(async (ata) => {
        if (ata.image) {
            try {
                // handle RCL case getting Error: self-signed certificate in certificate chain
                if (
                    ata.mint.toString() ===
                    'Ckk9iLjEtwhAjA8RVTgNoH5fH4LJvsH4NAvimu4DpBWX' // RCL mint
                ) {
                    ata.image =
                        'https://ipfs.io/ipfs/Qme9ErqmQaznzpfDACncEW48NyXJPFP7HgzfoNdto9xQ9P/02.jpg'
                } else {
                    const response = await fetch(`/api/images`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ url: ata.image }),
                    })

                    const resText = await response.text()
                    let data = JSON.parse(resText)
                    ata.image = data.image
                }
            } catch (error) {
                console.error('Error fetching image:', error, ata.image)
                ata.image = generateIcon(ata.mint.toString())
            }
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
