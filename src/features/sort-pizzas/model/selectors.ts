import {RootState} from "../../../app/Redux/Store";

export const orderSelector = (state: RootState) => state.sort.order

export const sortSelector = (state: RootState) => state.sort.sort