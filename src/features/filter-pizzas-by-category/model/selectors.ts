import {RootState} from "../../../app/Redux/Store";

export const searchSelector = (state: RootState) => state.filters.search

export const categorySelector = (state: RootState) => state.filters.category