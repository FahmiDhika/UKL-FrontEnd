"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import ItemList from "./itemList";
// Logo Import
import { removeCookie } from "@/lib/client-cookie";
import { useRouter } from "next/navigation";
// import { IUser } from "@/app/types";
import { BASE_IMAGE_URL } from "@/global";

// icon import
import { IoMenu } from "react-icons/io5";
import { FiChevronsLeft } from "react-icons/fi";
import { TbLogout2 } from "react-icons/tb";

type itemType = {
  id: string;
  icon: ReactNode;
  path: string;
  label: string;
};

type adminProp = {
  children: ReactNode;
  id: string;
  title: string;
  //   user: IUser | null
  itemList: itemType[];
};

const Sidebar = ({
  children,
  id,
  title,
  // user,
  itemList,
}: adminProp) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const name = Cookies.get("name");
    if (name) {
      setUsername(name);
    }
  }, []);

  const toggleDropDown = () => {
    setIsDropDown(!isDropDown);
  };

  const handleLogout = () => {
    removeCookie("token");
    removeCookie("id");
    removeCookie("name");
    removeCookie("role");
    router.replace(`/login`);
  };

  return (
    <div className="w-full min-h-dvh">
      {/* end header */}
      <header className="h-auto flex justify-between items-center px-5 lg:px-14 py-5 bg-[#F3F3E0] shadow-xl">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setIsShow(true)}
            className="cursor-pointer"
          >
            <IoMenu size={38} />
          </button>

          <h1 className="text-2xl font-bold tracking-wider">{title}</h1>
        </div>
      </header>
      {/* end header */}

      {/* content */}
      <div className="px-5 lg:px-14 py-4">{children}</div>
      {/* end content */}

      {/* sidebar */}
      <div
        className={`flex flex-col w-2/3 lg:w-1/4 h-full fixed top-0 right-full bg-[#183B4E] rounded-r-3xl transition-transform z-50 duration-1000 shadow-xl ${
          isShow ? `translate-x-full` : ``
        }`}
      >
        <div className="ml-auto p-5">
          <button onClick={() => setIsShow(false)} className="text-white cursor-pointer">
            <FiChevronsLeft size={50} />
          </button>
        </div>
      </div>
      {/* end sidebar */}
    </div>
  );
};

export default Sidebar;
