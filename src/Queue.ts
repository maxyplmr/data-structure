interface IQueue<T> {
    enqueue(i: T): void

    dequeue(): T | undefined
}

class Queue<T> implements IQueue<T> {
    private list: Array<T> = []

    constructor(list: Array<T>) {
        this.list = list
    }

    enqueue(i: T): void {
        this.list = [...this.list, i]
    }

    dequeue(): T | undefined {
        const [i, ...rest] = this.list
        this.list = rest
        return i
    }
}