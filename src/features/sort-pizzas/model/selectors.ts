import {RootState} from "../../../app/Redux/Store";

export const orderSelector = (state: RootState) => state.filters.order
export const sortSelector = (state: RootState) => state.filters.sort