import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../Redux/Store";


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

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