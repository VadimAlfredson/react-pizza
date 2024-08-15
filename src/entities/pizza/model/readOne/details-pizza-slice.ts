import {ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {PizzaItemType} from "../types";
import {fetchPizzaDetails} from "../../api/get-pizza";


type InfoPizzaStateType = {
    detailsPizza: PizzaItemType,
    status: 'pending' | 'success' | 'error'
}

const initialState: InfoPizzaStateType = {
    detailsPizza: {
        id: 0,
        imageUrl: '',
        name: '',
        types: [],
        sizes: [],
        price: [],
        category: 0,
        rating: 0,
        ingredients: [],
        specialStatus: [],
        info: '',
    },
    status: 'pending'
}

const detailsSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        clearInfoPizza: (state) => {
            state.detailsPizza = {
                id: 0,
                imageUrl: '',
                name: '',
                types: [],
                sizes: [],
                price: [],
                category: 0,
                rating: 0,
                info: '',
                ingredients: [],
                specialStatus: []
            }
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<InfoPizzaStateType>) => {
        builder
            .addCase(
                fetchPizzaDetails.fulfilled, (state, action: PayloadAction<PizzaItemType>) => {
                    state.detailsPizza = {...action.payload}
                    state.status = 'success'
                })
            .addCase(
                fetchPizzaDetails.pending, (state) => {
                    state.status = 'pending'
                })
            .addCase(
                fetchPizzaDetails.rejected, (state) => {
                    state.status = 'error'
                    state.detailsPizza = {
                        id: 0,
                        imageUrl: '',
                        name: '',
                        types: [],
                        sizes: [],
                        price: [],
                        category: 0,
                        rating: 0,
                        ingredients: [],
                        specialStatus: [],
                        info: '',
                    }
                })
    }
})

export const {clearInfoPizza} = detailsSlice.actions
export default detailsSlice