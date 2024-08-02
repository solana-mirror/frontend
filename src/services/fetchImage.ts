import { ParsedAta } from 'solana-mirror'

export async function fetchImages(atas: ParsedAta[]): Promise<ParsedAta[]> {
    const updatedAtas = [...atas]

    const fetchPromises = updatedAtas.map(async (ata) => {
        try {
            switch (ata.symbol) {
                case 'USDC':
                    ata.image =
                        'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=032'
                    break
                case 'RCL':
                    ata.image =
                        'https://ipfs.io/ipfs/Qme9ErqmQaznzpfDACncEW48NyXJPFP7HgzfoNdto9xQ9P/02.jpg'
                    break
                case 'SOL':
                    ata.image = '/Solana.svg'
                    break
                default:
                    if (ata.image) {
                        // handle general SPL tokens
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

                    if (!ata.image) {
                        ata.image = generateIcon(ata.mint.toString())
                    }
                    break
            }
        } catch (error) {
            console.error('Error fetching image:', error, ata.image)
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
