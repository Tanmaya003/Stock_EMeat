import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { upadteCartSuccess } from "../redux/user/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState({});
  const disPatch =useDispatch();
  const navigate=useNavigate();
//   console.log(address);
  const [toggle, setToggle] = useState(false);
  const cartDetails = useSelector((state) => state.cart);
  const { cart } = cartDetails;
  console.log(cart.item[0].productId);
  const userDetails = useSelector((state) => state.user);
  const { currentUser } = userDetails;
//   console.log(currentUser);
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await fetch(`/api/user/getAddress/${currentUser._id}`);
        const data = await res.json();
        // console.log(data);
        if (data.success === "false") {
          return;
        }
        setAddresses(data);
        setAddress(data[0])
        // console.log(data[0])
        disPatch(upadteCartSuccess(data[0] ));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddress();
  }, []);
  const selectedAddress = (index) => {
    const x = addresses[index];
    // console.log(x);
    setAddress(x);
    setToggle(false);
    disPatch(upadteCartSuccess(x));
  };
  const proceedToPayment=()=>{
    navigate('/payment')
  }
  return (
    <div className="">
      <div className="w-1/2 mx-auto pt-4">
        <div className="bg-gray-200 p-5 border rounded-md flex flex-col gap-4 pb-20">
          <div className="text-2xl font-semibold">Items in the cart</div>
          <div className="flex flex-col gap-4 ">
            {cart.item.map((data, index) => (
              <div
                key={index}
                className="border-b-[1px] border-gray-300 pb-1 flex gap-4"
              >
                <div className="border-b-[1px] border-gray-300 rounded-sm w-1/4 h-40  hover:bg-yellow-100 hover:transform bg-gray-200 flex gap-4 items-center justify-between">
                  <img
                    src={data.image}
                    className="w-full h-40
             object-fill"
                  />
                </div>
                <div className="px-14 flex flex-col gap-2 text-md font-semibold">
                  <div className="font-bold">{data.name} </div>
                  <div>Quanitiy : {data.quantity}</div>
                  <div>Price : {data.price}</div>
                  <div>Count : {data.countNo}</div>
                  <div>Individual Total : {data.price}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            ------------------------------------------------------------------------------
          </div>
          <div className="text-center">Total Amount : {cart.totalAmount}</div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="font-bold">
                Address<span className="text-red-600">*</span> :{" "}
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                  className="text-yellow-800 text-md bg-gradient-to-r from-yellow-500 via-yellow-500 to-yellow-500 hover:bg-gradient-to-br hover:scale-110  font-medium rounded-lg  px-5 py-2 text-center me-2 mb-autp"
                >
                  {toggle ? "Hide addresses" : "Change Address"}
                </button>
              </div>
            </div>
            {!toggle && <div>
                <div
                    className=" flex gap-10 border-[1px] border-gray-700 items-center justify-around p-4 rounded-md "
                  >
                    <table>
                      <tbody>
                        <tr>
                          <td>housename :</td>
                          <td>{address.housename}</td>
                        </tr>
                        <tr>
                          <td>state :</td>
                          <td>{address.state}</td>
                        </tr>
                        <tr>
                          <td>district : </td>
                          <td>{address.district}</td>
                        </tr>
                        <tr>
                          <td>pin : </td>
                          <td>{address.pin}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table>
                      <tbody>
                        <tr>
                          <td>City :</td>
                          <td>{address.city}</td>
                        </tr>
                        <tr>
                          <td>Village : </td>
                          <td>{address.village}</td>
                        </tr>
                        <tr>
                          <td>Phone : </td>
                          <td>{address.phone}</td>
                        </tr>
                        <tr>
                          <td>Details : </td>
                          <td>{address.details}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
            </div>}
            {toggle && (
              <div className=" flex flex-col gap-10 ">
                {addresses.map((address, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      selectedAddress(index);
                    }}
                    className=" flex gap-10 border-[1px] border-gray-700 items-center justify-around p-4 rounded-md hover:scale-105"
                  >
                    <table>
                      <tbody>
                        <tr>
                          <td>housename :</td>
                          <td>{address.housename}</td>
                        </tr>
                        <tr>
                          <td>state :</td>
                          <td>{address.state}</td>
                        </tr>
                        <tr>
                          <td>district : </td>
                          <td>{address.district}</td>
                        </tr>
                        <tr>
                          <td>pin : </td>
                          <td>{address.pin}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table>
                      <tbody>
                        <tr>
                          <td>City :</td>
                          <td>{address.city}</td>
                        </tr>
                        <tr>
                          <td>Village : </td>
                          <td>{address.village}</td>
                        </tr>
                        <tr>
                          <td>Phone : </td>
                          <td>{address.phone}</td>
                        </tr>
                        <tr>
                          <td>Details : </td>
                          <td>{address.details}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0  w-full left-0 h-20 shadow-inner shadow-slate-400 bg-slate-100 pr-28 flex gap-10 justify-end items-center border-[1px] border-slate-300 hover:shadow-slate-600 hover:transform">
        <button
          type="button"
          className="text-yellow-200 text-md bg-gradient-to-r from-green-500 via-green-500 to-green-500 hover:bg-gradient-to-br hover:scale-110  font-medium rounded-lg  px-5 py-2 text-center me-2 mb-autp"
        >
          Back to cart
        </button>
        <button
          type="button"
          onClick={proceedToPayment}
          className="text-yellow-800 text-md bg-gradient-to-r from-yellow-500 via-yellow-500 to-yellow-500 hover:bg-gradient-to-br hover:scale-110  font-medium rounded-lg  px-5 py-2 text-center me-2 mb-autp"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
