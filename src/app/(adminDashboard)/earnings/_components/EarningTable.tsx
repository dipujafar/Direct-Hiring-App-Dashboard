"use client";
import { Image, Input, message, PopconfirmProps, TableProps } from "antd";
// import UserDetails from "./UserDetails";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { Eye, Search } from "lucide-react";
import EarningDetails from "./EarningDetails";

type TDataType = {
  key?: number;
  serial: number;
  name: string;
  email: string;
  date: string;
  type: string;
  token: string;
  amount: string;
};
const data: TDataType[] = Array.from({ length: 18 }).map((_, inx) => ({
  key: inx,
  serial: 12345678,
  name: "Devon Lane",
  email: "james1234@gmail.comm",
  date: "1 Aug, 2025",
  type: "User",
  token: "30 Token",
  amount: "$30",
}));

const confirmBlock: PopconfirmProps["onConfirm"] = (e) => {
  console.log(e);
  message.success("Blocked the user");
};

const EarningTable = () => {
  const [open, setOpen] = useState(false);

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "#Tr.ID",
      dataIndex: "serial",
    },

    {
      title: "Name",
      dataIndex: "name",
      align: "center",
      render: (text, record) => (
        <div className="flex justify-center items-center gap-x-1">
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
      align: "center",
    },
    {
      title: "Token",
      dataIndex: "token",
      align: "center",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      align: "center",
    },

    {
      title: "Date",
      dataIndex: "date",
      align: "center",
    },

    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <Eye
          size={22}
          color="var(--color-primary-gray)"
          onClick={() => setOpen(!open)}
        />
      ),
    },
  ];

  return (
    <div className=" bg-[#E6F4EA] mt-5 rounded-xl">
      <div className="flex justify-between items-center  py-5  px-3 ">
        <h1 className="  lg:text-3xl text-2xl font-medium text-text-color">
          Transactions
        </h1>
        <Input
          className="!w-[250px] lg:!w-[350px] !py-2 !bg-white  placeholder:text-white"
          placeholder="Search..."
          prefix={<Search size={20} color="#000"></Search>}
        ></Input>
      </div>
      <DataTable columns={columns} data={data} pageSize={10}></DataTable>
      <EarningDetails open={open} setOpen={setOpen}></EarningDetails>
    </div>
  );
};

export default EarningTable;
