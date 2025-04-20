import {createSlice, PayloadAction} from '@reduxjs/toolkit'


type CategoriesType = {
    category: number,
}

const initialState: CategoriesType = {
    category: 0,
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategory(state, action) {
            state.category = action.payload
        },
    },
})

export const { setCategory } = categoriesSlice.actions
export default categoriesSlice