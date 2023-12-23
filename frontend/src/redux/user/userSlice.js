import {createSlice} from '@reduxjs/toolkit';

const initialState= {
    loading : false,
    currentUser: null,
    error:null
}

const userSlice= createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
        },
        signInSuccess: (state,action)=>{
            state.loading=false;
            state.currentUser=action.payload;
            state.error=null
        },
        signInFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        signOutUserStart:(state)=>{
            state.loading=true;
        },
        signOutUserSuccess:(state)=>{
            state.loading=false;
            state.currentUser=null;
            state.error=null;
        },
        signOutUserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        updateUserStart:(state)=>{
            state.loading=true;
        },
        updateUserSuccess:(state)=>{
            state.loading=false;
            state.currentUser=null;
            state.error=null;
        },
        updateUserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        promoteUserStart:(state)=>{
            state.loading=true;
        },
        promoteUserSuccess:(state)=>{
            state.loading=false;
            state.currentUser=null;
            state.error=null;
        },
        promoteUserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        demoteUserStart:(state)=>{
            state.loading=true;
        },
        demoteUserSuccess:(state)=>{
            state.loading=false;
            state.currentUser=null;
            state.error=null;
        },
        demoteUserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
    }
})

export const {signInStart,signInSuccess,signInFailure,signOutUserStart,signOutUserSuccess,signOutUserFailure,updateUserStart,updateUserSuccess,updateUserFailure,
    promoteUserStart,promoteUserSuccess,promoteUserFailure ,demoteUserStart,demoteUserSuccess,demoteUserFailure
} = userSlice.actions

export default userSlice.reducer;