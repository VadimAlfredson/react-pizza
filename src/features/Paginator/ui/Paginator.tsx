import React, {memo} from 'react';
import style from './Paginator.module.scss'
import {useAppDispatch, useAppSelector} from "../../../app/Redux/Types/types";
import {getPizzasToPage} from "../../../entities/Pizza/model/reducers/pizzasSlice";
import {currentPageSelector, totalCountSelector} from "../model/selectors";

const Paginator: React.FC = memo(function Paginator() {

    const dispatch = useAppDispatch()
    const currentPage = useAppSelector(currentPageSelector)
    const totalCount = useAppSelector(totalCountSelector)

    const onPageClick = (pageNumber: number) => {
        return dispatch(getPizzasToPage(pageNumber))
    }

    return (
        <div className={style.paginator}>
            {currentPage > 1 && <a onClick={() => onPageClick(currentPage - 1)}>ᐊ</a>}
            {[...new Array(totalCount)].map((page, index) => <a onClick={() => onPageClick(index + 1)}
                                                                className={index + 1 === currentPage ? style.selected : null}
                                                                key={index + 1}>{index + 1}</a>)}
            {currentPage < totalCount && <a onClick={() => onPageClick(currentPage + 1)}>ᐅ</a>}
        </div>
    );
});

export default Paginator;