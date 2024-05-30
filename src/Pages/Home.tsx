import React, {useEffect, useRef} from 'react';
import qs from 'qs'

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import '../App.css';
import '../scss/_variables.scss'
import '../scss/app.scss'
import Paginator from "../components/Paginator/Paginator";
import {setOrder, setParams} from "../Redux/Slices/filterSlice";
import {useNavigate} from "react-router-dom";
import {fetchPizzas} from "../Redux/Slices/pizzasSlice";
import {useAppDispatch, useAppSelector} from "../types/types";
import {filtersSelector, pizzasSelector} from "../Redux/Selectors";

const categories: Array<string> = ['Все', "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые" ]


const Home: React.FC = () => {
    const navigate = useNavigate()

    const isSearch = useRef<boolean>(false)
    const isMounting = useRef<boolean>(false)

    const dispatch = useAppDispatch()

    const filters = useAppSelector(filtersSelector)
    const pizzas = useAppSelector(pizzasSelector)
    const handelOrderClick: () => void = () => {
        dispatch(setOrder())
    }


    useEffect(() => {
        if (!isSearch.current) {
            /*fetchPizza()*/
            dispatch(fetchPizzas({category: filters.category, sort: filters.sort, order: filters.order, search: filters.search}))
        }
        isSearch.current = false
    }, [filters.category, filters.sort, filters.order, filters.search])

    useEffect(() => {
        if (window.location.search) {
            //Вот тут хз с TS как
            const params: any = qs.parse(window.location.search.substring(1))
            console.log(params)
            dispatch(setParams(params))
            isSearch.current = true
        }

    }, [])

    useEffect(() => {
        if (isMounting.current) {
            const queryString = qs.stringify({
                category: filters.category,
                currentPage: pizzas.currentPage,
                sort: filters.sort
            })
            navigate(`?${queryString}` +(filters.search ? `search=${filters.search}` : ''))
        }
        isMounting.current = true
    }, [filters.category, filters.sort, filters.order, filters.search, pizzas.currentPage])


    return <>
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort Order={handelOrderClick}/>
            </div>
            <h2 className="content__title">{categories[filters.category]} пиццы</h2>
            <div className="content__items">
                {pizzas.status === 'pending' ? [...new Array(8)].map((_, index) => <PizzaSkeleton key={index}/>)
                    : pizzas.status === 'error' ? <b style={{width: '100%', textAlign: 'center', margin: 30}}>Поиск не дал результатов :(</b>
                        : pizzas.pizzasToCurrentPage.map(pizza => <PizzaBlock {...pizza} key={pizza.id}/>)}
            </div>
            <Paginator/>
        </div>
    </>
};

export default Home;