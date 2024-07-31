import {configureStore, Tuple} from "@reduxjs/toolkit";
import pizzasSlice from '../entities/Pizza/model/reducers/pizzasSlice'
import filtersSlice from "./Slices/filterSlice";
import cartSlice from "./Slices/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import detailsPizza from "../entities/Pizza/model/reducers/detailsPizzaReducer";

const store = configureStore({
    reducer: {
        pizzas: pizzasSlice.reducer,
        cart: cartSlice.reducer,
        filters: filtersSlice.reducer,
        details: detailsPizza.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store