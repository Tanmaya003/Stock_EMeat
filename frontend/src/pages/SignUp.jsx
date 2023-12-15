import React, { useState } from "react";

export default function SignUp() {
  const [authvisibility, setVisibility] = useState(false);
  const [screenWidth, setScreenWith] = useState(window.innerWidth);

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
              <form className="flex flex-col justify-center items-start  gap-5">
                <label>Enter your user name</label>
                <input
                  type="text"
                  placeholder="UserName"
                  className="bg-slate-200 w-full rounded-md p-2 text-sm focus:outline-none"
                />
                <label>Enter your Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  className="bg-slate-200 w-full rounded-md p-2 text-sm focus:outline-none"
                />
                <label>Enter your Password</label>
                <input
                  type="text"
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
              <form className="flex flex-col justify-center items-start gap-5">
                <label>Enter Your Username *</label>
                <input
                  type="text"
                  placeholder="UserName"
                  className="bg-slate-200 w-full rounded-md p-2 text-sm focus:outline-none"
                />
                <label>Enter your password *</label>
                <input
                  type="text"
                  placeholder="Password"
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
              <form className="flex flex-col justify-center items-start gap-5">
                <label>Enter Your Username *</label>
                <input
                  type="text"
                  placeholder="UserName"
                  className="bg-slate-200 w-4/5 rounded-md p-2 text-sm focus:outline-none"
                />
                <label>Enter your password *</label>
                <input
                  type="text"
                  placeholder="Password"
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
              <form className="flex flex-col justify-center items-start gap-5">
                <label>Enter your user name</label>
                <input
                  type="text"
                  placeholder="UserName"
                  className="bg-slate-200 w-4/5 rounded-md p-2 text-sm focus:outline-none"
                />
                <label>Enter your Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  className="bg-slate-200 w-4/5 rounded-md p-2 text-sm focus:outline-none"
                />
                <label>Enter your Password</label>
                <input
                  type="text"
                  placeholder="Password"
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
