import {createSlice, PayloadAction} from '@reduxjs/toolkit'


type SortStateType = {
    sort: 'rating' | 'price' | 'name',
    order: 'desc' | 'asc'
}

const initialState: SortStateType = {
    sort: 'rating',
    order: 'asc',
}

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
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
    },
})

export const { setSort, setOrder } = sortSlice.actions
export default sortSlice