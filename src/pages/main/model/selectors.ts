import {RootState} from "../../../app/Redux/Store";

export const filtersSelector = (state: RootState) => state.filters
export const pizzasSelector = (state: RootState) => state.pizzas
