import { useTransactionDetailsQuery } from "@/redux/api/adminApi";
import { formatCurrency } from "@/utils/formatCurrency";
import { Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";
import { format } from "date-fns";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  tranId: string;
};

const EarningDetails = ({ open, setOpen, tranId }: TPropsType) => {
  const { data } = useTransactionDetailsQuery(tranId);
  const tranDetails = data?.data;

  return (
    <Modal
      open={open}
      footer={null}
      centered={true}
      onCancel={() => setOpen(false)}
      closeIcon={false}
      style={{
        minWidth: "max-content",
        position: "relative",
        backgroundColor: "#000",
      }}
    >
      <div className="pb-20 ">
        <div className="flex justify-between items-center">
          <h4 className="text-center text-xl font-medium">
            Transaction Details
          </h4>
          <div
            className="w-10 h-10 bg-red-600  rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine size={18} color="#fff" className="" />
          </div>
        </div>
        <div className="mt-10 space-y-4">
          <div className="flex justify-between">
            <h4>Transaction ID :</h4>
            <p className="font-medium">{tranDetails?.tranId}</p>
          </div>
          <hr className="border-[#B0DEBD]" />
          <div className="flex justify-between">
            <h4>Date :</h4>
            <p className="font-medium">
              {" "}
              {tranDetails?.createdAt
                ? format(
                    new Date(tranDetails.createdAt),
                    "dd MMM, yyyy - hh:mm a"
                  )
                : ""}
            </p>
          </div>

          <hr className="border-[#B0DEBD]" />
          <div className="flex justify-between">
            <h4>Transaction amount :</h4>
            <p className="font-medium">{formatCurrency(tranDetails?.amount)}</p>
          </div>
          <hr className="border-[#B0DEBD]" />
          <div className="flex justify-between">
            <h4>Package name :</h4>
            <p className="font-medium capitalize">
              {tranDetails?.packageId?.name}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EarningDetails;
