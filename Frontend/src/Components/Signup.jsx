import React, { useContext, useState } from "react";
import { myContext } from "./Context";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom'
import {  toast } from 'react-toastify'

const Signup = () => {
  const navigate = useNavigate();
  const [isDarkMode, setDarkMode] = useContext(myContext);
  
  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    
  const handleSignUpClick = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:1000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        
        body: JSON.stringify({
          username : userName,
          mobile,
          email,
          password,
        }),
      });
  
      console.log(response);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
  
      // if (data.success) {
      //   navigate("/signin");
      // }
      toast.success("Account Created Successfully🚀",{
        position: "bottom-right",
        theme: "colored",
      })
      
      navigate("/signin")
      setEmail("")
      setPassword("")
      setUserName("")
      setMobile("")


    } catch (error) {
      console.log("Error:", error);
    }
  };
  

  return (
    <div
      style={{ height: "calc(100vh - 65px)" }}
      className={` ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      } duration-500 flex justify-center items-center`}
    >
      <div className="flex flex-col items-center justify-center dark">
        <div className="w-full max-w-md bg-black md:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-200 mb-4">Sign Up</h2>
          <div className="flex flex-col">
            <div className="flex space-x-4 mb-4">
              <input
                placeholder="User Name"
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                placeholder="Mobile"
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <input
              placeholder="Email"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <input
              placeholder="Password"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <input
              placeholder="Confirm Password"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="password"
            /> */}
            
            <p className="text-white mt-4">
              Already have an account?
              <Link to='/signin'
                className="ml-2 text-sm text-blue-500 -200 hover:underline mt-4"
              >
                Login
              </Link>
            </p>
            <button
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
              onClick={(e)=>{handleSignUpClick(e)}}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
