import React, {useEffect, useRef} from 'react';
import qs from 'qs'

import Categories from "../../../features/Categories/ui/Categories";
import Sort from "../../../features/Sort/ui/Sort";
import PizzaSkeleton from "../../../shared/Skeleton/SkeletonPizzaItem";
import PizzaItem from "../../../entities/Pizza/ui/Pizzas/PizzaItem";
import '../../../app/App/App.css';
import '../../../app/Styles/scss/_variables.scss'
import '../../../app/Styles/scss/app.scss'
import Paginator from "../../../features/Paginator/ui/Paginator";
import {setOrder, setParams} from "../../../app/Redux/Slices/filterSlice";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/Redux/Types/types";
import {filtersSelector, pizzasSelector} from "../model/Selectors";
import {fetchPizzas} from "../api/getPizzas";
import ButtonAddItem from "../../../features/ButtonAddItem/ui/buttonAddItem";
import ParametersSelectionBlock from "../../../features/ParametersSelectionBlock/ui/ParametersSelectionBlock";

const categories: Array<string> = ['Все', "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"]


const Main: React.FC = () => {
    const navigate = useNavigate()

    const isSearch = useRef<boolean>(false)
    const isMounting = useRef<boolean>(false)

    const dispatch = useAppDispatch()

    const filters = useAppSelector(filtersSelector)
    const pizzas = useAppSelector(pizzasSelector)
    const handelOrderClick: () => void = () => {
        dispatch(setOrder())
    }

    console.log(pizzas)

    useEffect(() => {
        if (!isSearch.current) {
            dispatch(fetchPizzas(filters))
        }
        isSearch.current = false
    }, [filters.category, filters.sort, filters.order, filters.search])

    useEffect(() => {
        if (window.location.search) {
            //Вот тут хз с TS как
            const params: any = qs.parse(window.location.search.substring(1))
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
            navigate(`?${queryString}` + (filters.search ? `&search=${filters.search}` : ''))
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
                    : pizzas.status === 'error' ?
                        <b style={{width: '100%', textAlign: 'center', margin: 30}}>Поиск не дал результатов :(</b>
                        : pizzas.pizzasToCurrentPage.map(pizza => <PizzaItem pizza={pizza}
                                                                             ButtonAddItem={ButtonAddItem}
                                                                             ParametersSelectionBlock={ParametersSelectionBlock}
                                                                             key={pizza.id}/>)}
            </div>
            {pizzas.status === 'success' && <Paginator/>}
        </div>
    </>
};

export default Main;