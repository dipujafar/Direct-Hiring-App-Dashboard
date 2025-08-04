"use client";
import { Image, Input, message, Popconfirm, PopconfirmProps, TableProps } from "antd";
// import UserDetails from "./UserDetails";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { Eye, Search, Trash2 } from "lucide-react";
import EmployerDetailsModal from "./EmployerDetailsModal";

type TDataType = {
  key?: number;
  serial: number;
  name: string;
  email: string;
  date: string;
  phone: string;
};
const data: TDataType[] = Array.from({ length: 18 }).map((_, inx) => ({
  key: inx,
  serial: inx + 1,
  name: "Devon Lane",
  email: "james1234@gmail.comm",
  date: "1 Aug, 2025",
  phone: "1234567890",
}));

const confirmBlock: PopconfirmProps["onConfirm"] = (e) => {
  console.log(e);
  message.success("Deleted the Employer");
};

const EmployerTable = () => {
  const [open, setOpen] = useState(false);

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "#SI",
      dataIndex: "serial",
    },

    {
      title: "User Name",
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
      title: "Phone no.",
      dataIndex: "phone",
      align: "center",
    },

    {
      title: "Join Date",
      dataIndex: "date",
      align: "center",
    },

    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <div className="flex gap-x-2">
          <Eye
            size={22}
            color="var(--color-primary-gray)"
            onClick={() => setOpen(!open)}
          />
          <Popconfirm
            title="Delete the employer"
            description="Are you sure to delete this employer?"
            onConfirm={confirmBlock}
            okText="Yes"
            cancelText="No"
          >
            <Trash2 size={20} color="#CD0335" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className=" bg-[#E6F4EA] mt-5 rounded-xl">
      <div className="flex justify-between items-center  py-5  px-3 ">
        <h1 className="  lg:text-3xl text-2xl font-medium text-text-color">
          Employers List
        </h1>
        <Input
          className="!w-[250px] lg:!w-[350px] !py-2 !bg-white  placeholder:text-white"
          placeholder="Search..."
          prefix={<Search size={20} color="#000"></Search>}
        ></Input>
      </div>
      <DataTable columns={columns} data={data} pageSize={10}></DataTable>
      <EmployerDetailsModal
        open={open}
        setOpen={setOpen}
      ></EmployerDetailsModal>
    </div>
  );
};

export default EmployerTable;
