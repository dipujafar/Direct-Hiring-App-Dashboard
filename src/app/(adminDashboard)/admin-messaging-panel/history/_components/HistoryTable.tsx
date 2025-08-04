"use client";;
import { Image, TableProps } from "antd";
import DataTable from "@/utils/DataTable";
type TDataType = {
  key?: number;
  role: string;
  message: string;
};
const data: TDataType[] = Array.from({ length: 15 }).map((data, inx) => ({
  key: inx,
  role: inx % 2 === 0 ? "Helper" : "Employer",
  message: inx % 2 === 0 ? "Please confirm your upcoming job." : "Meeting scheduled for Friday at 10AM.",
  timestamp: "16 Apr 2025  10:32 AM",

}));

const HistoryTable = () => {

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Role",
      dataIndex: "role",
     
    },
    {
      title: "Message",
      dataIndex: "message",
      align: "center",
    
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      align: "center",
    
    },
    {
      title: "Timestamp",
      render: () => <span className="text-[#07F]">Remove</span>,
      align: "center",
    
    },
  ];

  return (
    <div className="bg-[#E6F4EA] rounded-3xl">
      <h1 className="text-[#333] text-xl font-semibold p-2">History</h1>
      <DataTable columns={columns} data={data} pageSize={15}></DataTable>
    </div>
  );
};

export default HistoryTable;
