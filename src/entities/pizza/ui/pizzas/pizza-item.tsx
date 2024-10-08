import React, {useState} from 'react';
import '../../../../app/Styles/scss/_variables.scss'
import '../../../../app/Styles/scss/app.scss'
import {useAppSelector} from "../../../../app/Redux/Types/types";
import {NavLink} from "react-router-dom";
import {pizzaCount} from "../../../cart/model/read-one/pizza-count";
import {PizzaItemType} from "../../model/types";
import {PizzaCartType} from "../../../cart/model/read-one/types";
import {pizzasInCartSelector} from "../../../cart/model/read-one/selectors";

export const PizzaItem: React.FC<{pizza: PizzaItemType, ButtonAddItem: any, ParametersSelectionBlock: any}> = ({pizza, ButtonAddItem, ParametersSelectionBlock}) => {

    const [[activeType, activeSize], setActiveParameters] = useState<[number, number]>([0, 0])

    const pizzasInCart: Array<PizzaCartType> = useAppSelector(pizzasInCartSelector)

    const count: number = pizzaCount(String(pizza.id), pizzasInCart)

    return (
        <div className='pizza-block-wrapper'>
            <div className="pizza-block">
                <NavLink to={`pizza/${pizza.id}`}>{pizza.imageUrl ? <img
                    className="pizza-block__image"
                    src={pizza.imageUrl}
                    alt="Pizza"
                    onError={({currentTarget}) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = 'https://kuponoed.ru/wp-content/uploads/2020/05/3sv9dsvsd.png';
                    }}
                /> : <div style={{width: 260, height: 260, borderRadius: 130, backgroundColor: "grey"}}/>}
                    <h4 className="pizza-block__title">{pizza.name}</h4></NavLink>
                <ParametersSelectionBlock pizza={pizza} setActiveParameters={setActiveParameters}/>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {pizza.price[activeSize]} ₽</div>
                    <ButtonAddItem pizza={pizza} activeType={activeType} activeSize={activeSize} count={count}/>
                </div>
            </div>
        </div>
    )
};