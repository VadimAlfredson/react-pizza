import React, {useEffect, useRef} from 'react';
import qs from 'qs'

import PizzaSkeleton from "../../../shared/ui/Skeleton/SkeletonPizzaItem";
import '../../../app/App/App.css';
import '../../../app/Styles/scss/_variables.scss'
import '../../../app/Styles/scss/app.scss'
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/Redux/Types/types";
import {orderSelector, pizzasSelector, searchSelector, sortSelector} from "../model/selectors";
import {fetchPizzas} from "../../../entities/pizza/api/get-pizzas";
import {Button} from "../../../features/add-pizza-to-cart/ui/button";
import {PizzaOptionsBlock} from "../../../features/select-pizza-options/ui/pizza-options-block";
import {PizzaItem} from "../../../entities/pizza/ui/pizzas/pizza-item";
import {Paginator} from "../../../shared/pagination/ui/paginator";
import {Sort} from "../../../features/sort-pizzas/ui/sort";
import {Categories} from "../../../features/filter-pizzas-by-category/ui/categories";
import {currentPageSelector, totalCountSelector} from "../../../entities/pizza/model/read-all/selectors";
import {getPizzasToPage} from "../../../entities/pizza/model/read-all/pizzas-slice";
import {categorySelector} from "../../../features/search-pizzas/model/selectors";
import {setOrder, setSort} from "../../../features/sort-pizzas/model/sort-slice";
import {setCategory} from "../../../features/filter-pizzas-by-category/model/categories-slice";

const categories: Array<string> = ['Все', "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"]


const Main: React.FC = () => {
    const navigate = useNavigate()

    const isSearch = useRef<boolean>(false)
    const isMounting = useRef<boolean>(false)

    const dispatch = useAppDispatch()

    //const filters = useAppSelector(filtersSelector)
    const sort = useAppSelector(sortSelector)
    const order = useAppSelector(orderSelector)
    const search = useAppSelector(searchSelector)
    const category = useAppSelector(categorySelector)
    const pizzas = useAppSelector(pizzasSelector)
    const handelOrderClick: () => void = () => {
        dispatch(setOrder())
    }

    const currentPage = useAppSelector(currentPageSelector)
    const totalCount = useAppSelector(totalCountSelector)

    const onPageClick = (pageNumber: number) => {
        dispatch(getPizzasToPage(pageNumber))
    }

    const paramsReader = (params: { category: number, sort: 'rating' | 'price' | 'name' }) => {
        dispatch(setSort(params.sort))
        dispatch(setCategory(params.category))
    }

    useEffect(() => {
        if (!isSearch.current) {
            dispatch(fetchPizzas({category, sort, order, search}))
        }
        isSearch.current = false
    }, [category, sort, order, search])

    useEffect(() => {
        if (window.location.search) {
            //Вот тут хз с TS как
            const params: any = qs.parse(window.location.search.substring(1))
            paramsReader(params)
            isSearch.current = true
        }
    }, [])


    useEffect(() => {
        if (isMounting.current) {
            const queryString = qs.stringify({
                category: category,
                currentPage: pizzas.currentPage,
                sort: sort
            })
            navigate(`?${queryString}` + (search ? `&search=${search}` : ''))
        }
        isMounting.current = true
    }, [category, sort, order, search, pizzas.currentPage])

    return <>
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort Order={handelOrderClick}/>
            </div>
            <h2 className="content__title">{categories[category]} пиццы</h2>
            <div className="content__items">
                {pizzas.status === 'pending' ? [...new Array(8)].map((_, index) => <PizzaSkeleton key={index}/>)
                    : pizzas.status === 'error' ?
                        <b style={{width: '100%', textAlign: 'center', margin: 30}}>Поиск не дал результатов :(</b>
                        : pizzas.pizzasToCurrentPage.map(pizza => <PizzaItem pizza={pizza}
                                                                             ButtonAddItem={Button}
                                                                             ParametersSelectionBlock={PizzaOptionsBlock}
                                                                             key={pizza.id}/>)}
            </div>
            {pizzas.status === 'success' &&
                <Paginator currentPage={currentPage} totalCount={totalCount} onPageClick={onPageClick}/>}
        </div>
    </>
};

export default Main;