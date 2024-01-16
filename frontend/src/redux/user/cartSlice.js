import {createSlice} from '@reduxjs/toolkit';

const initialState= {
    loading : false,
    cart: null,
    error:null
}

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        storeCartStart:(state)=>{
            state.loading=true;
        },
        storeCartSuccess:(state,action)=>{
            state.loading=false;
            state.cart=action.payload;
            state.error=null
        },
        storeCartFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        }}
    }
)

export const {storeCartStart,storeCartSuccess,storeCartFail} = cartSlice.actions;
export default cartSlice.reducer;