import {RootState} from "../../../app/Redux/Store";

export const priceSelector = (state: RootState) => state.cart.price
export const countSelector = (state: RootState) => state.cart.count