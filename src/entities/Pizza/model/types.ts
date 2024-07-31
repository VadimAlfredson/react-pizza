import {AppDispatch, RootState} from "../../../Redux/Store";

export type PizzaCartType = {
    id: number,
    imageUrl: string,
    name: string,
    type: number,
    size: number,
    price: number,
    category: number,
    rating: number,
    count: number
}

export type PizzaItemType = {
    id: number,
    imageUrl: string,
    name: string,
    types: Array<number>,
    sizes: Array<number>,
    price: Array<number>,
    category: number,
    rating: number
    ingredients: Array<string>,
    specialStatus: Array<string>,
    info: string
}

export type ThunkApiPizzasConfig = {
    state: RootState
    dispatch: AppDispatch
    rejectValue: string
    extra: any
}

export type ThunkApiPizzaConfig = {
    state: RootState
    dispatch: AppDispatch
    rejectValue: string
    extra: any
}