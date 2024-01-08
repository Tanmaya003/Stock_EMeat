import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Card2({data}) {
    const [isStock,setIsStock]=useState(true)
    const navigate=useNavigate();
    console.log("list")
    console.log(data)

    useEffect(()=>{
        let hasStock= false;
        for(let i=0; i<=data.weightPriceData.length-1;i++){
            if(data.weightPriceData[i].countInStock > 0){
                hasStock=true;
                break;
            }
        }
        setIsStock(hasStock)
    },[data])
const selectProduct=()=>{
    navigate(`/product/${data._id}`)
}
  return (
    <div className='flex group flex-col gap-4 w-1/4 h-80 bg-white rounded-lg z-0 hover:border-[1px] hover:border-slate-400 p-4 pb-0 hover:scale-y-110 hover:transition  hover:z-10'>
        <div className='w-full h-2/5 overflow-hidden object-cover bg-red-400 group-hover:block group-hover:transform group-hover:scale-110'><img src={data.image}  /></div>
        <div className='h-16 font-bold text-slate-900 group-hover:block group-hover:h-10 '>{data.name}</div>
        <div className='group-hover:block'>{isStock?(<div className='font-semibold text-green-900'>In stock </div>):(<div className='font-semibold text-red-800'>Out of stock </div>)}</div>
        <div className='font-semibold text-slate-800 group-hover:block'>&#8377;{data.weightPriceData[0].price} - &#8377;{data.weightPriceData[1].price}</div>
        <div className='hidden  group-hover:block text-center'>
        <button type="button" 
        onClick={selectProduct}
        className="text-gray-900 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-500 hover:bg-gradient-to-br  dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Select</button>
        </div>
    </div>
  )
}
