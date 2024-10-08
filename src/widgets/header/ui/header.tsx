import React from 'react';
import '../../../app/Styles/scss/_variables.scss'
import '../../../app/Styles/scss/app.scss'
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/Redux/Types/types";
import {clearSearch} from "../../../app/Redux/Slices/filterSlice";
import {countSelector, priceSelector} from "../model/selectors";
import PizzaImg from "../../../shared/ui/imges/pizzaImg";
import {Search} from "../../../features/search-pizzas/ui/search";
import {CartIcon} from "../../../shared/ui/icons/cartIcon";

const Header: React.FC = () => {

    const price = useAppSelector(priceSelector)
    const count = useAppSelector(countSelector)

    const dispatch = useAppDispatch()

    const {pathname} = useLocation()

    const onBackHomeClick = () => {
        dispatch(clearSearch())
    }

    return <div className="header">
        <div className="container">
            <Link to={'/'} onClick={onBackHomeClick}>
                <div className="header__logo">
                    <PizzaImg/>
                    <div>
                        <h1>React Pizza</h1>
                        <p>самая вкусная пицца во вселенной</p>
                    </div>
                </div>
            </Link>
            <Search/>
            <div className="header__cart">
                {pathname !== '/cart' && <Link to="/cart" className="button button--cart">
                    <span>{price} ₽</span>
                    <div className="button__delimiter"></div>
                    <CartIcon/>
                    <span>{count}</span>
                </Link>}
            </div>
        </div>
    </div>
};

export default Header;