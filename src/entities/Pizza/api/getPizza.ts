import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {PizzaItemType, ThunkApiPizzaConfig} from "../model/types";

export const fetchPizzaDetails = createAsyncThunk<PizzaItemType, string | undefined, ThunkApiPizzaConfig>(
    'pizzaInfo/fetchPizzaInfo',
    async (id: string | undefined) => {
        const { data }: {data: PizzaItemType} = await axios({
            method: 'GET',
            url: `https://65d37906522627d50108f9e4.mockapi.io/pizzas/${id}`,
        })
        return data
    }
)