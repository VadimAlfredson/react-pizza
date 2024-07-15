import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import '../app/App/App.css';
import '../scss/_variables.scss'
import '../scss/app.scss'
import {useAppDispatch, useAppSelector} from "../types/types";
import {clearInfoPizza, fetchInfoPizza} from "../Redux/Slices/infoPizzaSlice";
import {infoSelector} from "../Redux/Selectors";
import {addItem} from "../Redux/Slices/cartSlice";

const typesName = ['тонкое', 'традиционное']
const PizzaInfo: React.FC = () => {
    const {id} = useParams()

    const dispatch = useAppDispatch()
    const info = useAppSelector(infoSelector)
    const pizzaCount: number = useAppSelector(state => state.cart.items.filter(obj => Number(obj.id) === Number(id)).reduce((acc: number, pizza) => pizza.count + acc, 0))

    const [activeType, setActiveType] = useState<number>(0)
    const [activeSize, setActiveSize] = useState<number>(0)

    const addPizzaClick = () => {
        dispatch(addItem({
            id: info.infoPizza.id,
            imageUrl: info.infoPizza.imageUrl,
            name: info.infoPizza.name,
            type: activeType,
            size: activeSize,
            price: info.infoPizza.price[activeSize],
            category: info.infoPizza.category,
            rating: info.infoPizza.rating,
            count: 1
        }))}

    useEffect(() => {
        if (id !== String(info.infoPizza.id)){
        dispatch(fetchInfoPizza(id))
            }
        /*return () => {
            dispatch(clearInfoPizza())
        }*/
    }, [id])

    return (
        <div className="container container--info">
           <div className="info-pizza-block">
               <div className="img-block">
                   <img
                    className={'img'}
                    src={info.infoPizza.imageUrl}
                    alt="Pizza"
                    onError={({currentTarget}) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = 'https://kuponoed.ru/wp-content/uploads/2020/05/3sv9dsvsd.png';
                    }}
                />
               </div>

               <div className='info-side'><h2 className="title">{info.infoPizza.name}</h2>
                   <div><h4>Ингридиенты: </h4>  {info.infoPizza.ingredients.join(", ")}</div>
                <div className="pizza-block__selector">
                    <ul>{info.infoPizza.types.map((type, index) => <li className={activeType === index ? 'active' : ''} key={index}
                                                        onClick={() => setActiveType(index)}>{typesName[index]}</li>)}</ul>
                    <ul>{info.infoPizza.sizes.map((size, index) => <li className={activeSize === index ? 'active' : ''} key={index}
                                                        onClick={() => setActiveSize(index)}>{size} см.</li>)}</ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {info.infoPizza.price[activeSize]} ₽</div>
                    <button onClick={addPizzaClick} className="button button--outline button--add">
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
                </div></div>
            </div>
        </div>
    );
};

export default PizzaInfo;