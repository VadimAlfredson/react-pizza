import React from 'react';
import {addPizza} from "../../../entities/cart/model/read-one/add-pizza";
import {useAppDispatch} from "../../../app/Redux/Types/types";
import {PizzaItemType} from "../../../entities/pizza/model/types";
export const Button: React.FC<{pizza: PizzaItemType, activeType: number, activeSize: number, count: number}> = ({pizza, activeType, activeSize, count}) => {
    const dispatch = useAppDispatch()

    const onAddItemClick = () => {
        dispatch(addPizza(pizza, activeType, activeSize))
    }

    return (
        <>
        <button onClick={onAddItemClick} className="button button--outline button--add">
            <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                    fill="white"
                />
            </svg>
            <span>Добавить</span>
            {count > 0 && <i>{count}</i>}
        </button>
        </>
    );
};