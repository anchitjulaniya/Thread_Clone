import React,{useContext, useEffect} from 'react'
// import { useNavigate } from 'react-router';
import Blank_Profile_Photo from "../assets/Blank_Profile_Photo.png";
import { Clipboard } from 'lucide-react';
import {  toast } from 'react-toastify'
import { myContext } from "./Context";
import {url} from '../utils/link'

function UserPage() {
    const [isDarkMode, setDarkMode, currentUser, setCurrentUser] = useContext(myContext);
    // const navigate = useNavigate();


    const user = async () => {
        console.log(currentUser)
        try {
            const response = await fetch(`${url}/users/${currentUser.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await response.json();
            console.log(data);
            setCurrentUser(data?.user);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        user()
    }, [])

  return (
    <div className={`max-w-lg mx-auto pt-10 ${!isDarkMode ? "text-black" : "text-white"}}`}>
        <div className={`flex justify-between items-center`}>
            <h1 className={`text-${!isDarkMode ? "black" : "white"} text-lg font-semibold`}>{currentUser?.username}</h1>

            <img src={Blank_Profile_Photo} width={60} className='rounded-full' alt="Profile Photo" />
        </div>
        <button className={`${!isDarkMode ? "text-black bg-[#b3b3b3]" : "text-white bg-[#2b2b2b]"} px-4 py-2 rounded-lg hover:scale-105 duration-500 my-6 ml-2`}>Update Profile📝</button>
        <div className={`${!isDarkMode ? "text-black" : "text-[rgb(97,97,97)]"} flex justify-between items-center`}>
            <span>{currentUser?.followers.length} followers | instagram.com</span>
            <span className={`${!isDarkMode ? "text-black" : "text-white"} flex justify-between items-center cursor-pointer`}><Clipboard /></span>
        </div>

        <div className='pt-12 flex flex-col items-center '>
            <div className={`w-full border-b-2 border-white py-2`}>
                <span className={`${!isDarkMode ? "text-black bg-[#b3b3b3]" : "text-white bg-[#2b2b2b]"} rounded-lg px-4 py-1 text-lg font-semibold hover:cursor-pointer`}>
                    Thread
                </span>
                <span className={`text-${!isDarkMode ? "black" : "white"} px-1`}>|</span>
                <span className={`${!isDarkMode ? "text-black " : "text-white "} rounded-lg px-4 py-1 text-lg font-semibold hover:cursor-pointer`}>
                    Replies
                </span>
            </div>
            <div className={`${!isDarkMode ? "text-black" : "text-white"} py-5 overflow-y-auto scrollbar-hidden`}>
                No Post 
            </div>
        </div>


    </div>
  )
}

export default UserPage