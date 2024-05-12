import {PizzaType} from "../Redux/Slices/cartSlice";

export const getCartInitialState = () => {
    const itemsJS = window.localStorage.getItem('cart')
    const items: Array<PizzaType> = itemsJS ? JSON.parse(itemsJS) : []
    let price: number = 0
    let count: number = 0
    if (items.length){
        price = items.reduce((acc, p) => acc + p.price * p.count, 0)
        count = items.reduce((acc, c) => acc + c.count, 0)
    }
    return {items: items, price: price, count: count}
}