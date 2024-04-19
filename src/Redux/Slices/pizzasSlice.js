import { createSlice } from '@reduxjs/toolkit'



const initialState = { value: 0 }

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        increment(state) {
            state.value++
        },
        decrement(state) {
            state.value--
        },
        incrementByAmount(state, action) {
            state.value += action.payload
        },
    },
})

export const { increment, decrement, incrementByAmount } = pizzasSlice.actions
export default pizzasSlice.reducer