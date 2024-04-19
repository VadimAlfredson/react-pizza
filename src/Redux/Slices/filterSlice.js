import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    category: 0,
    sort: 'rating',
    order: 'asc',
    search: '',
    currentPage: 1
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategory(state, action) {
            state.category = action.payload
        },
        setSort(state, action) {
            switch (action.payload){
                case 0: return {...state, sort: 'rating'}
                case 1: return {...state, sort: 'price'}
                case 2: return {...state, sort: 'name'}
                default: return {...state, sort: 'rating'}
            }
        },
        setOrder(state) {
            state.order = state.order === 'asc' ? 'desc' : 'asc'
        },
        setSearch(state, action){
            debugger
            state.search = action.payload
        },
        clearSearch(state){
            state.search = ''
        },
        setParams(state, action){
            state.category = Number(action.payload.category)
            state.sort = action.payload.sort
            state.currentPage = Number(action.payload.currentPage)
        }
    },
})

export const { setCategory, setOrder, setSort, setSearch, clearSearch, setParams } = filterSlice.actions
export default filterSlice.reducer