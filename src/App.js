// import React, { useContext } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Components/Auth/SignUp";
import LogIn from "./Components/Auth/LogIn";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Product from "./Components/Product/Product";
import Navbar from "./Components/Nav/Navbar";
import Profile from "./Components/Profile/Profile";
import ForgetPassword from "./Components/Auth/ForgetPassword";
import Expenses from "./Components/Expenses/Expenses";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const theme = useSelector((state) => state.theme);
  console.log(theme);
  // console.log(isLoggedIn);
  // const authCtx = useContext(AuthContext);
  // const isLoggedIn = authCtx.isLoggedIn;
  return (
    <div className={`App ${theme}`}>
      <BrowserRouter>
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route path="/Expenses" element={<Expenses />} />
          <Route exact path="/SignUp" element={<SignUp />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Product />} />
          <Route path="/ForgetPassWord" element={<ForgetPassword />} />
          <Route index element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
