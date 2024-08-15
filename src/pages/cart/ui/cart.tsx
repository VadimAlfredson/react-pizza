import React, {useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import '../../../app/App/App.css';
import '../../../app/Styles/scss/_variables.scss'
import '../../../app/Styles/scss/app.scss'
import {clearItem} from "../../../entities/cart/model/read-one/cart-slice";
import {useAppDispatch, useAppSelector} from "../../../app/Redux/Types/types";
import {cartSelector} from "../model/selectors";
import {CartIcon} from "../../../shared/ui/icons/cartIcon";
import {UrnIcon} from "../../../shared/ui/icons/urnIcon";
import {PizzaCart} from "../../../entities/cart/ui/cart-item/cart-item";
import {ArrowBackIcon} from "../../../shared/ui/icons/arrowBackIcon";

export const Cart: React.FC = () => {
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