export interface Cart {
    id: number,
    codart: string
    qty: number
    imageUrl?: string,
    userId?: string
}

export interface CartRemote {
    id: number,
    codart: string
    qty: number
    imageUrl?: string
    userId?: string
}