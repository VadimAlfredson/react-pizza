import React from 'react';
import ParametersSelectionBlock from "../../../features/ParametersSelectionBlock/ui/ParametersSelectionBlock";
import ButtonAddItem from "../../../features/ButtonAddItem/ui/buttonAddItem";
import DetailsPizza from "../../../entities/Pizza/ui/PizzaDetails/DetailsPizza";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../app/Redux/Types/types";
import {statusDetailsSelector} from "../../../entities/Pizza/model/selectors";
import SkeletonPizzaDetails from "../../../shared/Skeleton/SkeletonPizzaDetails";

const Details: React.FC = () => {
    const {id} = useParams()
    const status = useAppSelector(statusDetailsSelector)
    return (<div className='container--info'>
        {status === 'pending' ? <SkeletonPizzaDetails /> :
            status === 'success' ? <DetailsPizza ParametersSelectionBlock={ParametersSelectionBlock} ButtonAddItem={ButtonAddItem} id={id}/> :
                <div>Сломалось что-то...</div>
}
        </div>
);
}
export default Details;

// 'success' | 'error'