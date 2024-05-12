import React, {useEffect, useState, useRef} from 'react';
import qs from 'qs'

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";

import '../App.css';
import '../scss/_variables.scss'
import '../scss/app.scss'
import Paginator from "../components/Paginator/Paginator";
import {useDispatch, useSelector} from "react-redux";
import {setOrder, setParams} from "../Redux/Slices/filterSlice";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {fetchPizzas, ThunkArgumentsType} from "../Redux/Slices/pizzasSlice";
import {useAppDispatch, useAppSelector} from "../types/types";


const Home: React.FC = () => {
    const navigate = useNavigate()

    const isSearch = useRef<boolean>(false)
    const isMounting = useRef<boolean>(false)

    const dispatch = useAppDispatch()

    const category = useAppSelector((state) => state.filters.category)
    const sort = useAppSelector((state) => state.filters.sort)
    const order = useAppSelector((state) => state.filters.order)
    const search = useAppSelector(state => state.filters.search)
    const pizzas = useAppSelector(state => state.pizzas.pizzasToCurrentPage)
    const fetchStatus = useAppSelector(state => state.pizzas.status)
    const currentPage = useAppSelector(state => state.pizzas.currentPage)
    const handelOrderClick: () => void = () => {
        dispatch(setOrder())
    }


    useEffect(() => {
        if (!isSearch.current) {
            /*fetchPizza()*/
            dispatch(fetchPizzas({category, sort, order, search}))
        }
        isSearch.current = false
    }, [category, sort, order, search])

    useEffect(() => {
        if (window.location.search) {
            //разберись после
            const params: any = qs.parse(window.location.search.substring(1))
            dispatch(setParams(params))
            isSearch.current = true
        }

    }, [])

    useEffect(() => {
        if (isMounting.current) {
            const queryString = qs.stringify({
                category,
                currentPage,
                sort,
            })
            navigate(`?${queryString}`)
        }
        isMounting.current = true
    }, [category, sort, order, search, currentPage])


    return <>
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort Order={handelOrderClick}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {fetchStatus === 'pending' ? [...new Array(8)].map((_, index) => <PizzaSkeleton key={index}/>)
                    : fetchStatus === 'error' ? <b>Поиск не дал результатов :(</b>
                        : pizzas.map(pizza => <PizzaBlock {...pizza} key={pizza.id}/>)}
            </div>
            <Paginator/>
        </div>
    </>
};

export default Home;