import React from 'react';
import style from './Paginator.module.scss'
import {useAppDispatch, useAppSelector} from "../../types/types";
import {getPizzasToPage} from "../../Redux/Slices/pizzasSlice";

const Paginator: React.FC = () => {
    const dispatch = useAppDispatch()
    const currentPage = useAppSelector(state => state.pizzas.currentPage)
    const totalCount = useAppSelector(state => state.pizzas.totalCount)
    return (
        <div className={style.paginator}>
            {[...new Array(totalCount)].map((page, index) => <a onClick={() => dispatch(getPizzasToPage(index + 1))} className={index + 1 === currentPage && style.selected} key={index + 1}>{index + 1}</a>)}
        </div>
    );
};

export default Paginator;