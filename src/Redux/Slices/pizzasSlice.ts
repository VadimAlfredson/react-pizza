import {ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {PizzaItemType} from "./cartSlice";
import {AppDispatch, RootState} from "../Store";
import {Pagination} from "../../utils/Pagination";


type PizzasStateType = {
    pizzas: Array<PizzaItemType>,
    status: 'pending' | 'success' | 'error',
    pizzasToCurrentPage: Array<PizzaItemType>,
    currentPage: number,
    totalCount: number
}

export type ThunkArgumentsType = {
    category?: number | null,
    sort: 'rating' | 'price' | 'name',
    order: 'asc' | 'desc',
    search?: string,
}


type ThunkApiConfig = {
    state: RootState
    dispatch: AppDispatch
    rejectValue: string
    extra: any
}

export const fetchPizzas = createAsyncThunk<Array<PizzaItemType>, ThunkArgumentsType, ThunkApiConfig>(
    'pizzas/fetchPizzasStatus',
    async ({category, sort, order, search}) => {
        const {data}: { data: Array<PizzaItemType> } = await axios({
            method: 'GET',
            url: `https://65d37906522627d50108f9e4.mockapi.io/pizzas`,
            params: {
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
            .addCase(fetchPizzas.pending, (state) => {
                state.status = 'pending'
                state.pizzas = []
                state.pizzasToCurrentPage = []
                state.currentPage = 1
                state.totalCount = 1
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = 'error'
                state.pizzas = []
                state.pizzasToCurrentPage = []
                state.currentPage = 1
                state.totalCount = 1
            })
    }
})

export const {getPizzasToPage} = pizzasSlice.actions
export default pizzasSlice