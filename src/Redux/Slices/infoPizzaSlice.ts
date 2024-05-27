import {ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {AppDispatch, RootState} from "../Store";
import {PizzaItemType} from "../../types/types";


type InfoPizzaStateType = {
    infoPizza: PizzaItemType,
    status: 'pending' | 'success' | 'error'
}


type ThunkApiConfig = {
    state: RootState
    dispatch: AppDispatch
    rejectValue: string
    extra: any
}

export const fetchInfoPizza = createAsyncThunk<PizzaItemType, string | undefined, ThunkApiConfig>(
    'pizzaInfo/fetchPizzaInfo',
    async (id: string | undefined) => {
        const { data }: {data: PizzaItemType} = await axios({
            method: 'GET',
            url: `https://65d37906522627d50108f9e4.mockapi.io/pizzas/${id}`,
        })
        return data
    }
)

const initialState: InfoPizzaStateType = {
    infoPizza: {
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

const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        clearInfoPizza: (state) => {
            state.infoPizza = {
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
                fetchInfoPizza.fulfilled, (state, action: PayloadAction<PizzaItemType>) => {
                    state.infoPizza = {...action.payload}
                    state.status = 'success'
                })
            .addCase(fetchInfoPizza.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(fetchInfoPizza.rejected, (state) => {
                state.status = 'error'
                state.infoPizza = {
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

export const {clearInfoPizza} = infoSlice.actions
export default infoSlice