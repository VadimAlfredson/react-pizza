import {RootState} from "../../../app/Redux/Store";

export const sortSelector = (state: RootState) => state.sort.sort

export const orderSelector = (state: RootState) => state.sort.order
export const categoriesSelector = (state: RootState) => state.categories.category
export const searchSelector = (state: RootState) => state.search.search
export const pizzasSelector = (state: RootState) => state.pizzas
