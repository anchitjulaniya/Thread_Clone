import React, { useContext } from 'react'
import lightLogo from '../assets/favicon.png'
import darkLogo from '../assets/threads.png'
import { myContext } from './Context'
import LightDarkModeToggleButton from './LightDarkModeToggleButton'
import { useNavigate } from 'react-router'

function Header() {
    const navigate = useNavigate()
    const [isDarkMode, setDarkMode] = useContext(myContext)
  return (
    <div className={`w-full h-[65px] ${isDarkMode ? "bg-black text-white" : "bg-white text-black"} flex justify-center gap-4 md:gap-10 items-center overflow-hidden duration-500`}>
        <span className='cursor-pointer font-semibold'
        onClick={()=>{
            navigate('/signin')}}
        >SignIn</span>

        <img  className={`${isDarkMode ? "" : "hidden"} cursor-pointer`}
        onClick={()=>{console.log("Home");}}
        src={lightLogo} width={"50px"} />

        <img  className={`${!isDarkMode ? "" : "hidden"} cursor-pointer`}
        onClick={()=>{console.log("Home");}}
        src={darkLogo} width={"50px"} />
        
        <span className='cursor-pointer font-semibold'
        onClick={()=>{
            navigate('/signup')}}
        >SignUp</span>
        <LightDarkModeToggleButton />
    </div>
  )
}

export default Header