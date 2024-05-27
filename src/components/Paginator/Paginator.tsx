import React, {memo} from 'react';
import style from './Paginator.module.scss'
import {useAppDispatch, useAppSelector} from "../../types/types";
import {getPizzasToPage} from "../../Redux/Slices/pizzasSlice";
import {pizzasSelector} from "../../Redux/Selectors";

const Paginator: React.FC = memo(function Paginator() {
    const dispatch = useAppDispatch()
    const pizzas = useAppSelector(pizzasSelector)
    return (
        <div className={style.paginator}>
            {pizzas.currentPage > 1 && <a onClick={() => dispatch(getPizzasToPage(pizzas.currentPage - 1))}>ᐊ</a>}
            {[...new Array(pizzas.totalCount)].map((page, index) => <a onClick={() => dispatch(getPizzasToPage(index + 1))} className={index + 1 === pizzas.currentPage ? style.selected : null} key={index + 1}>{index + 1}</a>)}
            {pizzas.currentPage < pizzas.totalCount && <a onClick={() => dispatch(getPizzasToPage(pizzas.currentPage + 1))}>ᐅ</a>}
        </div>
    );
});

export default Paginator;