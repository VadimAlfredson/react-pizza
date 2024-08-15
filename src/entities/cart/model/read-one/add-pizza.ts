import {addItem} from "./cart-slice";
import {PizzaItemType} from "../../../pizza/model/types";

export const addPizza = (pizza: PizzaItemType, activeType = 0, activeSize = 0) => addItem({
        id: pizza.id,
        imageUrl: pizza.imageUrl,
        name: pizza.name,
        type: activeType,
        size: activeSize,
        price: pizza.price[activeSize],
        category: pizza.category,
        rating: pizza.rating,
        count: 1
    })