import {configureStore, Tuple} from "@reduxjs/toolkit";
import pizzasSlice from '../../entities/pizza/model/readAll/pizzas-slice'
import filtersSlice from "./Slices/filterSlice";
import cartSlice from "../../entities/cart/model/read-one/cart-slice";
import {useDispatch, useSelector} from "react-redux";
import detailsPizza from "../../entities/pizza/model/readOne/details-pizza-slice";

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