import {configureStore, Tuple} from "@reduxjs/toolkit";
import pizzasSlice from '../../entities/pizza/model/read-all/pizzas-slice'
import cartSlice from "../../entities/cart/model/read-one/cart-slice";
import categoriesSlice from "../../features/filter-pizzas-by-category/model/categories-slice";
import detailsPizzaSlice from "../../entities/pizza/model/read-one/details-pizza-slice";
import searchSlice from "../../features/search-pizzas/model/search-slice";
import sortSlice from "../../features/sort-pizzas/model/sort-slice";

const store = configureStore({
    reducer: {
        pizzas: pizzasSlice.reducer,
        cart: cartSlice.reducer,
        details: detailsPizzaSlice.reducer,
        categories: categoriesSlice.reducer,
        search: searchSlice.reducer,
        sort: sortSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store