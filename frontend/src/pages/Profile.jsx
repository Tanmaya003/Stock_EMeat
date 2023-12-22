import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { style } from '../style';
import { signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice';

export default function Profile() {
  const [id,setId]=useState('dashboard');
  const userdata=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const {loading,currentUser,failure}=userdata 
  console.log(currentUser)
  const navigate=useNavigate();
  console.log(id)
  useEffect(()=>{
    if(!currentUser)
    {navigate('/signup')}
  },[])

  const handleClick=(e)=>{
    console.log(e.target.id)
    setId(e.target.id)
  }
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

  return (<>
     <div className='p-5 flex flex-col gap-5'>
      <section className='flex gap-4 uppercase justify-center items-center text-slate-400 font-bold cursor-pointer '>
        <div className={`${style.onActive}`} tabIndex='0' id='dashboard' onClick={handleClick}>Dashbord</div>
        <div className={`${style.onActive}`} tabIndex='0' id='orders' onClick={handleClick}>Orders</div>
        <div className={`${style.onActive}`} tabIndex='0' id='download' onClick={handleClick}>Download</div>
        <div className={`${style.onActive}`} tabIndex='0' id='address' onClick={handleClick}>Address</div>
        <div className={`${style.onActive}`} tabIndex='0' id='account' onClick={handleClick}>Account details</div>
        <div className={`${style.onActive}`} tabIndex='0' id='wishlist' onClick={handleClick}>Wishlist</div>
        <div className={`${style.onActive}`} tabIndex='0' id='logout' onClick={handleClick}>Logout</div>
      </section>
      {id=='dashboard'&& (<div>dashboard </div>)}
      {id=='orders'&& (<div>orders </div>)}
      {id=='download'&& (<div>download </div>)}
      {id=='address'&& (<div>address </div>)}
      {id=='account'&& (<div>account </div>)}
      {id=='wishlist'&& (<div>wishlist </div>)}
      {id=='logout'&& (<div className='flex flex-col gap-4 justify-center items-center font-semibold text-slate-500 font-we'>
        Are you sure to sign out ?
        <button onClick={handleSignout}
         className='text-white w-24 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'> 
         Signout </button>
      </div>)}
     </div>
  </>
   
  )
}
