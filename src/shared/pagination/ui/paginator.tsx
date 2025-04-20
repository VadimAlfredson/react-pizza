import React, {memo} from 'react';
import style from './paginator.module.scss'

type PropsType = {
    currentPage: number,
    totalCount: number,
    onPageClick: (currentPage: number) => void
}
export const Paginator: React.FC<PropsType> = memo(function Paginator({currentPage, totalCount, onPageClick}) {

    return (
        <div className={style.paginator}>
            {currentPage > 1 && <a onClick={() => onPageClick(currentPage - 1)}>ᐊ</a>}
            {[...new Array(totalCount)].map((page, index) => (
                <a onClick={() => onPageClick(index + 1)}
                   className={index + 1 === currentPage ? style.selected : null}
                   key={index + 1}
                >
                    {index + 1}
                </a>
            ))}
            {currentPage < totalCount && <a onClick={() => onPageClick(currentPage + 1)}>ᐅ</a>}
        </div>
    );
});