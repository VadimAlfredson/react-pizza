import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {getCartInitialState} from "../../../utils/getCartState";
import {PizzaCartType} from "../../../entities/Pizza/model/types";




type CartStateType = {
    items: Array<PizzaCartType>,
    price: number,
    count: number
}

const initialState: CartStateType = getCartInitialState()

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<PizzaCartType>) {
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

        increment(state, action:PayloadAction<PizzaCartType>) {
            const findPizza = state.items.find(item => item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type)
            if (findPizza) {
                findPizza.count += 1
            }
            state.price += action.payload.price
            state.count += 1
        },
        decrement(state, action:PayloadAction<PizzaCartType>) {
            const findPizza = state.items.find(item => item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type)
            if (findPizza) {
                findPizza.count > 1 ? findPizza.count -= 1 : state.items = state.items.filter(item => item.id !== action.payload.id || item.size !== action.payload.size || item.type !== action.payload.type)
            }
            state.price -= action.payload.price
            state.count -= 1
        },
        removeItem(state, action:PayloadAction<PizzaCartType>) {
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