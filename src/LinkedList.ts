interface ILinkedList<Type> {
    addToBegin(data: Type): LLNode<Type>

    addToEnd(data: Type): LLNode<Type>

    find(callback: Function): LLNode<Type> | null

    delete(node: LLNode<Type>): void
}

class LinkedList<Type> implements ILinkedList<Type> {
    private head: LLNode<Type> | null = null

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

    delete(node: LLNode<Type>): void {
        throw new Error("Method not implemented.")
    }
}

class LLNode<Type> {
    public prev: LLNode<Type> | null = null
    public next: LLNode<Type> | null = null

    constructor(public data: Type) {
        this.data = data
    }
}