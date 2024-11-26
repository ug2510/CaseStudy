import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    numberOfActiveEquity:0,
    numberOfInactiveEquity:0,
    loading:false,
    equities:[],
    error:''
}

export const fetchEquities = createAsyncThunk('equity/fetchEquities',()=>{
    return axios.get('https://localhost:7109/api/equity/getEquityData')
    .then(response=>response.data)
});
const equitySlice = createSlice({
    name : 'equity',
    initialState : initialState,
    extraReducers : builder =>{
        builder.addCase(fetchEquities.pending,state=>{
            state.loading = true
        })
        builder.addCase(fetchEquities.fulfilled,(state,action)=>{
            state.loading = false
            state.equities = action.payload
        })
        builder.addCase(fetchEquities.rejected,(state,action)=>{
            state.loading = true
            state.equities = []
            state.error = action.error.message
        })
    }
})

export default equitySlice.reducer;