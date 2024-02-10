import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const userdata=useSelector((state)=>state.user);
  const {loading,currentUser,failure}=userdata 
  // console.log(currentUser)
  return (
    <div className='text-start font-md'>
        Hello {currentUser.username} <br />
        Our user-friendly interface ensures a seamless and efficient experience. Navigate through features effortlessly and focus on growing your business without the hassle.
        <br />
        From your account dashboard you can view your  <Link className='text-yellow-600 cursor-pointer' to={'/profile/orders'} > recent orders, </Link> 
         manage your shipping and billing <Link className='text-yellow-600 cursor-pointer' to={'/profile/address'}>addresses,</Link>  and edit your password and 
         <Link className='text-yellow-600 cursor-pointer' to={'/profile/account'}> account</Link> details.
      </div>
  )
}
