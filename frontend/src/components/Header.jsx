// import React from 'react'

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaRupeeSign,
  FaBars,
  FaAngleDown,
} from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";

export default function Header() {
  const [hide, sethideheader] = useState(true);
  const [screenWidth, setScreenWith] = useState(window.innerWidth);
  const [box, setbox] = useState(false);
  const [MenuBox, setMenuBox] = useState(false);
  let previousScroll = window.scrollY;

  window.onscroll = function () {
    let currentscroll = window.scrollY;

    if (currentscroll > previousScroll) {
      sethideheader(false);
      setbox(false);
    }
  };
  const handleScreenSize = () => {
    setScreenWith(window.innerWidth);
  };
  useState(() => {
    window.addEventListener("resize", handleScreenSize);
    return () => {
      window.removeEventListener("resize", handleScreenSize);
    };
  }, []);

  const handleBox = () => {
    setbox(!box);
  };
  const handleMenuBox = () => {
    setMenuBox(!MenuBox);
  };
  return (
    <>
      <header className="z-10 top-0 left-0 w-full ">
        {hide && (
          <div className="text-slate-700 py-5 px-[50px]  border-b-[1px] border-slate-300  text-sm w-full hidden sm:block">
            <div className="flex flex-row justify-between items-center  ">
              <div className="flex gap-4 cursor-pointer">
                <Link to={"/profile"}>My Account</Link>
                <Link to={"/profile"}> Wishlist</Link>
              </div>
              <div>
                Need Help? Call Us:
                <span className="text-red-700">+91 8018684457</span>
              </div>
            </div>
          </div>
        )}

        <div className="text-yellow-700 flex items-center justify-center  border-b-[1px] border-slate-300  text-lg w-full shadow-md ">
          <div className="py-5  max-w-screen-xl sm:py-5 sm:text-[20px] sm:w-full">
            <div className="flex flex-row justify-between items-center gap-10 mx-auto">
              <div className="flex flex-wrap font-bold sm:text-[30px]">
                <span className="text-slate-900">Stock</span>
                <span>EMeat</span>
              </div>
              <form className="bg-slate-200 p-1 gap-2 sm:p-2 sm:text-lg rounded-lg flex justify-between items-center ">
                <input
                  type="text"
                  placeholder="Search.."
                  className="bg-slate-200 focus:outline-none w-24 sm:w-64"
                />
                <button>
                  <FaSearch className="text-yellow-700" />
                </button>
              </form>
              <div className="flex items-center justify-around gap-7 text-yellow-700">
                <Link to={"/profile"}>
                  <BsPersonFill />
                </Link>
                <Link className="hidden sm:block">
                  <div className="flex flex-row items-center ">
                    <FaRupeeSign />
                    <span>0.0</span>
                  </div>
                </Link>
                <Link className="hidden sm:block">
                  <div className="flex items-center">
                    <FaShoppingCart />
                    <sup className="w-5  h-5 border rounded  bg-yellow-700 text-slate-50 text-center text-sm">
                      3
                    </sup>
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center gap-10 mx-auto ">
              {/* flex flex-row justify-between pt-5 font-medium items-center gap-10 px-[10px] sm:px-[120px] */}
              <div className="flex justify-center items-center p-1 gap-2 uppercase text-lg border rounded-lg bg-yellow-500 text-white">
                <div className="hidden sm:inline ">
                  <FaBars onClick={handleMenuBox} className="text-sm" />
                </div>
                <div>All Categories</div>
                <div>
                  <FaAngleDown onClick={handleMenuBox} />
                </div>
              </div>
              {/* <div>   x    </div> */}
              <div>
                {screenWidth > 800 ? (
                  <ul className="flex gap-4 list-none no-underline ">
                    <Link >
                      <li className="hover:font-bold">SHOP</li>
                    </Link>
                    <Link to='/about-us'>
                      <li className="hover:font-bold">ABOUT US</li>
                    </Link>
                    <Link to='/contact' >
                      <li className="hover:font-bold ">CONTACT</li>
                    </Link>
                  </ul>
                ) : (
                  <div>
                    <FaBars onClick={handleBox} />
                  </div>
                )}
              </div>
            </div>
            {box && screenWidth < 800 && (
              <div className="h-[120px]  absolute top-[120px] right-5 w-[100px] shadow-md bg-transparent">
                <ul className="flex flex-col gap-4 list-none no-underline p-1 cursor-pointer">
                  <Link>
                    <li
                      className=" shadow-md hover:font-bold hover:shadow-lg"
                      onClick={handleBox}
                    >
                      SHOP
                    </li>
                  </Link>
                  <Link to='/about-us'>
                    <li
                      className=" shadow-md hover:font-bold hover:shadow-lg"
                      onClick={handleBox}
                    >
                      ABOUT US
                    </li>
                  </Link>
                  <Link to='/contact'>
                    <li
                      className=" shadow-md hover:font-bold hover:shadow-lg"
                      onClick={handleBox}
                    >
                      CONTACT
                    </li>
                  </Link>
                </ul>
              </div>
            )}
          </div>
        </div>
        {MenuBox && (
          <div className="px-4 z-1 absolute sm:px-20 ">
            <div
              className={`w-[175px] border flex flex-col items-start p-2 px-4 gap-1 text-slate-500 ${
                MenuBox ? "opacity-100" : "opacity-0 pointer-events-none"
              } transition-opacity ease-in-out duration-700 delay-700 `}
            >
              <button className="hover:text-yellow-700 ">Chicken</button>
              <button className="hover:text-yellow-700">Mutton</button>
              <button className="hover:text-yellow-700">Crabs</button>
              <button className="hover:text-yellow-700">Prawns</button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
