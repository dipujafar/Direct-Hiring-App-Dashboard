"use client";
import {
  Image,
  Input,
  message,
  Popconfirm,
  PopconfirmProps,
  TableProps,
} from "antd";
// import UserDetails from "./UserDetails";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { Eye, Search, Trash2 } from "lucide-react";
import EmployerDetailsModal from "./EmployerDetailsModal";
import { useAllUsersQuery, useDeleteUserMutation } from "@/redux/api/adminApi";
import { formatDate } from "@/utils/formatDate";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";

type TDataType = {
  key?: string;
  serial: string;
  name: string;
  email: string;
  date: string;
  phone: string;
  profile: string;
};

const EmployerTable = () => {
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const [deleteEmployee] = useDeleteUserMutation();

  const { data: allUsers } = useAllUsersQuery({
    searchTerm: search,
    role: "employee",
  });
  const employees = allUsers?.data?.data;
  const meta = allUsers?.data?.meta;

  const justEmployee = employees?.filter(
    (user: any) => user?.role === "employee"
  );

  const confirmBlock: PopconfirmProps["onConfirm"] = async (e) => {
    try {
      const res = await deleteEmployee(selectedUserId).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      console.log("user delete error::", error);
      toast.error(getErrorMessage(error));
    }
  };

  const data: TDataType[] = justEmployee?.map((itm: any) => ({
    key: itm?._id,
    serial: itm?._id?.slice(0, 10),
    name:
      itm?.firstName && itm?.lastName
        ? `${itm.firstName} ${itm.lastName}`
        : "No Name",
    email: itm?.email,
    date: formatDate(itm?.createdAt),
    phone: itm?.phoneNumber,
    profile: itm?.profile,
  }));

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: `#SL - Total (${meta?.total})`,
      dataIndex: "serial",
    },

    {
      title: "Name",
      dataIndex: "name",
      align: "center",
      render: (_, record) => (
        <div className="flex justify-center items-center gap-x-2">
          <Image
            src={record?.profile || "/user-profile.png"}
            alt="profile-picture"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <p>{record?.name}</p>
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
      render: (_, record) => (
        <div className="flex gap-x-2">
          <Eye
            size={22}
            className=" hover:cursor-pointer"
            color="var(--color-primary-gray)"
            onClick={() => {
              setOpen(true);
              setSelectedUserId(record.key as string);
            }}
          />

          <Popconfirm
            title="Delete the employer"
            description="Are you sure to delete this employer?"
            onConfirm={confirmBlock}
            okText="Yes"
            cancelText="No"
          >
            <Trash2
              onClick={() => setSelectedUserId(record.key as string)}
              size={20}
              className=" hover:cursor-pointer"
              color="#CD0335"
            />
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></Input>
      </div>
      <DataTable
        columns={columns}
        data={data}
        pageSize={meta?.limit || 10}
      ></DataTable>
      <EmployerDetailsModal
        open={open}
        setOpen={setOpen}
        userId={selectedUserId}
      ></EmployerDetailsModal>
    </div>
  );
};

export default EmployerTable;
