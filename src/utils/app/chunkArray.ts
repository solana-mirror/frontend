/**
 *
 * @param array
 * @param chunkSize
 * @returns Returns an array chunked in subsequent arrays of a given size
 */
export function chunkArray(array: any[], chunkSize: number) {
    const chunks = []
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize))
    }
    return chunks
}
