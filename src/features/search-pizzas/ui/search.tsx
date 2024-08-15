import React, {useEffect, useRef, useState} from 'react';

import styles from './search.module.scss'
import {setSearch, clearSearch} from "../../../app/Redux/Slices/filterSlice";
import {useDebounce} from "../../../shared/lib/useDebounce";
import {useAppDispatch, useAppSelector} from "../../../app/Redux/Types/types";
import {categorySelector, searchSelector, statusSelector} from "../model/selectors";

export const Search: React.FC = () => {
    const dispatch = useAppDispatch()

    const search = useAppSelector(searchSelector)
    const category = useAppSelector(categorySelector)

    const status = useAppSelector(statusSelector)

    const [value, setValue] = useState<string>(search)

    const debounceSearch = useDebounce(value, 250)

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const onClearClick = () => {
        dispatch(clearSearch())
        setValue('')
    }

    useEffect(() => {
        if (debounceSearch !== search) {
            dispatch(setSearch(debounceSearch))
        }
    }, [debounceSearch])

    useEffect(() => {
        if (search === '' && value){
            setValue('')
        }
    }, [search])

    useEffect(() => {
        if (status === 'error') {
            dispatch(clearSearch())
            setValue('')
        }
    }, [category])

    return (
        <div className={styles.search}>
            <input
                value={value}
                onChange={(e) => onInputChange(e)}
                placeholder={'Найти пиццу...'}
            />
            <img className={styles.searchIcon} src={`${process.env.PUBLIC_URL}/search.png`}/>
            {search && <img onClick={() => onClearClick()} className={styles.closeIcon}
                            src={`${process.env.PUBLIC_URL}/close.svg`}/>}
        </div>
    );
};