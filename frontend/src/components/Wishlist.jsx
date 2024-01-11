import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const [wishData, setWishData] = useState([]);
  const { loading, failure, currentUser } = useSelector((state) => state.user);
  const [toogle,setToggle]=useState(false)
  const navigate=useNavigate();
  console.log(wishData);
  useEffect(() => {
    console.log(currentUser._id);
    const id = currentUser._id;
    const getData = async () => {
      try {
        if (!id) {
          console.log("user id not forund");
          return;
        }
        const res = await fetch(`/api/user/getWishlists/${currentUser._id}`);
        const data = await res.json();
        console.log(data);
        setWishData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [toogle]);

  const removeItem=async(id)=>{
    try {
      const res=await fetch(`/api/user/deleteWishlist/${id}`,{
        method:'DELETE',
      });
      const data=await res.json();
      if(data.succcess ==='failure'){
        return
      }
      setToggle(!toogle)
    } catch (error) {
      console.log(error)
    }
  }

  const addtoCart=(id)=>{
    navigate(`/product/${id}`)
  }
  return (
    <div className=" px-16 ">
      <div className=" border-[1px] border-gray-400 rounded-lg p-4 flex justify-start gap-4 flex-wrap">
        {wishData.map((details, index) => {
          return (
            <>
              <div className="w-[400px] border-[0.5px] border-gray-400 rounded-md h-40 overflow-hidden flex ">
                <div className="w-1/2 h-full overflow-hidden object-center">
                  <img
                    src={details.image}
                    className=" overflow-hidden object-center "
                  />
                </div>
                <div className="p-2 py-4 w- flex flex-col gap-10 justify-center items-start">
                  <div className="font-bold truncate ...">{details.name}</div>
                  <div >
                    <button
                      type="button"
                      onClick={()=>removeItem(details._id)}
                      className="text-white bg-gradient-to-r from-red-400 via-red-400 to-red-400 hover:bg-gradient-to-br hover:scale-110  font-medium rounded-lg text-sm px-3 py-1.5 text-center me-2 mb-2 h-8"
                    >
                      Remove
                    </button>
                    <button
                      type="button"
                      onClick={()=>{addtoCart(details.productId)}}
                      className="text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-500 hover:bg-gradient-to-br hover:scale-110  font-medium rounded-lg text-sm px-3 py-1.5 text-center me-2 mb-2 h-8"
                    >
                      Add2cart
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
