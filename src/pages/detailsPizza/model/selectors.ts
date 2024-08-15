import {RootState} from "../../../app/Redux/Store";

export const statusSelector = (state: RootState) => state.details.status
export const idSelector = (state: RootState) => state.details.detailsPizza.id