import React, {useEffect, useRef, useState} from 'react';

import styles from './Search.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {setSearch, clearSearch} from "../../Redux/Slices/filterSlice";
import {useDebounce} from "../../CustomHooks/useDebounce";

const Search = () => {
    const dispatch = useDispatch()

    const search = useSelector(state => state.filters.search)

    const [value, setValue] = useState(search)

    const debounceSearch = useDebounce(value, 250)

    const onInputChange = (e) => {
        setValue(e.target.value)
        /*dispatch(setSearch(e.target.value))*/
    }

    useEffect(() => {
        if (debounceSearch !== search) {
            dispatch(setSearch(debounceSearch))
        }
    }, [debounceSearch])

    return (
        <div className={styles.search}>
            <input
                value={value}
                onChange={(e) => onInputChange(e)}
                placeholder={'Найти пиццу...'}
            />
            <img className={styles.searchIcon} src={`${process.env.PUBLIC_URL}/search.png`}/>
            {search && <img onClick={() => dispatch(clearSearch())} className={styles.closeIcon}
                            src={`${process.env.PUBLIC_URL}/close.svg`}/>}
        </div>
    );
};

export default Search;