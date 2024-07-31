import {RootState} from "./Store";


export const pizzasSelector = (state: RootState) => state.pizzas
export const cartSelector = (state: RootState) => state.cart
export const filtersSelector = (state: RootState) => state.filters

