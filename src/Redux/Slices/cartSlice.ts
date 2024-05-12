import {createSlice, PayloadAction} from '@reduxjs/toolkit'


export type PizzaType = {
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

export type PizzaItemType = {
    id: number,
    imageUrl: string,
    name: string,
    types: Array<number>,
    sizes: Array<number>,
    price: Array<number>,
    category: number,
    rating: number
    ingredients: Array<string>,
    specialStatus: Array<string>,
    info: string
}

type CartStateType = {
    items: Array<PizzaType>,
    price: number,
    count: number
}

const getCartInitialState = () => {
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

const initialState: CartStateType = getCartInitialState()

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<PizzaType>) {
            const findPizza = state.items.find(item => item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type)
            if (findPizza) {
                findPizza.count += 1
            } else {
                console.log(action.payload)
                state.items.push(action.payload)
            }
            state.price += action.payload.price
            state.count += 1
        },

        increment(state, action:PayloadAction<PizzaType>) {
            const findPizza = state.items.find(item => item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type)
            if (findPizza) {
                findPizza.count += 1
            }
            state.price += action.payload.price
            state.count += 1
        },
        decrement(state, action:PayloadAction<PizzaType>) {
            const findPizza = state.items.find(item => item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type)
            if (findPizza) {
                findPizza.count > 1 ? findPizza.count -= 1 : state.items = state.items.filter(item => item.id !== action.payload.id || item.size !== action.payload.size || item.type !== action.payload.type)
            }
            state.price -= action.payload.price
            state.count -= 1
        },
        removeItem(state, action:PayloadAction<PizzaType>) {
            state.items = state.items.filter(item => item.id !== action.payload.id || item.size !== action.payload.size || item.type !== action.payload.type)

            state.price = state.items.reduce((acc, pizza) => pizza.price*pizza.count + acc, 0)
            state.count = state.items.reduce((acc, pizza) => pizza.count + acc, 0)
        },
        clearItem(state) {
            state.items = []
            state.price = 0
            state.count = 0
        },
    }
})

export const {addItem, removeItem, clearItem, increment, decrement} = cartSlice.actions
export default cartSlice