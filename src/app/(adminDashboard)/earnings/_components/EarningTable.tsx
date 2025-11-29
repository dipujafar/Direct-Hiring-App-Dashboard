"use client";
import { Image, Input, message, PopconfirmProps, TableProps } from "antd";
// import UserDetails from "./UserDetails";
import { useEffect, useState } from "react";
import DataTable from "@/utils/DataTable";
import { Eye, Search } from "lucide-react";
import EarningDetails from "./EarningDetails";
import { useAllTransactionsQuery } from "@/redux/api/adminApi";
import { formatDate } from "@/utils/formatDate";
import { useSearchParams } from "next/navigation";

type TDataType = {
  key?: string;
  _id: string;
  name: string;
  email: string;
  date: string;
  type: string;
  token: string;
  amount: string;
  profile: string;
};

const confirmBlock: PopconfirmProps["onConfirm"] = (e) => {
  console.log(e);
  message.success("Blocked the user");
};

const EarningTable = () => {
  const [selectedTranId, setSelectedTranId] = useState<string>("");
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const defaultSearch = searchParams.get("search") ?? "";
  const [search, setSearch] = useState(defaultSearch);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);

    window.history.replaceState(null, "", `?${params.toString()}`);
  }, [search]);

  // console.log("search__", search);

  const { data: transactionsData } = useAllTransactionsQuery({
    searchTerm: search,
  });

  const transactions = transactionsData?.data?.data || [];
  const meta = transactionsData?.data?.meta || {};

  const data = transactions?.map((data: any, inx: number) => ({
    key: data?._id,
    serial: data?._id?.slice(0, 10),
    name: `${data?.userId?.firstName || ""} ${data?.userId?.lastName || ""}`,
    email: data?.userId?.email,
    date: formatDate(data?.createdAt),
    type: data?.userId?.role,
    profile: data?.userId?.profile,
    token: data?.userId?.token,
    amount: data?.amount,
  }));

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "#Tr.ID",
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
      render: (_, record) => (
        <Eye
          size={22}
          color="var(--color-primary-gray)"
          className="cursor-pointer"
          onClick={() => {
            setSelectedTranId(record?.key as string);
            setOpen(true);
          }}
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></Input>
      </div>
      <DataTable
        columns={columns}
        data={data}
        pageSize={meta?.limit || 10}
      ></DataTable>
      <EarningDetails
        tranId={selectedTranId}
        open={open}
        setOpen={setOpen}
      ></EarningDetails>
    </div>
  );
};

export default EarningTable;
