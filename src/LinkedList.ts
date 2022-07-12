interface ILinkedList<Type> {
    addToBegin(data: Type): LLNode<Type>

    addToEnd(data: Type): LLNode<Type>

    find(callback: Function): LLNode<Type> | null

    delete(callback: Function): void | Error

    getArray(): Array<Type>
}

class LinkedList<Type> implements ILinkedList<Type> {
    public head: LLNode<Type> | null = null

    addToBegin(data: Type): LLNode<Type> {
        const node = new LLNode(data)
        if (this.head) {
            this.head.prev = node
            node.next = this.head
            this.head = node
        } else {
            this.head = node
        }
        return node
    }

    addToEnd(data: Type): LLNode<Type> {
        const node = new LLNode(data)
        if (this.head) {
            const lastNode = getLastNode(this.head)
            node.prev = lastNode
            lastNode.next = node
        } else {
            this.head = node
        }
        return node

        function getLastNode(node: LLNode<Type>): LLNode<Type> {
            return node.next ? getLastNode(node.next) : node
        }
    }

    find(callback: Function): LLNode<Type> | null {
        return this.head ? getNode(this.head) : null

        function getNode(node: LLNode<Type>): LLNode<Type> | null {
            return callback(node.data) ? node :
                node?.next ? getNode(node.next) : null
        }
    }

    delete(callback: Function): void {
        const node = this.find(callback)
        if (!node || !this.head) throw new Error('Node or head is missing')
        if (!node.prev && !node.next) {
            this.head = null
            return
        }
        let temp: LLNode<Type> | null = this.head
        while (temp) {
            if (`${temp.next?.data}` === `${node.data}`) temp.next = node.next
            if (`${temp.prev?.data}` === `${node.data}`) temp.prev = node.prev
            temp = temp.next;
        }
        if (!node.prev) this.head = node.next
    }

    getArray(): Array<Type> {
        return pushNode(this.head, [])

        function pushNode(node: LLNode<Type> | null, arr: Array<Type>): Array<Type> {
            if (!node?.data) return arr

            arr.push(node.data)
            return pushNode(node.next, arr)
        }
    }
}

class LLNode<Type> {
    public prev: LLNode<Type> | null = null
    public next: LLNode<Type> | null = null

    constructor(public data: Type) {
        this.data = data
    }
}