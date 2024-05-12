import {createSlice, PayloadAction} from '@reduxjs/toolkit'


type FilterStateType = {
    category: number,
    sort: 'rating' | 'price' | 'name',
    order: 'asc' | 'desc',
    search: string,
}

const initialState: FilterStateType = {
    category: 0,
    sort: 'rating',
    order: 'asc',
    search: '',
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
        setSearch(state, action: PayloadAction<string>){
            state.search = action.payload
        },
        clearSearch(state){
            state.search = ''
        },
        setParams(state, action: PayloadAction<{category: number, sort: 'rating' | 'price' | 'name'}>){
            state.category = Number(action.payload.category)
            state.sort = action.payload.sort
        }
    },
})

export const { setCategory, setOrder, setSort, setSearch, clearSearch, setParams } = filterSlice.actions
export default filterSlice