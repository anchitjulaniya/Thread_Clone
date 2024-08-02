import React from "react";
import post1 from "../assets/post1.png";
import { Heart } from "lucide-react";
import { MessageCircle } from "lucide-react";

function Createpost(post) {
  return (
    <div className="flex gap-1 border-b-[1px] border-t-[1px] border-grey-900 pt-2 pb-8">
      <span className="h-full w-[50px] flex">
        <div className="">
          <img
            src={post1}
            className="rounded-full w-[50px] h-[50px]"
            alt="Profile Photo"
          />
        </div>
      </span>

      <span className="h-full w-full text-white flex flex-col ">
        <span className="flex items-center justify-between">
        <h2 className="font-semibold text-sm md:text-lg w-[85%]">{post.post?.postedBy}</h2>
        <button className="text-blue-500 bg-[#2b2b2b] px-4 py-1 rounded-lg hover:bg-[#3b3b3b] hover:text-[#b3b3b3]">Follow</button>
        </span>
        <p className="text-sm md:text-md py-1 w-[85%]">{post.post?.text}</p>
        <img
          className="rounded-lg"
          width={"90%"}
          src={post.post?.image}
          alt="profile Photo"
        />
        <span className="text-white flex gap-5 pt-4 px-5 items-center">
          <span className="flex items-center gap-1 text-white">
          <Heart className=" cursor-pointer" />
          <span>{post.post?.likes || 0}</span>
          </span>
          <MessageCircle />
        </span>
      </span>
    </div>
  );
}

export default Createpost;
