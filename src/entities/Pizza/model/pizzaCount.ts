import {PizzaCartType} from "./types";


export const pizzaCount = (id: string | undefined, pizzasInCart: Array<PizzaCartType>) => pizzasInCart.filter(obj => Number(obj.id) === Number(id)).reduce((acc: number, pizza) => pizza.count + acc, 0)