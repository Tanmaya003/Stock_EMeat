import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card3 from "./Card3";
import { json } from "react-router-dom";

export default function Addresses() {
  const [showAdd, setShowAdd] = useState(false);
  const userdata = useSelector((state) => state.user);
  const { loading, currentUser, error } = userdata;
  console.log(currentUser)
  const [formData, setFormData] = useState({
    housename: "",
    country: "India",
    state: "",
    district: "",
    pin: 0,
    city: "",
    village: "",
    phone: 0,
    details: "",
    userId: "",
  });
  const [updateId,setUpdateID]= useState('')
  const [addresses,setAddresses]=useState([]);
  // console.log(addresses)
  console.log( `updateId is ${updateId}`)
  console.log(formData)
  useEffect(()=>{
    setFormData({...formData,userId:currentUser._id})

    const fetchAddresses=async()=>{
      try {
        
        const res= await fetch(`/api/user/getAddress/${currentUser._id}`)
        const data= await res.json();
        // console.log(data);
        if(data.success === 'false'){
          return
        }
        setAddresses(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAddresses();

  },[])
  const showAddAddress = () => {
    setShowAdd(!showAdd);
    setFormData((prevFormData) => ({
      ...prevFormData,
      housename: "",
      state: "",
      district: "",
      pin: 0,
      city: "",
      village: "",
      phone: 0,
      details: "",
      // userId remains unchanged
    }));
  };
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]:e.target.value})
  };
  console.log(formData)
  
  const addressmodify=(props)=>{
    console.log('props is')
    console.log(props)
    const {_id,...rest}= props;
    setShowAdd(true)
    setFormData(rest)
    setUpdateID(_id)
  }
  const handleSubmit= async(e)=>{
    e.preventDefault();
    try {
      console.log('submit initialized')
      console.log(updateId)
      if(updateId){
        console.log('this is to update')
        const res= await fetch(`/api/user/updateAddress/${updateId}`,{
          method:'POST',
          headers:{'Content-type':'application/json'},
          body:JSON.stringify(formData)
        })
        const data=await res.json();
        console.log(data)
        if(data.success===false){
          // setError(data.message);
          // setLoading(false)
          return;
        }
        alert('address has been updated')
        setUpdateID('')
        setShowAdd(false);
        return;
      }
      else{
        const res= await fetch('/api/user/addAddress',{
          method: 'POST',
          headers:{'Content-type':'application/json'},
          body:JSON.stringify(formData)
        } )
        const data= await res.json()
          if(data.success===false){
            // setError(data.message);
            // setLoading(false)
            return;
          }
          // console.log(data);
          alert('address has been added')
          console.log('address has been added')
          setShowAdd(false);
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section className="px-10 flex flex-col gap-5">
      <div className="flex p-6 gap-10 border-[1px] border-gray-400 rounded-lg">
        <div className="w-1/5">
          <button
            type="button"
            onClick={showAddAddress}
            className="text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br hover:scale-110  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            {showAdd ? "Hide" : "Add Address"}
          </button>
        </div>
        {showAdd && (
          <div className="w-4/5 h-auto ">
            <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
              <div className="flex gap-2 flex-col w-full">
                <label htmlFor="housename" >House / appartment name:</label>
                <input
                  type="text"
                  name="housename"
                  id="housename"
                  value={formData.housename}
                  onChange={handleChange}
                  placeholder="House Name"
                  className="focus:outline-none bg-slate-200 w-2/3 h-8 rounded-lg px-4"
                />
              </div>
              <div className="flex gap-4 w-full">
                <div className="flex flex-col gap-4 w-1/2">
                  <label htmlFor="country">country name:</label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="country"
                    className="focus:outline-none bg-slate-200 w-full h-8 rounded-lg px-4"
                  />
                  <label htmlFor="state">state name:</label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="state"
                    className="focus:outline-none bg-slate-200 w-full h-8 rounded-lg px-4"
                  />
                  <label htmlFor="district">district name:</label>
                  <input
                    type="text"
                    name="district"
                    id="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="district"
                    className="focus:outline-none bg-slate-200 w-full h-8 rounded-lg px-4"
                  />
                  <label htmlFor="pin">PIN :</label>
                  <input
                    type="number"
                    name="pin"
                    id="pin"
                    value={formData.pin}
                    onChange={handleChange}
                    placeholder="PIN"
                    className="focus:outline-none bg-slate-200 w-full h-8 rounded-lg px-4"
                  />
                </div>
                <div className="flex flex-col gap-4 w-1/2">
                  <label htmlFor="city">city name:</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="city"
                    className="focus:outline-none bg-slate-200 w-full h-8 rounded-lg px-4"
                  />
                  <label htmlFor="village">Village / street name:</label>
                  <input
                    type="text"
                    name="village"
                    id="village"
                    value={formData.village}
                    onChange={handleChange}
                    placeholder="Village or word"
                    className="focus:outline-none bg-slate-200 w-full h-8 rounded-lg px-4"
                  />
                  <label htmlFor="phone">Contact number:</label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="phone"
                    className="focus:outline-none bg-slate-200 w-full h-8 rounded-lg px-4"
                  />
                  <label htmlFor="details">Nearby landmart / street name:</label>
                  <input
                    type="textarea"
                    name="details"
                    id="details"
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="details"
                    className="focus:outline-none bg-slate-200 w-full h-8 rounded-lg px-4"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  
                  className="text-white bg-gradient-to-r w-20 from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br hover:scale-110  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="p-5 border-[1px] border-gray-400 rounded-lg">
        <div>Saved Addresses</div>
        <div className="flex flex-col gap-10 px-10 py-4">
          {addresses.map((data,index)=>{
            return(
              <Card3 key={index} props={data} addressmodify={addressmodify}/> 
            )
          })}
        </div>
      </div>
    </section>
  );
}
