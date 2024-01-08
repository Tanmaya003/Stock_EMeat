import React from 'react'

export default function Card1({props}) {
 
//  const {category,countInStock,description,image,name,numReviews,rating,_id}= info;

  return (
    <div className='h-72 w-52 border-2 border-gray-200 shadow-sm rounded-lg overflow-hidden hover:shadow-xl cursor-pointer'>
        <img src={props.image} className='w-full h-2/3 object-cover hover:opacity-75 rounded-lg'/>
        <div className='text-center pt-5 text-slate-600 font-semibold'>{props.category}</div>
    </div>
  )
}
