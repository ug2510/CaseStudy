import { configureStore } from "@reduxjs/toolkit";
import equityReducer from '../features/equity/equitySlice'
import bondReducer from '../features/bond/bondSlice'

const store = configureStore({
    reducer : {
        equity : equityReducer,
        bond : bondReducer
    }
})

export default store