"use client";

import { Image, TableProps } from "antd";
import DataTable from "@/utils/DataTable";
import { useAllUsersQuery } from "@/redux/api/adminApi";
import { format } from "date-fns";

type TDataType = {
  key?: number;
  serial: string;
  name: string;
  email: string;
  date: string;
  type: string;
};

const LatestUser = () => {
  const { data: latestUsers } = useAllUsersQuery(undefined);
  const usersData = latestUsers?.data?.data || [];
  // console.log("latestUsers", usersData);

  const data: TDataType[] = usersData?.map((data: any, inx: number) => ({
    key: inx + 1,
    serial: `#${inx + 1}`,
    name: data?.firstName,
    email: data?.email,
    phone: data?.phoneNumber,
    type: data?.role,
    date: format(new Date(data.createdAt), "dd MMM yyyy, hh:mm a"),
  }));

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
    },
    {
      title: "Full Name",
      dataIndex: "name",
      align: "start",
      render: (text, record) => (
        <div className="flex justify-center items-center gap-x-1">
          <Image
            src={"/user-profile.png"}
            alt="profile-picture"
            width={40}
            height={40}
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
      title: "Phone",
      dataIndex: "phone",
      align: "center",
    },

    {
      title: "Join Date",
      dataIndex: "date",
      align: "center",
    },
    {
      title: "Type",
      dataIndex: "type",
      align: "center",
    },
  ];

  return (
    <div className="bg-[#E6F4EA] rounded-3xl">
      <h1 className="text-[#333] text-xl font-semibold p-2">Recent User</h1>
      <DataTable columns={columns} data={data}></DataTable>
    </div>
  );
};

export default LatestUser;
