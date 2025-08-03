"use client";
import {
  Image,
  Input,
  message,
  Popconfirm,
  PopconfirmProps,
  TableProps,
} from "antd";

import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { CgUnblock } from "react-icons/cg";
import { Eye, Search } from "lucide-react";
import VendorDetails from "./VendorDetails";

type TDataType = {
  key?: number;
  serial: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  type: string;
};
const data: TDataType[] = Array.from({ length: 18 }).map((data, inx) => ({
  key: inx,
  serial: inx + 1,
  name: "James Tracy",
  email: "james1234@gmail.comm",
  phone: "12345678",
  date: "11 Oct, 2024",
  type: "User",
}));

const confirmBlock: PopconfirmProps["onConfirm"] = (e) => {
  console.log(e);
  message.success("Blocked the user");
};

const VendorsTable = () => {
  const [open, setOpen] = useState(false);

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "#SL",
      dataIndex: "serial",
    },
    {
      title: "User Name",
      dataIndex: "name",
      render: (text, record) => (
        <div className="flex items-center gap-x-1">
          <Image
            src={"/user-profile.png"}
            alt="profile-picture"
            width={40}
            height={40}
            className="size-10"
          ></Image>
          <p>{text}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },

    {
      title: "Phone number",
      dataIndex: "phone",
    },
    {
      title: "Join Date",
      dataIndex: "date",
    },
    
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <div className="flex gap-2 ">
          <Eye
            size={22}
            color="var(--color-primary-gray)"
            onClick={() => setOpen(!open)}
          />
          <Popconfirm
            title="Block the user"
            description="Are you sure to block this user?"
            onConfirm={confirmBlock}
            okText="Yes"
            cancelText="No"
          >
            <CgUnblock size={22} color="#CD0335" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-md">
      <div className="flex justify-between items-center  py-5">
        <h1 className="  lg:text-4xl text-2xl font-medium text-text-color">Vendors</h1>
        <Input
          className="!w-[250px] lg:!w-[350px] !py-2 !bg-white  placeholder:text-white"
          placeholder="Search vendor..."
          prefix={<Search size={20} color="#000"></Search>}
        ></Input>
      </div>
      <DataTable columns={columns} data={data} pageSize={10}></DataTable>
      <VendorDetails open={open} setOpen={setOpen}></VendorDetails>
    </div>
  );
};

export default VendorsTable;
