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
import { Eye, Search, Trash2 } from "lucide-react";
import HelperDetailsModal from "./HelperDetailsModal";
import { useAllUsersQuery, useDeleteUserMutation } from "@/redux/api/adminApi";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";

// Type based on API response
type TDataType = {
  key: string;
  serial: string;
  name: string;
  date: string;
  phone: string;
};

const HelperTable = () => {
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [deleteEmployee] = useDeleteUserMutation();

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

  const { data: allHelpers } = useAllUsersQuery({
    searchTerm: search,
    role: "helper",
  });

  const helpers = allHelpers?.data?.data || [];
  const meta = allHelpers?.data?.meta || {};
  // console.log("helpers_________", helpers);

  // Map API response to table data
  const data: TDataType[] = helpers.map((itm: any) => ({
    key: itm._id,
    serial: itm._id.slice(0, 10),
    name: itm.helper?.Identity?.fullName || itm.name || "N/A",
    date: itm.createdAt ? new Date(itm.createdAt).toLocaleDateString() : "N/A",
    phone: itm.phoneNumber || "N/A",
  }));

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: `#SL - Total (${meta?.total})`,
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      align: "left",
      render: (text) => (
        <div className="flex items-center gap-x-1">
          <Image
            src="/user-profile.png"
            alt="profile-picture"
            width={40}
            height={40}
          />
          <p>{text}</p>
        </div>
      ),
    },
    { title: "Phone no.", dataIndex: "phone", key: "phone", align: "center" },
    { title: "Join Date", dataIndex: "date", key: "date", align: "center" },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-x-2">
          <Eye
            size={22}
            color="var(--color-primary-gray)"
            onClick={() => {
              setOpen(true);
              setSelectedUserId(record.key as string);
            }}
            className=" hover:cursor-pointer"
          />
          <Popconfirm
            title="Delete the Helper"
            description="Are you sure to delete this helper?"
            onConfirm={confirmBlock}
            okText="Yes"
            cancelText="No"
          >
            <Trash2
              onClick={() => setSelectedUserId(record.key as string)}
              size={20}
              color="#CD0335"
              className=" hover:cursor-pointer"
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#E6F4EA] mt-5 rounded-xl">
      <div className="flex justify-between items-center py-5 px-3">
        <h1 className="lg:text-3xl text-2xl font-medium text-text-color">
          Helper List
        </h1>
        <Input
          className="!w-[250px] lg:!w-[350px] !py-2 !bg-white placeholder:text-gray-400"
          placeholder="Search..."
          prefix={<Search size={20} color="#000" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <DataTable columns={columns} data={data} pageSize={meta?.limit || 10} />
      <HelperDetailsModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default HelperTable;
