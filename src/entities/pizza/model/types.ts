import {AppDispatch, RootState} from "../../../app/Redux/Store";


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

export type PizzasStateType = {
    pizzas: Array<PizzaItemType>,
    status: 'pending' | 'success' | 'error',
    pizzasToCurrentPage: Array<PizzaItemType>,
    currentPage: number,
    totalCount: number
}

export type ThunkArgumentsType = {
    category?: number | null,
    sort: 'rating' | 'price' | 'name',
    order: 'asc' | 'desc',
    search: string
}