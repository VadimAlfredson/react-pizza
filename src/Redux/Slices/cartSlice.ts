import {createSlice, PayloadAction} from '@reduxjs/toolkit'


export type PayloadPizzaType = {
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
    price: number,
    category: number,
    rating: number
}

type CartStateType = {
    items: Array<PayloadPizzaType>,
    price: number,
    count: number
}


const initialState: CartStateType = {
    items: [],
    price: 0,
    count: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<PayloadPizzaType>) {
            const findPizza = state.items.find(item => item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type)
            if (findPizza) {
                findPizza.count += 1
            } else {
                console.log(action.payload)
                state.items.push(action.payload)
            }
            state.price = state.items.reduce((acc, pizza) => pizza.price*pizza.count + acc, 0)
            state.count = state.items.reduce((acc, pizza) => pizza.count + acc, 0)
        },

        increment(state, action:PayloadAction<PayloadPizzaType>) {
            const findPizza = state.items.find(item => item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type)
            if (findPizza) {
                findPizza.count += 1
            }

            state.price = state.items.reduce((acc, pizza) => pizza.price*pizza.count + acc, 0)
            state.count = state.items.reduce((acc, pizza) => pizza.count + acc, 0)
        },
        decrement(state, action:PayloadAction<PayloadPizzaType>) {
            const findPizza = state.items.find(item => item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type)
            if (findPizza) {
                findPizza.count > 1 ? findPizza.count -= 1 : state.items = state.items.filter(item => item.id !== action.payload.id || item.size !== action.payload.size || item.type !== action.payload.type)
            }

            state.price = state.items.reduce((acc, pizza) => pizza.price*pizza.count + acc, 0)
            state.count = state.items.reduce((acc, pizza) => pizza.count + acc, 0)
        },
        removeItem(state, action:PayloadAction<PayloadPizzaType>) {
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