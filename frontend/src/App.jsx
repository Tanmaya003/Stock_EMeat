// import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Orders from "./components/Orders";
import Wishlist from "./components/Wishlist";
import Account from "./components/Account";
import Addresses from "./components/Addresses";
import Downloads from "./components/Downloads";
import Dashboard from "./components/Dashboard";
import LogoutComp from "./components/LogoutComp";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Handeller from "./components/Handeller";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route  element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} >
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="download" element={<Downloads />} />
          <Route path="address" element={<Addresses />} />
          <Route path="account" element={<Account />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="logout" element={<LogoutComp />} />
          <Route path="handeller" element={<Handeller />} />
          </Route>
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
