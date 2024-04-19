import {configureStore, Tuple} from "@reduxjs/toolkit";
import pizzasSlice from './Slices/pizzasSlice'
import filterSlice from "./Slices/filterSlice";
import cartSlice from "./Slices/cartSlice";

const store = configureStore({
    reducer: {
        pizzas: pizzasSlice,
        cart: cartSlice,
        filters: filterSlice,
    }
})

export default store