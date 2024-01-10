import {createSlice} from '@reduxjs/toolkit';

const initialState= {
    loading : false,
    productCategorys: null,
    error:null
}

const productSlice=createSlice({
    name:'product',
    initialState,
    reducers:{
        storeCategoryStart:(state)=>{
            state.loading=true;
        },
        storeCategorySuccess:(state,action)=>{
            state.loading=false;
            state.productCategorys=action.payload;
            state.error=null
        },
        storeCategoryFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        }}
    }
)

export const {storeCategoryStart,storeCategorySuccess,storeCategoryFail} = productSlice.actions;
export default productSlice.reducer;