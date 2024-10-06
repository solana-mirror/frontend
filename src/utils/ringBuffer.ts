export class RingBuffer<T> {
    public items: T[] = []
    private maxLength: number

    constructor(items: T[], maxLength: number) {
        this.maxLength = maxLength
        this.items = items.slice(0, maxLength)
    }

    add(item: T) {
        const indexOfDuplicated = this.items.findIndex(
            (_, x) => this.items[x] === item
        )

        if (indexOfDuplicated > -1) {
            this.items.splice(indexOfDuplicated, 1)
        }

        this.items.unshift(item)

        if (this.items.length > this.maxLength) {
            this.items.pop()
        }
    }

    length(): number {
        return this.items.length
    }
}
