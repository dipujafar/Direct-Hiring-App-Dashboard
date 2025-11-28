"use client";
import { Button, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { navLinks } from "@/utils/navLinks";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IoLogInOutline } from "react-icons/io5";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/authSlice";
import { toast } from "sonner";
import Cookies from "js-cookie";

const SidebarContainer = ({ collapsed }: { collapsed: boolean }) => {
  const [current, setCurrent] = useState("dashboard");
  const currentPath = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    if (e.key === "logout") {
      localStorage.removeItem("activeNav");
      return;
    }
    localStorage.setItem("activeNav", e.key);
  };

  useEffect(() => {
    const activeKey = localStorage.getItem("activeNav");
    if (!activeKey) return;
    if (activeKey && currentPath !== "/dashboard") {
      setCurrent(activeKey as string);
    } else {
      setCurrent("dashboard");
    }
  }, []);

  const handleLogout = () => {
    const res = dispatch(logout());
    Cookies.remove("access-token", { path: "/" });
    // console.log("logout res", res);
    if (res?.type == "auth/logout") {
      toast.success("Logout Successfully");
      router.refresh();
      router.push("/login");
    }
  };

  return (
    <Sider
      width={300}
      theme="light"
      collapsible
      collapsed={collapsed}
      trigger={null}
      style={{
        paddingInline: `${collapsed ? "5px" : "10px"}`,
        backgroundColor: "var(--color-secondary)",
        maxHeight: "100vh",
        overflow: "auto",
      }}
    >
      <div className="demo-logo-vertical" />
      {/* logo  */}
      <div className="mt-10 flex flex-col justify-center items-center gap-y-5">
        <Link href={"/"}>
          <Image
            src={logo}
            alt="logo_Image"
            className={` ${collapsed ? "size-16" : "size-32"}`}
          />
        </Link>
        <h1
          className={`${
            collapsed ? "text-sm" : "text-xl"
          }   font-extrabold text-white`}
        ></h1>
      </div>
      <Menu
        onClick={onClick}
        defaultSelectedKeys={["dashboard"]}
        selectedKeys={[current]}
        mode="inline"
        className="sidebar-menu text-lg bg-main-color"
        items={navLinks}
      />
      <div className="absolute  w-[90%]  bottom-5 flex justify-center items-center px-2">
        {!collapsed ? (
          <Link href={"/login"} className="w-full">
            <Button
              onClick={handleLogout}
              icon={<IoLogInOutline size={22} />}
              className=" w-full !bg-gray-500  flex items-center justify-center font-600 text-18  border-none  text-white !py-5 hover:bg-gray-600 hover:text-white"
            >
              Log Out
            </Button>
          </Link>
        ) : (
          <Link href={"/login"}>
            <div className=" px-3 py-2 bg-main-color rounded">
              <IoLogInOutline color="#fff" size={24} />
            </div>
          </Link>
        )}
      </div>
    </Sider>
  );
};

export default SidebarContainer;
