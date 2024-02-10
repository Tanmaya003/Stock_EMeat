import React, { useEffect, useMemo, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { storeCartFail, storeCartStart, storeCartSuccess } from "../redux/user/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const [load,setLoading]=useState(true)
    const disPatch=useDispatch();
    const [toogle,setToggle]=useState(false)
    const [toogle2,setToggle2]=useState(false)
    const navigate=useNavigate();
  const [details, setDetails] = useState({
    item: [
      {
        productId: "",
        name: "",
        image: "",
        quantity: "",
        price: 0,
        userId: "",
        countNo: 1,
        cartId: "",
        
      },
    ],
    totalNum: 0,
    totalAmount: 0,
    address:[],
  });
  const userData = useSelector((state) => state.user);
  const { loading, currentUser, failure } = userData;
  console.log("current user is"+currentUser._id);
  // const cartdetail= useSelector((state)=>state.cart)
  // const {cart}=cartdetail;
  // console.log(cart.item)
  // console.log(details.item);
  useEffect(() => {
    const fetchData = async () => {
      try {
        disPatch(storeCartStart())
        const res = await fetch(`/api/cart/getData/${currentUser._id}`);
        const data = await res.json();

        console.log(data);

        let totalamount = 0;
        data.forEach((data2, index) => {
          const Cartarray = data2.items;
          totalamount += Cartarray.reduce(
            (acc, detail) => acc + detail.price * detail.countNo,
            0
          );
        });
        console.log(totalamount);

        const totalno = data.length;
        console.log(totalno)

        setDetails({
          totalNum: totalno,
          totalAmount: totalamount,
          address:[],
          item: data.map((detail) => ({
            productId: detail.items[0].productId,
            name: detail.items[0].name,
            image: detail.items[0].image,
            quantity: detail.items[0].quantity,
            price: detail.items[0].price,
            userId: detail.userId,
            countNo: detail.items[0].countNo,
            cartId: detail._id,
            
          })),
        });
        setLoading(false)
        const values= {
            totalNum: totalno,
            totalAmount: totalamount,
            item: data.map((detail) => ({
              productId: detail.items[0].productId,
              name: detail.items[0].name,
              image: detail.items[0].image,
              quantity: detail.items[0].quantity,
              price: detail.items[0].price,
              userId: detail.userId,
              countNo: detail.items[0].countNo,
              cartId: detail._id,
              
            })),
            address:[]
          }
          console.log(values)
          disPatch(storeCartSuccess(values))
      } catch (error) {
        console.log(error);
        disPatch(storeCartFail(error.message));
      }
    };
    fetchData();
   
  }, [toogle]);
  
  const upCount = (index) => {
    // Make a shallow copy of the details state
    const newDetails = { ...details };
    // Make a shallow copy of the item at the specified index
    const updatedItem = { ...newDetails.item[index] };
    // Update the countNo property of the copied item
    updatedItem.countNo = updatedItem.countNo + 1;
    console.log(updatedItem.countNo)
    // Update the item array in the copied details state
    newDetails.item[index] = updatedItem;
    // Update the state with the modified details
    setDetails(newDetails);
  };
  const downCount=(index)=>{
    const newDetails = { ...details };
    const updatedItem = { ...newDetails.item[index] };
    updatedItem.countNo = updatedItem.countNo - 1;
    newDetails.item[index] = updatedItem;
    setDetails(newDetails);
  }

  const modifyItem=async(index)=>{
    try {
        const res= await fetch(`/api/cart/modifyData/${currentUser._id}`,{
            method:'POST',
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({productId:details.item[index].productId , quantity:details.item[index].quantity , countNo:details.item[index].countNo })
        })
        console.log('dksld')
        const data= await res.json();
        console.log(data.message)
        if(data.success ===false){
            console.log(data.message)
            alert(`${data.message}`)
            return;
        }
        alert(`cart has been updated`)
        setToggle(!toogle)
    } catch (error) {
        console.log(error.message)
    }
  }
  const removeItem=async(id)=>{
    try {
        console.log(id)
        const res= await fetch(`/api/cart/deleteItem/${id}`,{
            method:'DELETE'
        })
        const data= await res.json();
        alert(`Item has been removed`)
        setToggle(!toogle)
    } catch (error) {
        console.log(error)
    }
  }
  const gotocheckout=()=>{
    navigate('/checkout')
  }
  return (
    <div>
            {load ? (<div className="pt-20 text-center text-xl text-slate-700 font-bold">Loading... </div>):(
                <div>
      <div className="mx-auto px-20 font-bold text-md">
        Total product in Cart : {details.totalNum}
      </div>
      <div className="flex flex-col gap-0 px-20 py-5 pb-20 items-center justify-center">
        {details.item.map((detail1, index) => (
          <div
            key={index}
            className="border-b-[1px] border-gray-300 rounded-sm w-1/2  hover:bg-yellow-100 hover:transform bg-gray-200 flex gap-4 items-center justify-between"
          >
            <div className="w-1/3 p-4 ">
              <img
                src={detail1.image}
                alt="image"
                className="w-full h-40
             object-fill"
              />{" "}
            </div>
            <div className=" flex gap-4 w-2/3 h-40 justify-between items-center">
              <div className="h-full flex flex-col gap-4 items-center justify-center  ">
                <div className="text-slate-700 font-bold">
                  {detail1.name}
                </div>
                <div className="text-slate-700 font-semibold">
                  Quantity - {detail1.quantity}{" "}
                </div>
                <div className="flex text-slate-700 font-semibold">
                  <div> {detail1.countNo} unit - </div>
                  <div>&#8377;{detail1.countNo * detail1.price} </div>
                </div>
                <div className="flex text-slate-700 font-semibold gap-6">
                  <div onClick={()=>downCount(index)} className="h-8 w-8 text-center text-xl  font-semibold bg-gray-300 border-[1px] rounded-full border-gray-300 hover:bg-gray-400 hover:text-slate-100 ">-</div>
                  <div className="  text-md   font-semibold ">{detail1.countNo}</div>
                  <div onClick={()=>upCount(index)} className="h-8 w-8 text-center text-xl  font-semibold bg-gray-300 border-[1px] rounded-full border-gray-300 hover:bg-gray-400 hover:text-slate-100 ">+</div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <button
                  type="button"
                  onClick={()=>removeItem(detail1.cartId)}
                  className="text-yellow-700 text-md bg-gradient-to-r border-[1px] border-slate-400 from-slate-300 via-slate-200 to-slate-300 hover:bg-gradient-to-br hover:scale-110  font-medium rounded-lg  px-5 py-2 text-center me-2 mb-autp"
                >
                  Remove
                </button>
                <button
                  type="button"
                  onClick={()=>modifyItem(index)}
                  className="text-green-800 text-md bg-gradient-to-r border-[1px] border-slate-400 from-slate-300 via-slate-200 to-slate-300 hover:bg-gradient-to-br hover:scale-110  font-medium rounded-lg  px-5 py-2 text-center me-2 mb-autp"
                >
                  Modify
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 w-full left-0 h-20 shadow-inner shadow-slate-400 bg-slate-100 pl-28 flex gap-10  justify-center items-center border-[1px] border-slate-300 hover:shadow-slate-600 hover:transform">
        <div className="w-3/4 text-right text-xl font-semibold text-yellow-600">
          Toal amount in cart : &#8377; {details.totalAmount}
        </div>
        <div>
          <button
            type="submit"
            onClick={gotocheckout}
            className="text-yellow-800 text-md bg-gradient-to-r from-yellow-500 via-yellow-500 to-yellow-500 hover:bg-gradient-to-br hover:scale-110  font-medium rounded-lg  px-5 py-2 text-center me-2 mb-autp"
          >
            Proceed to Order
          </button>
        </div>
      </div>
    </div>
            )}
    </div>
    
    
  );
}
