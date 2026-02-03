import React, { useContext, useEffect, useState } from "react";
import { myContext } from "./Context";
import Cookies from "js-cookie";
import post1 from "../assets/post1.png";
import Createpost from "./Createpost";
import Blank_Profile_Photo from "../assets/Blank_Profile_Photo.png";
import {url} from "../utils/link";
import {  toast } from 'react-toastify'

function Home() {
  const [isDarkMode, setDarkMode, currentUser, setCurrentUser] =
    useContext(myContext);
  const [data, setData] = useState([]);

  const [postText, setPostText] = useState("");
  const [imageLink, setImageLink] = useState("");
  
  console.log("current User", currentUser);
  
  const posts = [
    {
      postedBy: "64a1b2c3d4e5f678901234567", // Replace with a valid user ID
      text: "Excited to share my new blog post about travel destinations! 🌍✈️ Check it out and let me know what you think!",
      image:
        "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3",
      likes: [],
    },
    {
      postedBy: "64b2c3d4e5f67890123456789", // Replace with a valid user ID
      text: "Had an amazing time hiking in the mountains today. 🏔️🌲 The view was breathtaking!",
      image:
        "data:image/jpeg;base64,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",
      likes: [],
    },
    {
      postedBy: "64c3d4e5f678901234567890a", // Replace with a valid user ID
      text: "Just finished reading a fantastic book on entrepreneurship. 📚💡 Highly recommend it to anyone interested in starting a business.",
      image:
        "data:image/jpeg;base64,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",
      likes: [],
    },
    {
      postedBy: "64d4e5f678901234567890bcd", // Replace with a valid user ID
      text: "Feeling grateful for the support from friends and family. ❤️🙏 Here’s to many more milestones!",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbpF3IRjq3K2vF74PNI4mpc-kzYwXmegSupg&usqp=CAU",
      likes: [],
    },
    {
      postedBy: "64e5f678901234567890bcdef", // Replace with a valid user ID
      text: "Just tried a new recipe for homemade pizza. 🍕👨‍🍳 It turned out great! What’s your favorite pizza topping?",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN5RrqcADzQe6l18TLurWjxPG73B-DiXMPhQ&usqp=CAU",
      likes: [],
    },
  ];

  const feed = async () => {
      const token = currentUser?.token  || Cookies.get('token') 
    try {
      const response = await fetch(`${url}/posts/feed`, {
        //https://thread-clone-eiee.onrender.com/api/posts/feed
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const datas = await response.json();
      console.log(datas);
      setData(data);
      // Handle the posts data
      if (datas.posts) {
        data.posts.forEach((post) => {
          console.log(post);
          // You can add code here to render the posts in the UI
        });
      } else {
        console.log("No posts found");
        setData(posts)
        toast("No Post Found!",{
          position: "bottom-right",
          theme: "colored",
        })
        toast("Please Follow Someone to see posts!",{
          position: "bottom-right",
          theme: "colored",
        })
        
      }
    } catch (error) {
      console.error("Failed to fetch feed:", error.message);
    }
  };

  const getCurrentUserFromLocalStorage = ()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      setCurrentUser(user)
    }
  }
  useEffect(() => {
    getCurrentUserFromLocalStorage()
    feed();

  }, []);

  const handlePostCreating = async () => {
    const token = currentUser.token  || Cookies.get('token') 
    try {
      const response = await fetch(`${url}/posts/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          postedBy: currentUser.id,
          text: postText,
          image: imageLink,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const datas = await response.json();
      console.log(datas);
      
    //   setData(datas);
    //   // Handle the posts data
    //   if (datas.posts) {
    //     data.posts.forEach((post) => {
    //       console.log(post);
    //       // You can add code here to render the posts in the UI
    //     });
    //   } else {
    //     console.log("No posts found");
    //   }
    } catch (error) {
      console.error("Failed to fetch feed:", error.message);
    }
  };



  return (
    <div
      className={`${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      } duration-500 max-w-lg overflow-y-auto mx-auto`}
    >
      <div
        id="createPost"
        className="py-5 shadow-xl text-white rounded-lg border-[1px] border-white relative flex px-3"
      >
        <h2 className="text-white absolute top-0 left-[40%]">Create Post</h2>
        <span className="h-full w-[50px] flex">
          <div className="">
            <img
              src={Blank_Profile_Photo}
              className="rounded-full w-[50px]"
              alt="Profile Photo"
            />
          </div>
        </span>
        <span className="h-full w-full text-white flex flex-col gap-2">
          <h2 className="font-semibold text-lg"></h2>
          <input
            onChange={(e) => {
              setPostText(e.target.value);
            }}
            placeholder="Enter Text"
            type="text"
            className="text-md rounded-xl bg-[#2d2d2d] border-[1px] border-[#2d2d2d] outline-none px-4 w-[90%] mr-auto ml-auto py-1 h-[40px]"
          />
          <input
            onChange={(e) => {
              setImageLink(e.target.value);
            }}
            placeholder="Enter Image Link"
            type="text"
            className="text-md  rounded-xl bg-[#2d2d2d] border-[1px] border-[#2d2d2d] outline-none px-4 w-[90%] mr-auto ml-auto h-[40px]"
          />
        </span>
        <span className="flex items-end">
          <button
            onClick={() => {
              console.log("Post Button Clicked");
              if (postText == "") {
                alert("Enter Text");
              }
              if (imageLink == "") {
                alert("Enter Image Link");
              }
              handlePostCreating();
            }}
            className="rounded-xl bg-[#2d2d2d] border-[1px] border-[#2d2d2d] outline-none px-4 h-[40px]"
          >
            Post
          </button>
        </span>
      </div>

      {posts.map((post, index) => (
        <Createpost post={post} key={"A" + index} />
      ))}

      <div></div>
    </div>
  );
}

export default Home;
