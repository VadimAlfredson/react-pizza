import {ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {PizzaItemType} from "./cartSlice";
import {AppDispatch, RootState} from "../Store";


type InfoPizzaType = {
    id: number,
    imageUrl: string,
    name: string,
    type: Array<number>,
    size: Array<number>,
    price: number,
    category: number,
    rating: number,
    info: string,
    ingredients: Array<string>,
    specialStatus: Array<string>

}

type InfoPizzaStateType = {
    infoPizza: InfoPizzaType,
    status: 'pending' | 'success' | 'error'
}


type ThunkApiConfig = {
    state: RootState
    dispatch: AppDispatch
    rejectValue: string
    extra: any
}

export const fetchInfoPizza = createAsyncThunk<InfoPizzaType, string, ThunkApiConfig>(
    'pizzaInfo/fetchPizzaInfo',
    async (id: string) => {
        const {data} = await axios({
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
        type: [],
        size: [],
        price: 0,
        category: 0,
        rating: 0,
        info: '',
        ingredients: [''],
        specialStatus: ['']
    },
    status: 'pending'
}

const pizzasSlice = createSlice({
    name: 'pizzaInfo',
    initialState,
    reducers: {
        clearInfoPizza: (state) => {
            state.infoPizza = {
                id: 0,
                imageUrl: '',
                name: '',
                type: [],
                size: [],
                price: 0,
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
                fetchInfoPizza.fulfilled, (state, action: PayloadAction<InfoPizzaType>) => {
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
                    type: [],
                    size: [],
                    price: 0,
                    category: 0,
                    rating: 0,
                    info: '',
                    ingredients: [],
                    specialStatus: []
                }
            })
    }
})

export const {clearInfoPizza} = pizzasSlice.actions
export default pizzasSlice