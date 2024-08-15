import {RootState} from "../../../../app/Redux/Store";

export const pizzasInCartSelector = (state: RootState) => state.cart.items
