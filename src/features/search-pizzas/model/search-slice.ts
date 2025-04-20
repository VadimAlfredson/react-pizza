import {createSlice, PayloadAction} from '@reduxjs/toolkit'


type SearchStateType = {
    search: string,
}

const initialState: SearchStateType = {
    search: '',
}

const searchSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>){
            state.search = action.payload
        },
        clearSearch(state){
            state.search = ''
        },
    },
})

export const { setSearch, clearSearch } = searchSlice.actions
export default searchSlice