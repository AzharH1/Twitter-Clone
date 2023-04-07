import Image from "next/image";
import React from "react";
import SidebarLink from "./SidebarLink";
import LoginModal from "./LoginModal";
import { HomeIcon } from "@heroicons/react/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { signOutUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { closeM } from "../redux/modalSlice";
function Sidebar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()

  async function handleSignOut () {
    const logOut  = await signOut(auth)
    dispatch(signOutUser())
    dispatch(closeM())

  }

  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full xl:ml-24">
      <div className="hoverAnimation flex justify-center items-center w-14 h-14 p-0">
        <Image alt="logo" src={"/assets/twitter-logo.png"} width={34} height={34} />
      </div>
      <nav className="relative h-full">
        <SidebarLink text="Home" Icon={HomeIcon} active />
        <SidebarLink text="Explore" Icon={HashtagIcon} />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <SidebarLink text="Messages" Icon={InboxIcon} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="Lists" Icon={ClipboardListIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} />
        <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
        <button
          className="hidden xl:inline bg-[#1d9bf0] text-white 
        rounded-full w-[200px] h-[52px] text-lg font-bold hover:bg-[#1a8cd7]
        "
        >
          Tweet
        </button>

        {user.username && (<div 
        onClick={handleSignOut}
        className="absolute text-[#d9d9d9] flex items-center justify-center mt-auto hoverAnimation bottom-0">
          <img
            src={user.photoUrl}
            alt=""
            className="h-10 w-10 rounded-full xl:mr-2.5 object-cover"
          />
          <div className="hidden xl:inline leading-5">
            <h4 className="font-bold whitespace-nowrap">{user.name}</h4>
            <p className="text-[#6e767d]">@{user.username}</p>
          </div>
          <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" />
        </div>)}
      </nav>
    </div>
  );
}

export default Sidebar;
