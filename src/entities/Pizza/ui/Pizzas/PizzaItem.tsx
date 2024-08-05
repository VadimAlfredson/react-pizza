import React, {useState} from 'react';
import '../../../../scss/_variables.scss'
import '../../../../scss/app.scss'
import {useAppSelector} from "../../../../types/types";
import {NavLink} from "react-router-dom";
import {pizzaCount} from "../../model/pizzaCount";
import {pizzasInCartSelector} from "../../model/Selectors";
import ButtonAddItem from "../../../../features/ButtonAddItem/ui/buttonAddItem";
import {PizzaCartType, PizzaItemType} from "../../model/types";

const PizzaItem: React.FC<{pizza: PizzaItemType, ButtonAddItem: any, ParametersSelectionBlock: any}> = ({pizza, ButtonAddItem, ParametersSelectionBlock}) => {

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

export default PizzaItem;