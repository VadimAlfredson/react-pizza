import React, {useEffect} from 'react';
import '../scss/_variables.scss'
import '../scss/app.scss'
import {useDispatch} from "react-redux";
import {setCategory} from "../Redux/Slices/filterSlice";
import {useAppDispatch, useAppSelector} from "../types/types";
import {filtersSelector} from "../Redux/Selectors";

const categories: Array<string> = ['Все', "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые" ]
const Categories: React.FC = () => {
    const filters = useAppSelector(filtersSelector)
    const [activeCategory, setActiveCategory] = React.useState<number>(filters.category)

    const dispatch = useAppDispatch()
    const onClickCategory = (index: number) => {
        setActiveCategory(index)
        dispatch(setCategory(index))
    }

    useEffect(() => {
        if (filters.search != ''){
            setActiveCategory(0)
            dispatch(setCategory(0))
        }
    }, [filters.search])



    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => <li onClick={() => onClickCategory(index)} className={activeCategory === index ? "active" : ''} key={index}>{category}</li>)}
            </ul>
        </div>

    )
};

export default Categories;