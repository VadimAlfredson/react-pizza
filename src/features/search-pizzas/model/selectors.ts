
import {RootState} from "../../../app/Redux/Store";

export const searchSelector = (state: RootState) => state.search.search

export const categorySelector = (state: RootState) => state.categories.category
export const statusSelector = (state: RootState) => state.pizzas.status
