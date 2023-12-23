import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice';
import { json } from 'react-router-dom';

export default function Account() {
  const [formdata,setFormdata]=useState({});
  const [err,setErr]=useState(false)
  const {currentUser,error,loading}= useSelector((state)=>state.user)
  const dispatch=useDispatch()
  console.log(formdata)
  const handleChange=(e)=>{
    setFormdata({...formdata, [e.target.id]:e.target.value})
  }
  const handleupdate=async (e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart())
      // if(formdata.password2 != formdata.password3){
      //   dispatch(updateUserFailure("Password Mismatch , Please enter same password for rest"))
      //   console.log('password mismatch error')
      //   return
      // }
      const res= await fetch(`/api/user/update/${currentUser._id}`,{
        method: 'POST',
        headers:{'Content-type':'application/json'},
        body: JSON.stringify(formdata)
      })
      const data= await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message))
        return
      }

      dispatch(updateUserSuccess(data))
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }
  return (
    <div className=" flex justify-center items-center pt-5 ">
            <div className=" h-full w-3/5 flex flex-col justify-center gap-8 ">
              <div className="font-bold text-2xl">Account Details</div>
              {err && (<div>{error} </div>)}
              <form className="flex flex-col justify-center items-start  gap-5" onSubmit={handleupdate}>
                <label>Enter your user name</label>
                <input
                  type="text"
                  id='username'
                  placeholder="UserName"
                  onChange={handleChange}
                  defaultValue={currentUser.username}
                  className="bg-slate-200 w-full rounded-md p-2 text-sm focus:outline-none"
                />
                <label>Enter your Email</label>
                <input
                  type="text"
                  id='email'
                  placeholder="Email"
                  onChange={handleChange}
                  defaultValue={currentUser.email}
                  className="bg-slate-200 w-full rounded-md p-2 text-sm focus:outline-none"
                />
                

                <div className="text-lg font-semibold">
                  Do you want to update password ?
                </div>
                <label>Enter your current Password</label>
                <input
                  type="password"
                  id='password'
                  onChange={handleChange}
                  placeholder="current Password"
                  className="bg-slate-200 w-full rounded-md p-2 text-sm focus:outline-none"
                />
                 <label>Enter your updated password</label>
                <input
                  type="password"
                  id='password2'
                  onChange={handleChange}
                  placeholder="Make some strong password"
                  className="bg-slate-200 w-full rounded-md p-2 text-sm focus:outline-none"
                />
                 <label>Re-Enter your updated Password</label>
                <input
                  type="password"
                  id='password3'
                  onChange={handleChange}
                  placeholder="Make some strong password"
                  className="bg-slate-200 w-full rounded-md p-2 text-sm focus:outline-none"
                />
                <button
                  type="submit"
                  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Save Changes
                </button>
              </form>
            </div>
    </div>
  )
}
