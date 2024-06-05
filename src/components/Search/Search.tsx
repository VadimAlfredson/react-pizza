import React, {useEffect, useRef, useState} from 'react';

import styles from './Search.module.scss'
import {setSearch, clearSearch} from "../../Redux/Slices/filterSlice";
import {useDebounce} from "../../CustomHooks/useDebounce";
import {useAppDispatch, useAppSelector} from "../../types/types";
import {filtersSelector, pizzasSelector} from "../../Redux/Selectors";

const Search: React.FC = () => {
    const dispatch = useAppDispatch()

    const filters = useAppSelector(filtersSelector)

    const pizzas = useAppSelector(pizzasSelector)

    const [value, setValue] = useState<string>(filters.search)

    const debounceSearch = useDebounce(value, 250)

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        /*dispatch(setSearch(e.target.value))*/
    }

    const onClearClick = () => {
        dispatch(clearSearch())
        setValue('')
    }

    useEffect(() => {
        if (debounceSearch !== filters.search) {
            dispatch(setSearch(debounceSearch))
        }
    }, [debounceSearch])

    useEffect(() => {
        if (filters.search === '' && value){
            setValue('')
        }
    }, [filters.search])

    useEffect(() => {
        if (pizzas.status === 'error') {
            dispatch(clearSearch())
            setValue('')
        }
    }, [filters.category])

    return (
        <div className={styles.search}>
            <input
                value={value}
                onChange={(e) => onInputChange(e)}
                placeholder={'Найти пиццу...'}
            />
            <img className={styles.searchIcon} src={`${process.env.PUBLIC_URL}/search.png`}/>
            {filters.search && <img onClick={() => onClearClick()} className={styles.closeIcon}
                            src={`${process.env.PUBLIC_URL}/close.svg`}/>}
        </div>
    );
};

export default Search;