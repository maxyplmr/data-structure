interface IStack<T> {
    push(i: T): void

    pop(): T | undefined

    peek(): T | undefined
}

class Stack<T> implements IStack<T> {
    private list: Array<T> = []

    constructor(list: Array<T>) {
        this.list = list
    }

    push(i: T): void {
        this.list = [i, ...this.list]
    }

    pop(): T | undefined {
        const [i, ...rest] = this.list
        this.list = rest
        return i
    }

    peek(): T | undefined {
        return this.list[this.list.length - 1]
    }
}