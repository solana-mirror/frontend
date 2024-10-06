export class RingBuffer<T> {
    private buffer: T[] = []
    private maxLength: number

    constructor(maxLength: number, items: T[]) {
        this.maxLength = maxLength
        this.buffer = items.slice(0, maxLength)
    }

    unshift(item: T) {
        const indexOfDuplicated = this.buffer.findIndex(
            (_, x) => this.buffer[x] === item
        )

        if (indexOfDuplicated > -1) {
            this.buffer.splice(indexOfDuplicated, 1)
        }

        this.buffer.unshift(item)

        if (this.buffer.length > this.maxLength) {
            this.buffer.pop()
        }
    }

    getItems(): T[] {
        return this.buffer
    }

    length(): number {
        return this.buffer.length
    }
}
