import React, { useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import Card1 from "../components/Card1";
import { useDispatch, useSelector } from "react-redux";
import { storeCategoryFail, storeCategoryStart, storeCategorySuccess } from "../redux/user/productSlice";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [data,setData]= useState([])
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const productCategoryData= useSelector((state)=>state.product)
  const {loading,productCategorys,error}=productCategoryData;
  console.log(loading,productCategorys,error)

  const images = [
    { url: "https://emeat.in/wp-content/uploads/2023/08/1-1024x438-1.png" },
    { url: "https://emeat.in/wp-content/uploads/2023/08/2-1024x438-1.png" },
    { url: "https://emeat.in/wp-content/uploads/2023/08/3-1024x438-1.png" },
  ];
console.log(productCategorys)

  

  useState(()=>{
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
        try {
          dispatch(storeCategoryStart())
        const uniqueCategory= [...new Set(datas.map(item => item.category))];
        const categoryImageField= uniqueCategory.map((type)=>{
          const presentImages= datas.filter(item=>item.category === type).map(item=>item.image)
          const randomImage= presentImages[Math.floor(Math.random() * presentImages.length)]
          return{categories:type, randomImage:randomImage}
        })
        console.log(categoryImageField)

        dispatch(storeCategorySuccess(categoryImageField))
        // console.log(uniqueCategory)
        } catch (error) {
          dispatch(storeCategoryFail(error.message))
        }
      } catch (error) {
        console.log(error)
      }
    }
    showMeatCatagory();
    
  },[])

  const shopNavigate=(category)=>{
    console.log(category);
    navigate(`/shop?type=${category}&lowrange=0&maxrange=2000&searchTerm=`)
  }
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
          {productCategorys.map((info,index)=>{
            console.log(info)
            return(
              <div key={index} onClick={()=>shopNavigate(info.categories)}>
              <Card1 props={info} className='w-full h-full' /> </div>
            )
          })}
      </div>
      <div></div>
    </div>
  );
}

