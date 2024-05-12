import {ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {PizzaItemType} from "./cartSlice";
import {AppDispatch, RootState} from "../Store";


type PizzasStateType = {
    pizzas: Array<PizzaItemType>,
    status: 'pending' | 'success' | 'error'
}

export type ThunkArgumentsType = {
    category?: number | null,
    sort: 'rating' | 'price' | 'name',
    order: 'asc' | 'desc',
    search?: string,
    l?: number,
    currentPage: number
}


type ThunkApiConfig = {
    state: RootState
    dispatch: AppDispatch
    rejectValue: string
    extra: any
}

export const fetchPizzas = createAsyncThunk<Array<PizzaItemType>, ThunkArgumentsType, ThunkApiConfig>(
    'pizzas/fetchPizzasStatus',
    async ({currentPage, category, sort, order, search}) => {
        const { data }: { data: Array<PizzaItemType> } = await axios({
            method: 'GET',
            url: `https://65d37906522627d50108f9e4.mockapi.io/pizzas`,
            params: {
                p: currentPage + 1,
                l: 8,
                category: category ? category : null,
                sortBy: sort,
                order: order,
                search: search ? search : null
            }
        })
        console.log(data)
        return data

    }
)

const initialState: PizzasStateType = {pizzas: [], status: 'pending'}

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        add: (state) => state
    },
    extraReducers: (builder: ActionReducerMapBuilder<PizzasStateType>) => {
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
    }
})

export const {} = pizzasSlice.actions
export default pizzasSlice