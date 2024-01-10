import React from "react";
import { useNavigate } from "react-router-dom";

export default function Card3({ props,addressmodify }) {
  console.log(props);
  const navigate=useNavigate();
  const deleteAddress=async()=>{
    try {
        const res=await fetch(`/api/user/deleteAddress/${props._id}`,{
            method:'DELETE'
        })
        const data= await res.json();
        alert(data)
        navigate('/profile/address/')
    } catch (error) {
        console.log(error)
    }
  }
  const  modifyAddress=()=>{
    addressmodify(props)
  }
  return (
    <div className="flex justify-between border-[1px]  border-gray-400 rounded-lg p-4">
      
        <div className="font-bold">
          <table>
            <tbody>
              <tr >
                <td className="text-slate-500">House / Appartment Name </td>
                <td className="text-slate-500">: </td>
                <td className="text-slate-600">{props.housename}</td>
              </tr>
              <tr>
                <td className="text-slate-500">Country</td>
                <td className="text-slate-500">:</td>
                <td className="text-slate-600">{props.country}</td>
              </tr>
              <tr>
                <td className="text-slate-500">State</td>
                <td className="text-slate-500">:</td>
                <td className="text-slate-600">{props.state}</td>
              </tr>
              <tr>
                <td className="text-slate-500">District</td>
                <td className="text-slate-500">:</td>
                <td className="text-slate-600">{props.district}</td>
              </tr>
              <tr>
                <td className="text-slate-500">PIN</td>
                <td className="text-slate-500">:</td>
                <td className="text-slate-600">{props.pin}</td>
              </tr>
            </tbody>
          </table>
          
        </div>
        <div className="font-bold">
        <table>
            <tbody>
              <tr>
                <td className="text-slate-500">City</td>
                <td className="text-slate-500">:</td>
                <td className="text-slate-600">{props.city}</td>
              </tr>
              <tr>
                <td className="text-slate-500">Village/Street name</td>
                <td className="text-slate-500">:</td>
                <td className="text-slate-600">{props.village}</td>
              </tr>
              <tr>
                <td className="text-slate-500">Contact Number</td>
                <td className="text-slate-500">:</td>
                <td className="text-slate-600">{props.phone}</td>
              </tr>
              <tr>
                <td className="text-slate-500">More details</td>
                <td className="text-slate-500">:</td>
                <td className="text-slate-600">{props.details}</td>
              </tr>
              
            </tbody>
          </table>
          
        </div>
      
      <div className="flex flex-col items-center justify-center gap-4">
        <div>
          <button
            type="button"
            onClick={modifyAddress}
            className="text-white bg-gradient-to-r w-20 from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br hover:scale-110  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Modify
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={deleteAddress}
            className="text-white bg-gradient-to-r w-20 from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br hover:scale-110  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
