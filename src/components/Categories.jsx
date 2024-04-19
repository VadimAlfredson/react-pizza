import React from 'react';
import '../scss/_variables.scss'
import '../scss/app.scss'
import {useDispatch} from "react-redux";
import {setCategory} from "../Redux/Slices/filterSlice";
const Categories = (props) => {
    const [activeCategory, setActiveCategory] = React.useState(0)

    const dispatch = useDispatch()
    const onClickCategory = (index) => {
        setActiveCategory(index)
        dispatch(setCategory(index))
    }

    const categories = ['Всё', "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые" ]

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => <li onClick={() => onClickCategory(index)} className={activeCategory === index ? "active" : ''} key={index}>{category}</li>)}
            </ul>
        </div>

    )
};

export default Categories;