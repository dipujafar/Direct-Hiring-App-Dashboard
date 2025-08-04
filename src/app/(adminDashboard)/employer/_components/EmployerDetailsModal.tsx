import { Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};

const EmployerDetailsModal = ({ open, setOpen }: TPropsType) => {
  return (
    <Modal
      open={open}
      footer={null}
      centered
      onCancel={() => setOpen(false)}
      closeIcon={false}
      width={800}
      style={{ maxWidth: "95vw" }}
    >
      <div className="relative p-6 space-y-6">
        {/* Close button */}
        <div className="absolute top-4 right-4">
          <div
            className="w-8 h-8 bg-red-600 rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine size={18} color="#fff" />
          </div>
        </div>

        <h2 className="text-center text-xl font-semibold">Employers Details</h2>

        {/* Email */}

        <p>Email : james1234@gmail.com</p>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h4 className="font-semibold text-[#2E3559]">
                Primary Employers
              </h4>
              <p className="flex  gap-x-2">
                <span className="w-[150px]"> First name: </span>{" "}
                <span> Mr. </span>
              </p>
              <p className="flex  gap-x-2">
                <span className="w-[150px]"> Last name: </span>{" "}
                <span> Tan </span>
              </p>
              <p className="flex  gap-x-2">
                {" "}
                <span className="w-[150px]">Phone Number: </span>{" "}
                <span> +65-800-925-6278 </span>
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="font-semibold text-[#2E3559]">
                Secondary Employers
              </h4>
              <p className="flex  gap-x-2">
                {" "}
                <span className="w-[150px]"> First name: </span>{" "}
                <span> Mr. </span>
              </p>
              <p className="flex  gap-x-2">
                {" "}
                <span className="w-[150px]">Last name: </span>
                <span> Tan </span>
              </p>
              <p className="flex  gap-x-2">
                <span className="w-[150px]"> Phone Number: </span>{" "}
                <span> +65-800-925-6278 </span>
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="font-semibold text-[#2E3559]">
                Emergency Contact
              </h4>
              <p className="flex  gap-x-2">
                <span className="w-[150px]"> Person's name: </span>{" "}
                <span> Mr. Tan </span>
              </p>
              <p className="flex  gap-x-2">
                <span className="w-[170px]"> Person’s Phone Number: </span>{" "}
                <span> +65-800-925-6278 </span>
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h4 className="font-semibold text-[#2E3559]">Home Address</h4>
              <p className="flex  gap-x-2">
                {" "}
                <span className="w-[150px]">Address: </span>{" "}
                <span> Singapore </span>
              </p>
              <p className="flex  gap-x-2">
                <span className="w-[150px]">City: </span>{" "}
                <span> Singapore </span>
              </p>
              <p className="flex  gap-x-2">
                <span className="w-[150px]">County: </span>{" "}
                <span> Singapore </span>
              </p>
              <p className="flex  gap-x-2">
                <span className="w-[150px]">Zip Code: </span> <span> 12345 </span>
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="font-semibold text-[#2E3559]">
                Additional Information
              </h4>
              <p className="font-medium">Household Details</p>
              <p className="text-gray-600">
                By signing up for our auto-renewing monthly membership, which
                will be charged to the card on file every 30 days.
              </p>

              <p className="font-medium pt-2">Pet Details</p>
              <p className="text-gray-600">
                By signing up for our auto-renewing monthly membership, which
                will be charged to the card on file every 30 days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EmployerDetailsModal;
