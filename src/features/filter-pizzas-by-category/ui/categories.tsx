import React, {useEffect} from 'react';
import '../../../app/Styles/scss/_variables.scss'
import '../../../app/Styles/scss/app.scss'
import {setCategory} from "../../../app/Redux/Slices/filterSlice";
import {useAppDispatch, useAppSelector} from "../../../app/Redux/Types/types";
import {categorySelector, searchSelector} from "../model/selectors";
import {categories} from "../model/categories";

export const Categories: React.FC = () => {
    const category = useAppSelector(categorySelector)
    const search = useAppSelector(searchSelector)

    const [activeCategory, setActiveCategory] = React.useState<number>(category)

    const dispatch = useAppDispatch()
    const onClickCategory = (index: number) => {
        setActiveCategory(index)
        dispatch(setCategory(index))
    }

    useEffect(() => {
        if (search != ''){
            setActiveCategory(0)
            dispatch(setCategory(0))
        }
    }, [search])



    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => <li onClick={() => onClickCategory(index)} className={activeCategory === index ? "active" : ''} key={index}>{category}</li>)}
            </ul>
        </div>

    )
};