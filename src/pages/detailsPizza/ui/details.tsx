import React, {useEffect} from 'react';
import ParametersSelectionBlock from "../../../features/ParametersSelectionBlock/ui/ParametersSelectionBlock";
import ButtonAddItem from "../../../features/ButtonAddItem/ui/buttonAddItem";
import DetailsPizza from "../../../entities/Pizza/ui/PizzaDetails/DetailsPizza";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/Redux/Types/types";
import SkeletonPizzaDetails from "../../../shared/Skeleton/SkeletonPizzaDetails";
import {fetchPizzaDetails} from "../../../entities/Pizza/api/getPizza";
import {clearInfoPizza} from "../../../entities/Pizza/model/reducers/detailsPizzaReducer";
import {idSelector, statusSelector} from "../model/selectors";

const Details: React.FC = () => {
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
                : status === 'success' ? <DetailsPizza ParametersSelectionBlock={ParametersSelectionBlock}
                                                       ButtonAddItem={ButtonAddItem}
                                                       id={id}/>
                    : <div>Сломалось что-то...</div>
            }
        </div>
    );
}
export default Details;

// 'success' | 'error'