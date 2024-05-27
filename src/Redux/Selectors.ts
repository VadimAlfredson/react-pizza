import {RootState} from "./Store";


export const pizzasSelector = (state: RootState) => state.pizzas
export const cartSelector = (state: RootState) => state.cart
export const infoSelector = (state: RootState) => state.info
export const filtersSelector = (state: RootState) => state.filters

