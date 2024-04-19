import {createSlice} from '@reduxjs/toolkit'

// {"id":0,"imageUrl":"https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg","name":"Пепперони Фреш с перцем","types":[0,1],"sizes":[26,30,40],"price":803,"category":0,"rating":4}


const initialState = {
    items: [],
    price: 0,
    count: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
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

        increment(state, action) {
            const findPizza = state.items.find(item => item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type)
            if (findPizza) {
                findPizza.count += 1
            }

            state.price = state.items.reduce((acc, pizza) => pizza.price*pizza.count + acc, 0)
            state.count = state.items.reduce((acc, pizza) => pizza.count + acc, 0)
        },
        decrement(state, action) {
            const findPizza = state.items.find(item => item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type)
            if (findPizza) {
                findPizza.count > 1 ? findPizza.count -= 1 : state.items = state.items.filter(item => item.id !== action.payload.id || item.size !== action.payload.size || item.type !== action.payload.type)
            }

            state.price = state.items.reduce((acc, pizza) => pizza.price*pizza.count + acc, 0)
            state.count = state.items.reduce((acc, pizza) => pizza.count + acc, 0)
        },
        removeItem(state, action) {
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
export default cartSlice.reducer