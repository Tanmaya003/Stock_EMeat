import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function PaymentPage() {
  const [loadingg ,setLoading]=useState(false);
  const userdata= useSelector((state)=>state.user);
  const {currentUser}= userdata;
  const cartData= useSelector((state)=>state.cart)
  const {cart}=cartData

  const data ={
    name: currentUser.username,
    amount: cart.totalAmount,
    number: currentUser.phone,
    MUID: "MUID" + Date.now(),
    transactionId: 'T' + Date.now(),
              }
  console.log(data)
const handlePayment=(e)=>{
  e.preventDefault();
        setLoading(true);
        axios.post('http://localhost:3000/api/payment/start', {...data}).then(res => {  
        setTimeout(() => {
            setLoading(false);
        }, 1500);
        })
        .catch(error => {
            setLoading(false)
            console.error(error);
        });   
}
  return (
    <div className=' w-full h-5/6 absolute flex justify-center items-center '>
      <div className='w-80 h-60   bg-slate-300 border rounded-lg shadow-3xl border-slate-300 p-5'>
      <div >
            <form onSubmit={handlePayment} className='flex flex-col items-start gap-5 '>
                <div className=''>
                    <p className=''><strong>Name:</strong> {data.name}</p>
                </div>
                <div className=''>   
                    <p className=''><strong>Number:</strong> {data.number}</p>
                </div>
                <div className=''>
                    <p className=''><strong>Amount: </strong>Rs. {data.amount}</p>
                </div>
                {!loadingg? <div className=''>
                    
                    <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pay Now</button>
                </div>
                :
                <div className=''>
                    
                    <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pay Now
                    <div className="" role="status">
                        <span className=" ">Wait...</span>
                    </div>
                    </button>
                </div>
                }
            </form>
        </div>
      </div>
    </div>
  )
}
