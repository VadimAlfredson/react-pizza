import {RootState} from "../../../../app/Redux/Store";

export const detailsPizzaSelector = (state: RootState) => state.details.detailsPizza
export const statusDetailsSelector = (state: RootState) => state.details.status
