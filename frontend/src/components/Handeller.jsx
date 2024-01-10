import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, json } from "react-router-dom";


export default function Handeller() {
  const userdata = useSelector((state) => state.user);
  const { loading, error, currentUser } = userdata;
  const [email, setEmail] = useState("");
  const [user,setUser]=useState({})
  const [err, setErr] = useState(false);
  const [isadmin, setIsadmin] = useState(false);
  const [message,setMessage]=useState('')
  

  useEffect(() => {
    if (currentUser.usertype === "admin") {
      setIsadmin(true);
    }
  }, []);

  useEffect(()=>{
    if (currentUser.usertype === "admin") {
        searchUser()
      }
    const timeoutId = setTimeout(() => {
        setMessage('');
      }, 3000);
    
      // Cleanup function
      return () => {
        clearTimeout(timeoutId);
      };
  },[message])

  const searchUser=async()=>{
    try {
        const res=await fetch('/api/user/searchUser',{
            method:'POST',
            headers:{'Content-type':"application/json"},
            body:JSON.stringify({email:email})
        });
        const data= await res.json();
        setUser(data);
    } catch (error) {
        console.log(error)
    }
  }
  const promoteUser=async()=>{
    try {
        if(user.usertype ==='employee' || user.usertype ==='admin'){
            setMessage('The user has already prompted to employee')
            return
        }
        const res= await fetch('/api/user/promote',{
            method:'POST',
            headers:{'Content-type':"application/json"},
            body:JSON.stringify(user)
        })
        const data = await res.json();
        alert(`User ${user.username} has been promoted to employee`)
        console.log(data);
        setMessage(data.message)
    } catch (error) {
        console.log(error)
    }
  }
  const demoteUser=async()=>{
    try {
        if(user.usertype ==='user' || user.usertype ==='admin'){
            setMessage('User can not be demoted')
            return
        }
        const res= await fetch('/api/user/demote',{
            method:'POST',
            headers:{'Content-type':"application/json"},
            body:JSON.stringify(user)
        })
        const data = await res.json();
        alert(`Employee ${data.username} has been demoted to user`)
        console.log(data);
        setMessage(data.message)
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div className="flex gap-10">
      <div className="flex flex-col gap-10 w-1/2 p-5">
        <Link to={'/product/list-product'}><button
                        type="button"
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      > Upload Product </button>
        </Link>
        {isadmin && (
          <div className="w-full bg-yellow-100  flex flex-col gap-4 p-1">
            <div className="font-semibold text-2xl">
              Make a user to employee
            </div>
            <div>Search by Email address</div>
            <div className="flex gap-4 ">
            <input
              type="text"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              className="bg-slate-200 w-full rounded-md p-2 text-sm focus:outline-none"
              placeholder="Enter user email id"
            />
            <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={searchUser}
            >Search</button>
            </div>
            
            <div>
              {err ? (
                <div className="text-red-700">
                  User doesnot exists with this email id !{" "}
                </div>
              ) : (
                <div className="flex flex-col items-start justify-center gap-4">
                  <div> User found with user name :{user.username} </div>
                  <div> User destination :{user.usertype} </div>
                  <div className="flex">
                    <div>
                    <button type="button"  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={promoteUser}
                    
                    >Promote</button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      onClick={demoteUser}
                      
                      >
                        Demote
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {message && (<div>{message}</div>)}
      </div>
      <div className="w-1/2 p-4 flex flex-col gap-4">
        <div className="font-semibold text-2xl">Reports</div>
        <div className="w-2/3 bg-pink-200 h-20 rounded-lg p-4">
         <div>Number of product sold today: 20</div> 
        {isadmin && (<Link>Generate report</Link>)}
        </div>
        <div className="w-2/3 bg-green-200 h-20 rounded-lg p-4">Number of product registered today : 15</div>
        <Link to={'/product/reports'}>
        <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Explore...</button>
        </Link>
      </div>
    </div>
  );
}
