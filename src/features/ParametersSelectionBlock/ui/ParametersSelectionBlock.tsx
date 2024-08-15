import React, {memo, useEffect, useState} from 'react';
import {PizzaItemType} from "../../../entities/Pizza/model/types";

const typesName = ['тонкое', 'традиционное']
export const ParametersSelectionBlock: React.FC<{pizza: PizzaItemType, setActiveParameters: ([]) => void}> = memo(({pizza, setActiveParameters}) => {

    console.log(pizza)

    const [activeType, setActiveType] = useState<number>(0)
    const [activeSize, setActiveSize] = useState<number>(0)


    useEffect(() => {
        setActiveParameters([activeType, activeSize])
    }, [activeType, activeSize])

    return (
        <>
        <div className="pizza-block__selector">
            <ul>{pizza.id ? pizza.types.map((type, index) => <li
                className={activeType === index ? 'active' : ''} key={index}
                onClick={() => setActiveType(index)}>{typesName[index]}</li>) : 'Loading...'}</ul>
            <ul>{pizza.id ? pizza.sizes.map((size, index) => <li
                className={activeSize === index ? 'active' : ''} key={index}
                onClick={() => setActiveSize(index)}>{size} см.</li>) : 'Loading...'}</ul>
        </div>
        </>
    );
});

export default ParametersSelectionBlock;