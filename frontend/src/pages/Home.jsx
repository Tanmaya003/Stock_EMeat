import React, { useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import Card1 from "../components/Card1";

export default function Home() {
  const [data,setData]= useState([])
  const images = [
    { url: "https://emeat.in/wp-content/uploads/2023/08/1-1024x438-1.png" },
    { url: "https://emeat.in/wp-content/uploads/2023/08/2-1024x438-1.png" },
    { url: "https://emeat.in/wp-content/uploads/2023/08/3-1024x438-1.png" },
  ];
console.log(data)

  const showMeatCatagory=async()=>{
    try {
      const res= await fetch('/api/product/getProducts');
      const datas= await res.json();
      if(datas.success=== 'false'){
        console.log('error happened')
        return;
      }
      console.log(datas)
      setData(datas)
    } catch (error) {
      console.log(error)
    }
  }

  useState(()=>{
    showMeatCatagory();
  },[])
  return (
    <div className="p-10 px-24 flex flex-col gap-5">
      <div className="mx-auto bg-blue-300 shadow-xl">
        <SimpleImageSlider
          width={1250}
          height={400}
          images={images}
          showBullets={true}
          showNavs={false}
          autoPlay={true}
          autoPlayDelay={4.0}
          slideDuration={0.7}
          
        />
      </div>
      <div className="p-10 flex flex-wrap gap-5">
          {data.map((info,index)=>{
            console.log(info)
            return(
              <div key={info._id} >
              <Card1 props={info} className='w-full h-full'/> </div>
            )
          })}
      </div>
      <div></div>
    </div>
  );
}
