import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/Redux/Types/types";
import SkeletonPizzaDetails from "../../../shared/ui/Skeleton/SkeletonPizzaDetails";
import {fetchPizzaDetails} from "../../../entities/pizza/api/get-pizza";
import {clearInfoPizza} from "../../../entities/pizza/model/readOne/details-pizza-slice";
import {idSelector, statusSelector} from "../model/selectors";
import {DetailsPizza} from "../../../entities/pizza/ui/pizza-details/details-pizza";
import {SelectPizzaOptions} from "../../../features/select-pizza-options/ui/select-pizza-options";
import {Button} from "../../../features/add-pizza-to-cart/ui/button";

export const Details: React.FC = () => {
    const {id} = useParams()
    const status = useAppSelector(statusSelector)
    const dispatch = useAppDispatch()
    const idPizza = useAppSelector(idSelector)

    useEffect(() => {
        if (id !== String(idPizza)) {
            dispatch(fetchPizzaDetails(id))
        }
        return () => {
            dispatch(clearInfoPizza())
        }
    }, [id])
    return (<div className='container--info'>
            {status === 'pending' ? <SkeletonPizzaDetails/>
                : status === 'success' ? <DetailsPizza ParametersSelectionBlock={SelectPizzaOptions}
                                                       ButtonAddItem={Button}
                                                       id={id}/>
                    : <div>Сломалось что-то...</div>
            }
        </div>
    );
}