import { RiDashboardHorizontalFill } from "react-icons/ri";
import { GoPeople } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { UserCog, Wallet } from "lucide-react";

export const navLinks = [
  {
    key: "dashboard",
    icon: <RiDashboardHorizontalFill size={18} />,
    label: <Link href={"/dashboard"}>Dashboard</Link>,
  },
  {
    key: "earnings",
    icon: <Wallet  size={18} />,
    label: <Link href={"/earnings"}>Earnings</Link>,
  },
  {
    key: "users",
    icon: <GoPeople size={18} />,
    label: <Link href={"/employer"}>Employer</Link>,
  },
  {
    key: "vendors",
    icon: <UserCog  size={18} />,
    label: <Link href={"/vendors"}>Vendors</Link>,
  },
  

  {
    key: "settings",
    icon: <IoSettingsOutline size={18} />,
    label: <Link href={"/settings"}>Settings</Link>,
  },
  // {
  //   key: "logout",
  //   icon: <RiLogoutCircleLine size={18} />,
  //   label: <Link href={"/login"}>Logout</Link>,
  // },
];
