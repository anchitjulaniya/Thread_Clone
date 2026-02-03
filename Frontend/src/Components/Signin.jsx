import React, { useContext, useState } from "react";
import { myContext } from "./Context";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom'
import {  toast } from 'react-toastify'

function Signin() {

  const navigate = useNavigate()
  const [isDarkMode, setDarkMode, currentUser, setCurrentUser] = useContext(myContext);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const storeCurrentUserInLocalStorage = (currentUser)=>{
    localStorage.setItem("currentUser", JSON.stringify(currentUser) )
  }
  
  const handleSignIn = async (e)=>{
    e.preventDefault();
    try{
      const response = await fetch("http://localhost:1000/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password
        }),
      });
      console.log(response)
      const data = await response.json();
      console.log(data);
      
      setCurrentUser(data?.user)

      storeCurrentUserInLocalStorage(data?.user)

      
      if(data.success){
        console.log("Success");
      }
      
      navigate("/home")

      setEmail("")
      setPassword("")

      toast.success("Successfully loggedIn✈️",{
        position: "bottom-right",
        theme: "colored",
      })
    }
    catch(error){
      console.log(error);
    }
  }

  
  
  return (
    <div style={{ height: "calc(100vh - 65px)" }}
    className={`bg-${isDarkMode ? "black" : "white"} duration-500 flex justify-center items-center px-2`}>
      <div className="max-w-lg w-full mx-auto ">
      <div
        className= {`bg-${isDarkMode ? "black" : "white"} bg-gray-800 rounded-lg overflow-hidden`}
      >
        <div className="p-8">
          <h2 className={`text-${!isDarkMode ? "black" : "white"} text-center text-3xl font-extrabold `}>
            Welcome Back
          </h2>
          <p className="mt-4 text-center text-gray-400">Sign in to continue</p>
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm">
              <div>
                <label className="sr-only" htmlFor="email">
                  Email address
                </label>
                <input
                  placeholder="Email address"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required=""
                  autoComplete="email"
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="sr-only" htmlFor="password">
                  Password
                </label>
                <input
                  placeholder="Password"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required=""
                  autoComplete="current-password"
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="hidden items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-600 rounded"
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                />
                <label
                  className="ml-2 block text-sm text-gray-400"
                  htmlFor="remember-me"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  className="hidden font-medium text-indigo-500 hover:text-indigo-400"
                  href="#"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <p className={`text-${!isDarkMode ? "black" : "white"} mt-4`}>
              Dont&apos;s have an account?
              <Link to='/signup'
                className="ml-2 text-sm text-blue-500 -200 hover:underline mt-4"
              >
                SignUp
              </Link>
            </p>

            <div>
              <button
                className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150 w-full"
                onClick={(e)=>{handleSignIn(e)}}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
        
      </div>
    </div>
    </div>
  );
}

export default Signin;
