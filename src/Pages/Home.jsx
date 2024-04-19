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


const Home = () => {
    const navigate = useNavigate()

    const [pizzas, setPizzas] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(0)
    const isSearch = useRef(false)
    const isMounting = useRef(false)

    const dispatch = useDispatch()

    const category = useSelector((state) => state.filters.category)
    const sort = useSelector((state) => state.filters.sort)
    const order = useSelector((state) => state.filters.order)
    const search = useSelector(state => state.filters.search)

    const fetchPizza = () => {
        setIsLoading(true)
        fetch(`https://65d37906522627d50108f9e4.mockapi.io/pizzas?p=${currentPage + 1}&l=${4}&${category ? `category=${category}` : ''}${sort ? `&sortBy=${sort}` : ''}${order ? `&order=${order}` : ''}${search ? `&search=${search}` : ''}`)
            .then((response) => {
                return response.json()
            })
            .then(
                (json) => {
                    setPizzas(json)
                    setIsLoading(false)
                }
            )
    }

    const handelOrderClick = () => {
        dispatch(setOrder())
    }




    useEffect(() => {
        if (!isSearch.current) {
            fetchPizza()
        }
       isSearch.current = false
    }, [category, sort, order, search, currentPage])

    useEffect(() => {
        if(window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            console.log(params)
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
                {pizzas.length > 0 || isSearch.current ? (isLoading ? [...new Array(8)].map((_, index) => <PizzaSkeleton key={index}/>)
                        : pizzas.map(pizza => <PizzaBlock {...pizza} key={pizza.id}/>)) :
                    <b>Поиск не дал результатов :(</b>}
            </div>
            <Paginator currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
    </>
};

export default Home;