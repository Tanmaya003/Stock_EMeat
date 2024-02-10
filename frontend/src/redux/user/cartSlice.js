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
            // console.log(...action.payload)
            state.cart=action.payload ;
            state.error=null
        },
        upadteCartSuccess:(state,action)=>{
            
            state.cart={...state.cart , address:action.payload}
        },
        storeCartFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
        deleteCartstore:(state,action)=>{
            state.cart=null;
        }}
    }
)

export const {storeCartStart,storeCartSuccess,storeCartFail,deleteCartstore,upadteCartSuccess} = cartSlice.actions;
export default cartSlice.reducer;