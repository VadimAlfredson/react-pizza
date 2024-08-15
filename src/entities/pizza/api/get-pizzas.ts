import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {PizzaItemType, ThunkApiPizzasConfig, ThunkArgumentsType} from "../model/types";

export const fetchPizzas = createAsyncThunk<Array<PizzaItemType>, ThunkArgumentsType, ThunkApiPizzasConfig>(
    'pizzas/fetchPizzasStatus',
    async ({category, sort, order, search}) => {
        const {data}: { data: Array<PizzaItemType> } = await axios({
            method: 'GET',
            url: `https://65d37906522627d50108f9e4.mockapi.io/pizzas`,
            params: {
                category: category ? category : null,
                sortBy: sort,
                order: order,
                search: search ? search : null
            }
        })
        console.log(data)
        return data
    }
)