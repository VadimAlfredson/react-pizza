import React, {useState} from 'react';
import '../../scss/_variables.scss'
import '../../scss/app.scss'
import {useDispatch, useSelector} from "react-redux";
import {addItem} from "../../Redux/Slices/cartSlice";

const PizzaBlock = ({id, imageUrl, name, types, sizes, price, category, rating}) => {
    const typesName = ['тонкое', 'традиционное']

    const dispatch = useDispatch()

    const pizzaCount = useSelector(state => state.cart.items.filter(obj => obj.id === id).reduce((acc, pizza) => pizza.count + acc, 0))
    const [activeType, setActiveType] = useState(0)
    const [activeSize, setActiveSize] = useState(0)
    const addPizzaCount = () => {
        dispatch(addItem({
            id: id,
            imageUrl: imageUrl,
            name: name,
            type: activeType,
            size: activeSize,
            price: price,
            category: category,
            rating: rating,
            count: 1
        }))}

    return (
        <div className='pizza-block-wrapper'>
        <div className="pizza-block">
            {imageUrl ? <img
                className="pizza-block__image"
                src={imageUrl}
                alt="Pizza"
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src='https://kuponoed.ru/wp-content/uploads/2020/05/3sv9dsvsd.png';
                }}
            /> : <div style={{width: 260, height: 260, borderRadius: 130, backgroundColor: "grey"}}>Изображение отсутствет</div>}
            <h4 className="pizza-block__title">{name}</h4>
            <div className="pizza-block__selector">
                <ul>{types.map((type, index) => <li className={activeType === index ? 'active' : ''} key={index} onClick={() => setActiveType(index)}>{typesName[index]}</li>)}</ul>
                <ul>{sizes.map((size, index) => <li className={activeSize === index ? 'active' : ''} key={index} onClick={() => setActiveSize(index)}>{size} см.</li>)}</ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {price} ₽</div>
                <button onClick={addPizzaCount} className="button button--outline button--add">
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
                    {pizzaCount > 0 && <i>{pizzaCount}</i>}
                </button>
            </div>
        </div>
        </div>
    )
};

export default PizzaBlock;