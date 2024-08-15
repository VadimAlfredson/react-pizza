export type PizzaCartType = {
    id: number,
    imageUrl: string,
    name: string,
    type: number,
    size: number,
    price: number,
    category: number,
    rating: number,
    count: number
}

export type CartStateType = {
    items: Array<PizzaCartType>,
    price: number,
    count: number
}
