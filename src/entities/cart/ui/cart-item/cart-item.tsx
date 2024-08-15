import React from 'react';
import {decrement, increment, removeItem} from "../../model/read-one/cart-slice";
import {useAppDispatch} from "../../../../app/Redux/Types/types";
import {typesDough, typesSize} from "../../../pizza/model/constants";
import {MinusIcon} from "../../../../shared/ui/icons/minusIcon";
import {PlusIcon} from "../../../../shared/ui/icons/plusIcon";
import {CloseIcon} from "../../../../shared/ui/icons/closeIcon";
import {PizzaCartType} from "../../model/read-one/types";

export const PizzaCart: React.FC<{ pizza: PizzaCartType }> = ({pizza}) => {
    const dispatch = useAppDispatch()

    const onIncrementClick = () => {
        dispatch(increment(pizza))
    }
    const onDecrementClick = () => {
        dispatch(decrement(pizza))
    }

    const onRemoveClick = () => {
        dispatch(removeItem(pizza))
    }

    return (
        <div className="cart__item">
            <div className="cart__item-img">
                <img className="pizza-block__image"
                     src={pizza.imageUrl}
                     alt="Pizza"/>
            </div>
            <div className="cart__item-info">
                <h3>{pizza.name}</h3>
                <p>Тесто {typesDough[pizza.type]}, {typesSize[pizza.size]}</p>
            </div>
            <div className="cart__item-count">
                <button onClick={() => onDecrementClick()}
                        className="button button--outline button--circle cart__item-count-minus">
                    <MinusIcon/>
                </button>
                <b>{pizza.count}</b>
                <button onClick={() => onIncrementClick()}
                        className="button button--outline button--circle cart__item-count-plus">
                    <PlusIcon/>
                </button>
            </div>
            <div className="cart__item-price">
                <b>{pizza.price * pizza.count}</b>
            </div>
            <div className="cart__item-remove">
                <button onClick={() => onRemoveClick()} className="button button--outline button--circle">
                    <CloseIcon/>
                </button>
            </div>
        </div>
    );
};