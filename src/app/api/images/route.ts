export async function POST(req: Request) {
    const { url } = await req.json()
    const response = await fetch(url)
    const data = await response.json()

    return new Response(JSON.stringify(data))
}
