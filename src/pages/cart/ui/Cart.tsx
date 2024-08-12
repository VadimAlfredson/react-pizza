import React, {useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import '../../../app/App/App.css';
import '../../../scss/_variables.scss'
import '../../../scss/app.scss'
import PizzaCart from "../../../entities/Pizza/ui/PizzaCart/PizzaCart";
import {clearItem} from "../../../entities/Pizza/model/reducers/cartSlice";
import {useAppDispatch, useAppSelector} from "../../../app/Redux/Types/types";
import UrnIcon from "../../../shared/icons/urnIcon";
import CartIcon from "../../../shared/icons/cartIcon";
import ArrowBackIcon from "../../../shared/icons/arrowBackIcon";
import {cartSelector} from "../model/selectors";

const Cart: React.FC = () => {
    const isMounting = useRef(false)

    const dispatch = useAppDispatch()
    const cart = useAppSelector(cartSelector)

    const onClearCard = () => {
        dispatch(clearItem())
    }

    useEffect(() => {
        if (isMounting.current) {
            window.localStorage.setItem('cart', JSON.stringify(cart.items))
            console.log(JSON.stringify(cart.items))
        }
        isMounting.current = true
        console.log(window.localStorage.getItem('cart'))
    }, [cart.items])

    return (
        <div className="container container--cart">
            <div className="cart">
                <div className="cart__top">
                    <h2 className="content__title">
                        <CartIcon/>
                        Корзина
                    </h2>
                    <div className="cart__clear">
                        <UrnIcon/>
                        <span onClick={() => onClearCard()}>Очистить корзину</span>
                    </div>
                </div>
                <div className="cart__items">
                    {cart.items.length ? cart.items.map(pizza => <PizzaCart pizza={pizza}
                                                                            key={`${pizza.id}size${pizza.size}`}/>) :
                        <h1>Корзина пуста</h1>}
                </div>
                <div className="cart__bottom">
                    <div className="cart__bottom-details">
                        <span>Всего пицц: <b>{cart.count} шт.</b></span>
                        <span>Сумма заказа: <b>{cart.price} ₽</b></span>
                    </div>
                    <div className="cart__bottom-buttons">
                        <Link to="/" className="button button--outline button--add go-back-btn">
                            <ArrowBackIcon/>
                            <span>Вернуться назад</span>
                        </Link>
                        <div className="button pay-btn">
                            <span>Оплатить сейчас</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;