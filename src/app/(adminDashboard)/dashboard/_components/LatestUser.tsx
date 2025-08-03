"use client";;
import { Image, TableProps } from "antd";
import DataTable from "@/utils/DataTable";
type TDataType = {
  key?: number;
  serial: string;
  name: string;
  email: string;
  date: string;
  type: string;
};
const data: TDataType[] = Array.from({ length: 5 }).map((data, inx) => ({
  key: inx,
  serial: `#${inx + 1}`,
  name: "James Tracy",
  email: "james1234@gmail.comm",
  type: inx % 2 === 0 ? "User" : "Vendor",
  date: "11 Aug, 2025",
}));

const LatestUser = () => {

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
     
    },
    {
      title: "Full Name",
      dataIndex: "name",
      align: "center",
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
