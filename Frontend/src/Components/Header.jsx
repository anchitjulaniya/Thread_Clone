import React, { useContext } from 'react'
import lightLogo from '../assets/favicon.png'
import darkLogo from '../assets/threads.png'
import { myContext } from './Context'
import LightDarkModeToggleButton from './LightDarkModeToggleButton'
import { useNavigate } from 'react-router'
import { House, LogOut, UserRound, Settings } from 'lucide-react';
// import lightlogo from '../assets/New_dark_log.svg'
// import darklogo from '../assets/New_light_log.svg'
import { url } from '../utils/link'


function Header() {
    const navigate = useNavigate()
    const [isDarkMode, setDarkMode, currentUser,setCurrentUser] = useContext(myContext)

  const handleLogOut = async () =>{
    const token = currentUser?.token
    try{
      const response = await fetch(`${url}/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

     const data = await response.json()

     console.log(data)
      
     localStorage.removeItem('currentUser')
     console.log("currentUser removed from localStorage")

     setCurrentUser(null)

     console.log('Successfully Logout', data);

      // if(data.response == true){
      //   localStorage.removeItem('currentUser')
      // }


      navigate("/signin")

    }catch(error){
      console.log(error);
    }
  }

  return (
    <>
      {!currentUser  ?
       (
        <div className={`w-full h-[65px] ${isDarkMode ? "bg-black text-white" : "bg-white text-black"} flex justify-center gap-4 md:gap-10 items-center overflow-hidden duration-500`}>
        <span className='cursor-pointer font-semibold'
        onClick={()=>{
            navigate('/signin')}}
        >SignIn</span>

        <img className={`${isDarkMode ? "" : "hidden"} cursor-pointer duration-500`}
        onClick={()=>{console.log("Home");}}
        src={lightLogo} width={"50px"} />

        <img className={`${!isDarkMode ? "" : "hidden"} cursor-pointer duration-500`}
        onClick={()=>{console.log("Home");}}
        src={darkLogo} width={"50px"} />
        
        <span className='cursor-pointer font-semibold'
        onClick={()=>{
            navigate('/signup')}}
        >SignUp</span>
        <LightDarkModeToggleButton />
    </div>
      ) : (
        <div className={`w-full h-[65px] ${isDarkMode ? "bg-black text-white" : "bg-white text-black"} flex justify-center gap-24  items-center overflow-hidden duration-500`}>
          <House />
          <img className={`${isDarkMode ? "" : "hidden"} cursor-pointer duration-500`}
        onClick={()=>{console.log("Home");}}
        src={lightLogo} width={"40px"} />

        <img className={`${!isDarkMode ? "" : "hidden"} cursor-pointer duration-500`}
        onClick={()=>{console.log("Home");}}
        src={darkLogo} width={"40px"} />
          <span className='flex gap-6'>
            <UserRound />
            <Settings />
            <LogOut onClick={handleLogOut} />
          </span>
        </div>
      )    }
    </>
  )
}
export default Header;