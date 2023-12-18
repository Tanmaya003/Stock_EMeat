import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [authvisibility, setVisibility] = useState(false);
  const [screenWidth, setScreenWith] = useState(window.innerWidth);
  const [formdata,setFormdata]=useState({});
  const [formdata2,setFormdata2]=useState({});
  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate();

  const handleChange=(e)=>{
    setFormdata({...formdata, [e.target.id]:e.target.value})
  }
  const handleChange2=(e)=>{
    setFormdata2({...formdata, [e.target.id]:e.target.value})
  }

  const handleScreenSize = () => {
    setScreenWith(window.innerWidth);
  };
  useState(() => {
    window.addEventListener("resize", handleScreenSize);
    return () => {
      window.removeEventListener("resize", handleScreenSize);
    };
  }, []);
  const togglesignInpage= ()=>{
    setVisibility(false)
  }
  const toggleSignUppage= ()=>{
    setVisibility(true)
  }

  const handleSignUp=async(e)=>{
    e.preventDefault();
    try {
      setLoading(true)
      const res= await fetch('/api/auth/signup',{
        method: 'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(formdata)
      } )
      const data= await res.json()
      if(data.success===false){
        setError(data.message);
        setLoading(false)
        return;
      }
      setLoading(false);
        setError(null);
        navigate('/')
        console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSignIn =(e)=>{
    e.preventDefault();
  }
  return (
    <>
      {screenWidth < 800 && (
        <div className="flex flex-col py-5 justify-center  text-lg max-w-screen-xl mx-auto">
          <div className="flex gap-14 mx-auto">
            <div className="bg-blue-300 w-24 h-10 rounded-md p-1 text-center hover:font-bold" onClick={togglesignInpage} >
              SignIn
            </div>
            <div className="bg-blue-300 w-24 h-10 rounded-md p-1 text-center hover:font-bold" onClick={toggleSignUppage}>
              SignUp
            </div>
            
          </div>
          {authvisibility ? 
          (<div className=" text-center pt-5 px-10">
            <div className=" h-full w-full flex flex-col gap-8 ">
              <div className="font-bold text-2xl">Register</div>
              <form className="flex flex-col justify-center items-start  gap-5" onSubmit={handleSignUp}>
                <label>Enter your user name</label>
                <input
                  type="text"
                  id='username'
                  placeholder="UserName"
                  onChange={handleChange}
                  className="bg-slate-200 w-full rounded-md p-2 text-sm focus:outline-none"
                />
                <label>Enter your Email</label>
                <input
                  type="text"
                  id='email'
                  placeholder="Email"
                  onChange={handleChange}
                  className="bg-slate-200 w-full rounded-md p-2 text-sm focus:outline-none"
                />
                <label>Enter your Password</label>
                <input
                  type="text"
                  id='password'
                  onChange={handleChange}
                  placeholder="Password"
                  className="bg-slate-200 w-full rounded-md p-2 text-sm focus:outline-none"
                />

                <div className="text-sm">
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account, and
                  for other purposes described in our
                  <span className="text-yellow-700">privacy policy</span> .
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-yellow-600 text-white w-[100px] h-10 "
                >
                  Register
                </button>
              </form>
            </div>
          </div>)
          :
          (<div className="text-center pt-5 px-10"> 
            
            <div className=" h-full w-full flex flex-col gap-8">
              <div className="font-bold text-2xl">Login</div>
              <form className="flex flex-col justify-center items-start gap-5" onSubmit={handleSignIn}>
                <label>Enter Your Username *</label>
                <input
                  type="text"
                  placeholder="UserName"
                  onChange={handleChange2}
                  id="username"
                  className="bg-slate-200 w-full rounded-md p-2 text-sm focus:outline-none"
                />
                <label>Enter your password *</label>
                <input
                  type="text"
                  placeholder="Password"
                  onChange={handleChange2}
                  id="password"
                  className="bg-slate-200 w-full rounded-md p-2 text-sm focus:outline-none"
                />
                <div>
                  <input type="checkbox" />{" "}
                  <span className="text-sm">Remember me</span>
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-yellow-600 text-white w-[100px] h-10"
                >
                  Login
                </button>
                <div className="text-yellow-600 text-sm">Forgot Password ?</div>
              </form>
              
            </div>
          </div>)}
        </div>
      )}

      {screenWidth >= 800 && (
        <>
          <div className="flex  py-5 justify-center  text-lg max-w-screen-xl mx-auto">
            <div className=" h-full w-full flex flex-col gap-8">
              <div className="font-bold text-2xl">Login</div>
              <form className="flex flex-col justify-center items-start gap-5" onSubmit={handleSignIn}>
                <label>Enter Your Username *</label>
                <input
                  type="text"
                  placeholder="UserName"
                  onChange={handleChange2}
                  id="username"
                  className="bg-slate-200 w-4/5 rounded-md p-2 text-sm focus:outline-none"
                />
                <label>Enter your password *</label>
                <input
                  type="text"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange2}
                  className="bg-slate-200 w-4/5 rounded-md p-2 text-sm focus:outline-none"
                />
                <div>
                  <input type="checkbox" />{" "}
                  <span className="text-sm">Remember me</span>
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-yellow-600 text-white w-[100px] h-10"
                >
                  Login
                </button>
              </form>
              <div className="text-yellow-600 text-sm">Forgot Password ?</div>
            </div>
            <div className=" h-full w-full flex flex-col gap-8">
              <div className="font-bold text-2xl">Register</div>
              <form className="flex flex-col justify-center items-start gap-5" onSubmit={handleSignUp}>
                <label>Enter your user name</label>
                <input
                  type="text"
                  placeholder="UserName"
                  onChange={handleChange}
                  id="username"
                  className="bg-slate-200 w-4/5 rounded-md p-2 text-sm focus:outline-none"
                />
                <label>Enter your Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  onChange={handleChange}
                  id="email"
                  className="bg-slate-200 w-4/5 rounded-md p-2 text-sm focus:outline-none"
                />
                <label>Enter your Password</label>
                <input
                  type="text"
                  placeholder="Password"
                  onChange={handleChange}
                  id="password"
                  className="bg-slate-200 w-4/5 rounded-md p-2 text-sm focus:outline-none"
                />

                <div className="text-sm">
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account, and
                  for other purposes described in our
                  <span className="text-yellow-700">privacy policy</span> .
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-yellow-600 text-white w-[100px] h-10"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
