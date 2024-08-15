import React, {useEffect, useRef} from 'react';
import qs from 'qs'

import PizzaSkeleton from "../../../shared/ui/Skeleton/SkeletonPizzaItem";
import '../../../app/App/App.css';
import '../../../app/Styles/scss/_variables.scss'
import '../../../app/Styles/scss/app.scss'
import {setOrder, setParams} from "../../../app/Redux/Slices/filterSlice";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/Redux/Types/types";
import {filtersSelector, pizzasSelector} from "../model/selectors";
import {fetchPizzas} from "../../../entities/pizza/api/get-pizzas";
import {Button} from "../../../features/add-pizza-to-cart/ui/button";
import {SelectPizzaOptions} from "../../../features/select-pizza-options/ui/select-pizza-options";
import {PizzaItem} from "../../../entities/pizza/ui/pizzas/pizza-item";
import {Paginator} from "../../../features/pagination/ui/paginator";
import {Sort} from "../../../features/sort-pizzas/ui/sort";
import {Categories} from "../../../features/filter-pizzas-by-category/ui/categories";

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
                                                                             ButtonAddItem={Button}
                                                                             ParametersSelectionBlock={SelectPizzaOptions}
                                                                             key={pizza.id}/>)}
            </div>
            {pizzas.status === 'success' && <Paginator/>}
        </div>
    </>
};

export default Main;