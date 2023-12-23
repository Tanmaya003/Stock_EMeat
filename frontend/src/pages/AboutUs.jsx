import React from 'react'

export default function AboutUs() {
    //https://www.medallionlabs.com/wp-content/uploads/2019/07/protein-digestibility.jpg
  return (
    <div className='flex flex-col gap-10'>
    
        <div className="bg-cover bg-center h-[280px] flex flex-col items-center justify-center gap-6 inset-0  text-white " 
             style={{backgroundImage:"url('https://www.medallionlabs.com/wp-content/uploads/2019/07/protein-digestibility.jpg')",
             backgroundColor:'rgba(0,0,0,0.6)',
             backgroundBlendMode:'darken'
            }}>
            <div className='text-6xl font-bold ' >ABOUT STOCKeMEAT</div>
            <div className='text-md font-bold '>WE DELIVER A RANGE OF FRESH VEG & NON-VEG PRODUCTS TO YOUR HOME IN ONE CLICK.</div>
        </div>
        <div className='flex px-28 gap-10 '>
            <div className='rounded-lg w-1/2'>
                <img className='w-full h-full object-cover rounded-lg' src="https://emeat.in/wp-content/uploads/2023/08/black-yellow-food-menu-banner-1024x512.png" alt='image'/>
            </div>
            <div className='flex flex-col gap-5 items-start justify-start p-4 w-1/2'>
                <div className='font-bold text-slate-950 text-3xl'>About us</div>
                <div className='text-slate-950 font-semibold'>Good cuisine points everyone’s hearts in the right way, and we’re here to help you grab as many as you can! So, whenever our customers want to cook up a storm, they can simply get raw materials from us online to make your dishes show-stoppers!
                <br />
                <br />
                Given the hectic schedules of working people, our goal is to serve as many houses as possible. When you buy a variety of fresh meat, groceries, vegetables  online, you save time, patience, and a lot of effort when it comes to cleaning the dust and impurities that can be found at your local store.
                </div>
                <div> 
                <a href='tel:+91 8144362638' className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Call Us</a>
                </div>
            </div>
        </div>
        <div></div>
    </div>
  )
}
