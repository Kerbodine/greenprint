import React from "react";
import {
  BiCategory,
  BiCog,
  BiHeartCircle,
  BiInfoCircle,
  BiMenu,
  BiSelectMultiple,
  BiSpa,
  BiUserCircle,
} from "react-icons/bi";
import { useView } from "../contexts/ViewContext";
import { useAuth } from "../contexts/AuthContext";
import SideNavItem from "./SideNavItem";
import Image from "next/image";

const SideNav = () => {
  const { sideNav, toggleSideNav } = useView();
  const { userData } = useAuth();

  return (
    <div
      className={`${
        sideNav ? "w-[240px]" : "w-[56px] sm:w-[240px]"
      } absolute z-10 box-content h-full flex-none border-r-2 border-gray-100 bg-white transition-all sm:relative`}
    >
      <div className="flex h-[56px] w-full items-center border-b-2 border-gray-100 px-3">
        {/* Logo branding */}
        <div
          className={`${
            !sideNav && "hidden sm:flex"
          } flex flex-auto items-center pr-4`}
        >
          <Image src="/greenprint-black.svg" width={233} height={48} />
        </div>
        <button
          onClick={toggleSideNav}
          className={`grid h-8 w-8 place-items-center text-xl text-gray-500 sm:hidden`}
        >
          <BiMenu />
        </button>
      </div>
      <div className="flex h-[calc(100vh-56px)] flex-col gap-1 p-3">
        <SideNavItem
          icon={<BiCategory />}
          title="Dashboard"
          link={"/dashboard"}
        />
        <SideNavItem icon={<BiSelectMultiple />} title="Quiz" link={"/quiz"} />
        <SideNavItem
          icon={<BiHeartCircle />}
          title="Friends"
          link={"/friends"}
        />
        <SideNavItem
          icon={<BiInfoCircle />}
          title="Statistics"
          link={"/stats"}
        />
        <SideNavItem icon={<BiSpa />} title="Resources" link={"/resources"} />
        <SideNavItem
          icon={<BiUserCircle />}
          title="Profile"
          link={"/profile"}
        />
        {/* Profile Button */}
        <div className="mt-auto flex w-full items-center rounded-lg">
          <div className="no-select grid h-8 w-8 flex-none place-items-center rounded-full bg-accent font-medium text-white">
            {userData.displayName[0]}
          </div>
          <div
            className={`${
              !sideNav && "hidden sm:block"
            } no-select ml-3 flex-auto truncate text-sm`}
          >
            <p className="truncate font-medium text-gray-700">
              {userData.displayName}
            </p>
            <p className="-mt-1 truncate text-gray-500">{userData.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
