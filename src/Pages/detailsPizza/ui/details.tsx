import React from 'react';
import ParametersSelectionBlock from "../../../features/ParametersSelectionBlock/ui/ParametersSelectionBlock";
import ButtonAddItem from "../../../features/ButtonAddItem/ui/buttonAddItem";
import DetailsPizza from "../../../entities/Pizza/ui/PizzaDetails/DetailsPizza";
import {useParams} from "react-router-dom";

const Details: React.FC = () => {
    const {id} = useParams()
    return <DetailsPizza ParametersSelectionBlock={ParametersSelectionBlock} ButtonAddItem={ButtonAddItem} id={id}/>;
}
export default Details;