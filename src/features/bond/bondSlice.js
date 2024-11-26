import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    numberOfActiveBond: 0,
    numberOfInactiveBond: 0,
    loading: false,
    bonds: [],
    error: ''
}

export const fetchBonds = createAsyncThunk('bond/fetchBonds', () => {
    return axios.get('https://localhost:7109/api/bond/getBondsData')
        .then(response => response.data)
});
const bondSlice = createSlice({
    name: 'bond',
    initialState: initialState,
    extraReducers: builder => {
        builder.addCase(fetchBonds.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchBonds.fulfilled,(state,action)=>{
            state.loading = false
            state.bonds = action.payload
        })
        builder.addCase(fetchBonds.error,(state,action)=>{
            state.loading = false;
            state.bonds = []
            state.error = ''
        })
    }
})

export default bondSlice.reducer;