import {RootState} from "../../../app/Redux/Store";


export const totalCountSelector = (state: RootState) => state.pizzas.totalCount
export const currentPageSelector = (state: RootState) => state.pizzas.currentPage