import React, {useState} from "react";
import {pizzaCount} from "../../../cart/model/read-one/pizza-count";
import {useAppSelector} from "../../../../app/Redux/Types/types";
import {detailsPizzaSelector, statusDetailsSelector} from "../../model/readOne/selectors";
import Skeleton from "../../../../shared/ui/Skeleton/SkeletonPizzaItem";
import {pizzasInCartSelector} from "../../../cart/model/read-one/selectors";

export const DetailsPizza: React.FC<{ ButtonAddItem: any, ParametersSelectionBlock: any, id: string | undefined }> = ({
                                                                                                                   ParametersSelectionBlock,
                                                                                                                   ButtonAddItem,
                                                                                                                   id
                                                                                                               }) => {

    const detailsPizza = useAppSelector(detailsPizzaSelector)

    const status = useAppSelector(statusDetailsSelector)

    const pizzasInCart = useAppSelector(pizzasInCartSelector)

    const [[activeType, activeSize], setActiveParameters] = useState<[number, number]>([0, 0])

    const count = pizzaCount(id, pizzasInCart)

    return (

        <div className="info-pizza-block">
            {status === 'success' ? <>
                <div className="img-block">
                    <img
                        className={'img'}
                        src={detailsPizza.imageUrl}
                        alt="Pizza"
                        onError={({currentTarget}) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = 'https://kuponoed.ru/wp-content/uploads/2020/05/3sv9dsvsd.png';
                        }}
                    />
                </div>

                <div className='info-side'><h2 className="title">{detailsPizza.name}</h2>
                    <div><h4>Ингридиенты: </h4>  {detailsPizza.ingredients.join(", ")}</div>
                    <ParametersSelectionBlock setActiveParameters={setActiveParameters} pizza={detailsPizza}/>
                    <div className="pizza-block__bottom">
                        <div className="pizza-block__price">от {detailsPizza.price[activeSize]} ₽</div>
                        <ButtonAddItem pizza={detailsPizza} activeType={activeType} activeSize={activeSize}
                                       count={count}/>
                    </div>
                </div>
            </> : <Skeleton/>}
        </div>
    );
};
