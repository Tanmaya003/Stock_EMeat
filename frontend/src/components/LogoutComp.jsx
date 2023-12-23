import React from 'react'
import { useDispatch } from 'react-redux';
import { signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function LogoutComp() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleSignout=async ()=>{
        try {
          dispatch(signOutUserStart())
          const res= await fetch('/api/auth/signout');
        const data=await res.json();
        if(data.success===false){
          dispatch(signOutUserFailure(data.message))
          return;
        }
        navigate('/signup')
        dispatch(signOutUserSuccess(data))
        
        } catch (error) {
          dispatch(signOutUserFailure(error.message))
        }
      }
  return (
    <div className='flex flex-col gap-4 justify-center items-center font-semibold text-slate-500 font-we'>
        Are you sure to sign out ?
        <button onClick={handleSignout}
         className='text-white w-24 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'> 
         Signout </button>
       </div>
  )
}
