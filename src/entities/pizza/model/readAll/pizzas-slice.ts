import {ActionReducerMapBuilder, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Pagination} from "../../../../features/pagination/model/pagination";
import {fetchPizzas} from "../../api/get-pizzas";
import {PizzasStateType} from "../types";


const initialState: PizzasStateType = {
    pizzas: [],
    status: 'pending',
    pizzasToCurrentPage: [],
    currentPage: 1,
    totalCount: 1
}

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        getPizzasToPage: (state, action: PayloadAction<number>) => {
            state.pizzasToCurrentPage = Pagination(state.pizzas, action.payload)
            state.currentPage = action.payload
        },
        getSearchPizza: (state, action: PayloadAction<string>) => {
            const searchResult = state.pizzas.filter((pizza, index) => pizza.name.includes(action.payload))
            state.pizzas = searchResult
            state.pizzasToCurrentPage = Pagination(searchResult, 1)
            state.currentPage = 1
            state.totalCount = Math.ceil(searchResult.length / 8)
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<PizzasStateType>) => {
        builder
            .addCase(
                fetchPizzas.fulfilled, (state, action) => {
                    state.pizzas = action.payload
                    state.status = 'success'
                    state.pizzasToCurrentPage = Pagination(action.payload, 1)
                    state.currentPage = 1
                    state.totalCount = Math.ceil(action.payload.length / 8)
                })
            .addCase(
                fetchPizzas.pending, (state) => {
                    state.status = 'pending'
                    state.pizzas = []
                    state.pizzasToCurrentPage = []
                    state.currentPage = 1
                    state.totalCount = 1
                })
            .addCase(
                fetchPizzas.rejected, (state) => {
                    state.status = 'error'
                    state.pizzas = []
                    state.pizzasToCurrentPage = []
                    state.currentPage = 1
                    state.totalCount = 1
                })
    }
})

export const {getPizzasToPage, getSearchPizza} = pizzasSlice.actions
export default pizzasSlice