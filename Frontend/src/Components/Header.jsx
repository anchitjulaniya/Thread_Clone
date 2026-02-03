import React, { useContext } from "react";
import lightLogo from "../assets/favicon.png";
import darkLogo from "../assets/threads.png";
import { myContext } from "./Context";
import LightDarkModeToggleButton from "./LightDarkModeToggleButton";
import { useNavigate } from "react-router";
import { House, LogOut, UserRound, Settings } from "lucide-react";
// import lightlogo from '../assets/New_dark_log.svg'
// import darklogo from '../assets/New_light_log.svg'
import { url } from "../utils/link";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const [isDarkMode, setDarkMode, currentUser, setCurrentUser] =
    useContext(myContext);

  const handleLogOut = async () => {
    const token = currentUser?.token;
    try {
      const response = await fetch(`${url}/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      console.log(data);

      localStorage.removeItem("currentUser");
      console.log("currentUser removed from localStorage");

      setCurrentUser(null);

      toast.success("Successfully Logout", {
        position: "bottom-right",
        theme: "colored",
      });

      console.log("Successfully Logout", data);

      // if(data.response == true){
      //   localStorage.removeItem('currentUser')
      // }

      navigate("/signin");
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  };

  return (
    <>
      {!currentUser ? (
        <div
          className={`w-full h-[65px] ${
            isDarkMode ? "bg-black text-white" : "bg-white text-black"
          } flex justify-center gap-4 md:gap-10 items-center overflow-hidden duration-500`}
        >
          <span
            className="cursor-pointer font-semibold"
            onClick={() => {
              navigate("/signin");
            }}
          >
            SignIn
          </span>

          <img
            className={`${
              isDarkMode ? "" : "hidden"
            } cursor-pointer duration-500`}
            onClick={() => {
              console.log("Home");
            }}
            src={lightLogo}
            width={"50px"}
          />

          <img
            className={`${
              !isDarkMode ? "" : "hidden"
            } cursor-pointer duration-500`}
            onClick={() => {
              console.log("Home");
            }}
            src={darkLogo}
            width={"50px"}
          />

          <span
            className="cursor-pointer font-semibold"
            onClick={() => {
              navigate("/signup");
            }}
          >
            SignUp
          </span>
          <LightDarkModeToggleButton />
        </div>
      ) : (
        <div
          className={`w-full max-w-lg mx-auto h-[65px] ${
            isDarkMode ? "bg-black text-white" : "bg-white text-black"
          } flex justify-between  items-center overflow-hidden duration-500`}
        >
          <House className="cursor-pointer" />
          <img
            className={`${
              isDarkMode ? "" : "hidden"
            } cursor-pointer duration-500`}
            onClick={() => {
              navigate("/home");
            }}
            src={lightLogo}
            width={"40px"}
          />

          <img
            className={`${
              !isDarkMode ? "" : "hidden"
            } cursor-pointer duration-500`}
            onClick={() => {
              navigate("/home");
            }}
            src={darkLogo}
            width={"40px"}
          />
          <span className="flex gap-6">
            <UserRound className="cursor-pointer"
            onClick={() => {
              navigate("/profile");
            }}
            />
            <Settings className="cursor-pointer" />
            <LogOut className="cursor-pointer" onClick={handleLogOut} />
          </span>
        </div>
      )}
    </>
  );
}
export default Header;
