import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async ({currentPage, category, sort, order, search, setIsLoading}) => {
        const response = await axios.get(`https://65d37906522627d50108f9e4.mockapi.io/pizzas?p=${currentPage + 1}&l=${4}&${category ? `category=${category}` : ''}${sort ? `&sortBy=${sort}` : ''}${order ? `&order=${order}` : ''}${search ? `&search=${search}` : ''}`)
        console.log(response.data)
        return response.data

    }
)

const initialState = {pizzas: [], status: 'pending'}

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        /*setPizzas(state, action) {
            state.pizzas = action.payload
        }*/
    },
    extraReducers: (builder) => {
        builder
            .addCase(
            fetchPizzas.fulfilled, (state, action) => {
                state.pizzas = action.payload
                state.status = 'success'
            })
            .addCase(fetchPizzas.pending, (state) => {
                state.status = 'pending'
                state.pizzas = []
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = 'error'
                state.pizzas = []
            })
    },
})

export const {setPizzas} = pizzasSlice.actions
export default pizzasSlice.reducer