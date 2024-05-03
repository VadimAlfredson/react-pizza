import {configureStore, Tuple} from "@reduxjs/toolkit";
import pizzasSlice from './Slices/pizzasSlice'
import filterSlice from "./Slices/filterSlice";
import cartSlice from "./Slices/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import infoPizzaSlice from "./Slices/infoPizzaSlice";

const store = configureStore({
    reducer: {
        pizzas: pizzasSlice.reducer,
        cart: cartSlice.reducer,
        filters: filterSlice.reducer,
        infoPizza: infoPizzaSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store