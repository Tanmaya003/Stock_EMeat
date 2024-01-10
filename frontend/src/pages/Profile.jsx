import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { style } from '../style';
import { FaBars } from 'react-icons/fa';


export default function Profile() {
  const [id,setId]=useState('dashboard');
  const userdata=useSelector((state)=>state.user);
  const {loading,currentUser,failure}=userdata ;
  const [handeller,setHandeller]=useState(false)
  const [hide, sethidemangaer] = useState(true);
  const location=useLocation();
  const [lastName,setLastName]=useState('dashboard')


  const lastWord = location.pathname.split('/').pop();
  console.log(lastWord)
  console.log(currentUser)
  const navigate=useNavigate();
  console.log(id)
  useEffect(()=>{
    if(!currentUser) {navigate('/signup')}
    if(currentUser.usertype === 'admin' || currentUser.usertype ==='employee'){ setHandeller(true)}
    
  },[])
 
  useEffect(()=>{
    const lastWord = location.pathname.split('/').pop();
    // console.log(lastWord)
    if(lastWord === 'profile'){
      setLastName('dashboard')
    }
    else{
      setLastName(lastWord)
    }
    
  },[location])
  const handleClick=(e)=>{
    console.log(e.target.id)
    setId(e.target.id)
    
    if (e.target.id == "dashboard"){
      navigate('/profile')
      return(
        <div className='text-start font-md'>
        Hello {currentUser.username} <br />
        Our user-friendly interface ensures a seamless and efficient experience. Navigate through features effortlessly and focus on growing your business without the hassle.
        <br />
        From your account dashboard you can view your  <Link className='text-yellow-600 cursor-pointer' to={'/profile/orders'} > recent orders, </Link> 
         manage your shipping and billing addresses, and edit your password and account details.
      </div>
      )
    }
    else{
      navigate(`/profile/${e.target.id}`)
    }
  }
  
  const handleMenuBox=()=>{
    sethidemangaer(!hide)
  }
  return (<>
     <div className='p-5 flex flex-col gap-5'>
      <section className={`flex gap-4 uppercase justify-start items-start text-slate-400 font-bold cursor-pointer ${style.manageLarge}`}>
        <div className=' sm:hidden'>
         <div className='flex items-center gap-2 '>
          <span><FaBars onClick={handleMenuBox} className="text-sm text-yellow-600 font-bold" /></span>
          <span className='text-slate-500'>Manage</span>
         </div>
         {hide && (<div className='absolute left-5 z-1 w-[100px] text-[12px] p-2 bg-yellow-100 text-slate-500 flex flex-col gap-1' onClick={handleMenuBox}>
           <div className={`${style.onActive2} shadow-md ${lastName === 'dashboard'?'text-yellow-600 ':""}`} tabIndex='0' id='dashboard' onClick={handleClick}>Dashbord</div>
           <div className={`${style.onActive2} shadow-md ${lastName === 'orders'?'text-yellow-600 ':""}`} tabIndex='0' id='orders' onClick={handleClick}>Orders</div>
           <div className={`${style.onActive2} shadow-md ${lastName === 'download'?'text-yellow-600 ':""}`} tabIndex='0' id='download' onClick={handleClick}>Download</div>
           <div className={`${style.onActive2} shadow-md ${lastName === 'address'?'text-yellow-600 ':""}`} tabIndex='0' id='address' onClick={handleClick}>Address</div>
           <div className={`${style.onActive2} shadow-md ${lastName === 'account'?'text-yellow-600 ':""}`} tabIndex='0' id='account' onClick={handleClick}>Account</div>
           <div className={`${style.onActive2} shadow-md ${lastName === 'wishlist'?'text-yellow-600 ':""}`} tabIndex='0' id='wishlist' onClick={handleClick}>Wishlist</div>
           <div className={`${style.onActive2} shadow-md ${lastName === 'logout'?'text-yellow-600 ':""}`} tabIndex='0' id='logout' onClick={handleClick}>Logout</div>
           {handeller && <div className={`${style.onActive2} shadow-md ${lastName === 'handeller'?'text-yellow-600 ':""}`} tabIndex='0' id='handeller' onClick={handleClick}>HandleData</div>}
         </div>)}
        </div>
        <div className={`hidden sm:block sm:${style.onActive} ${lastName === 'dashboard'?'text-yellow-600 ':""}`} tabIndex='0' id='dashboard' onClick={handleClick}>Dashbord</div>
        <div className={`hidden sm:block sm:${style.onActive} ${lastName === 'orders'?'text-yellow-600 ':""}`} tabIndex='0' id='orders' onClick={handleClick}>Orders</div>
        <div className={`hidden sm:block sm:${style.onActive} ${lastName === 'download'?'text-yellow-600 ':""}`} tabIndex='0' id='download' onClick={handleClick}>Download</div>
        <div className={`hidden sm:block sm:${style.onActive} ${lastName === 'address'?'text-yellow-600 ':""}`} tabIndex='0' id='address' onClick={handleClick}>Address</div>
        <div className={`hidden sm:block sm:${style.onActive} ${lastName === 'account'?'text-yellow-600 ':""}`} tabIndex='0' id='account' onClick={handleClick}>Account details</div>
        <div className={`hidden sm:block sm:${style.onActive} ${lastName === 'wishlist'?'text-yellow-600 ':""}`} tabIndex='0' id='wishlist' onClick={handleClick}>Wishlist</div>
        <div className={`hidden sm:block sm:${style.onActive} ${lastName === 'logout'?'text-yellow-600 ':""}`} tabIndex='0' id='logout' onClick={handleClick}>Logout</div>
        {handeller && <div className={`hidden sm:block sm:${style.onActive} ${lastName === 'handeller'?'text-yellow-600 ':""} `} tabIndex='0' id='handeller' onClick={handleClick}>HandleData</div>}
      </section>
      <div><Outlet /></div>
      
     </div>
  </>
   
  )
}
