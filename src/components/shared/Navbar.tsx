"use client";
import { Avatar, Badge, Flex } from "antd";
import { FaBars } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";

import Link from "next/link";
import { X } from "lucide-react";
import { useMyProfileQuery } from "@/redux/api/authApi";
import { getInitials } from "@/utils/getInitials";

type TNavbarProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const Navbar = ({ collapsed, setCollapsed }: TNavbarProps) => {
  const { data: profileData } = useMyProfileQuery({});
  const myData = profileData?.data || {};
  return (
    <div className="flex items-center justify-between w-[97%] font-poppins ">
      {/* Header left side */}
      <Flex align="center" gap={20}>
        <button
          onClick={() => setCollapsed(collapsed ? false : true)}
          className="cursor-pointer hover:bg-gray-300 rounded-full duration-1000"
        >
          {collapsed ? (
            <X size={28} color="#3A3C3B" />
          ) : (
            <FaBars size={28} color="#3A3C3B" />
          )}
        </button>
        <div className="flex flex-col ">
          <h2 className="md:text-2xl text-lg  font-medium text-[#3A3C3B]">
            Welcome, {myData?.firstName} {myData?.lastName || ""}
            <span className="block  text-sm font-normal">Have a nice day!</span>
          </h2>
        </div>
      </Flex>

      {/* Header right side */}
      <Flex align="center" gap={20}>
        {/* Notification */}
        <Link href={"/notifications"}>
          <div className="flex justify-center items-center size-12  rounded-full cursor-pointer relative border border-main-color">
            <IoNotificationsOutline size={24} color="#545454" />

            <Badge
              count={1}
              style={{
                border: "none",
                boxShadow: "none",
                backgroundColor: "var(--color-main)",
                color: "#fff",
                position: "absolute",
                top: "-24px",
                right: "-8px",
              }}
            ></Badge>
          </div>
        </Link>

        <Link href="/personal-information" className="flex items-center">
          {myData?.profile ? (
            <Avatar
              src={myData.profile}
              size={48}
              className="border border-main-color size-12"
            />
          ) : (
            <div className="size-12 rounded-full bg-main-color text-white flex items-center justify-center text-lg font-semibold border border-main-color">
              {getInitials(myData?.firstName, myData?.lastName)}
            </div>
          )}
        </Link>
      </Flex>
    </div>
  );
};

export default Navbar;
