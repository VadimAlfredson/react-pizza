import React from 'react';
import ReactPaginate from "react-paginate";
import style from './Paginator.module.scss'

const Paginator = (props) => {
    return (
        <ReactPaginate
            className={style.paginator}
            pageCount={3}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e) => props.setCurrentPage(e.selected)}
            pageRangeDisplayed={8}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Paginator;