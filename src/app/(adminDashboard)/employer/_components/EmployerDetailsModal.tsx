import { useUserDetailsQuery } from "@/redux/api/adminApi";
import { Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";
import { formatDate } from "@/utils/formatDate";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  userId: string;
};

const EmployerDetailsModal = ({ open, setOpen, userId }: TPropsType) => {
  const { data: user, isLoading } = useUserDetailsQuery(userId);
  const details = user?.data;

  const fullName =
    details?.firstName || details?.lastName
      ? `${details?.firstName ?? ""} ${details?.lastName ?? ""}`.trim()
      : "No Name";

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

        <h2 className="text-center text-xl font-semibold">Employer Details</h2>

        {/* Email */}
        <p>Email : {details?.email ?? "No Email"}</p>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h4 className="font-semibold text-[#2E3559]">Basic Information</h4>

              <p className="flex gap-x-2">
                <span className="w-[150px]">Full Name:</span>
                <span>{fullName}</span>
              </p>

              <p className="flex gap-x-2">
                <span className="w-[150px]">Phone:</span>
                <span>{details?.phoneNumber ?? "No phone number"}</span>
              </p>

              <p className="flex gap-x-2">
                <span className="w-[150px]">Gender:</span>
                <span>{details?.gender ?? "Not provided"}</span>
              </p>

              <p className="flex gap-x-2">
                <span className="w-[150px]">Nationality:</span>
                <span>{details?.nationality ?? "Not provided"}</span>
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="font-semibold text-[#2E3559]">Account Info</h4>

              <p className="flex gap-x-2">
                <span className="w-[150px]">Status:</span>
                <span className="capitalize">{details?.status}</span>
              </p>

              <p className="flex gap-x-2">
                <span className="w-[150px]">Role:</span>
                <span className="capitalize">{details?.role}</span>
              </p>

              <p className="flex gap-x-2">
                <span className="w-[150px]">Created At:</span>
                <span>{details?.createdAt ? formatDate(details.createdAt) : ""}</span>
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h4 className="font-semibold text-[#2E3559]">Address</h4>

              <p className="flex gap-x-2">
                <span className="w-[150px]">Address:</span>
                <span>{details?.address ?? "No address"}</span>
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="font-semibold text-[#2E3559]">
                Verification
              </h4>

              <p className="flex gap-x-2">
                <span className="w-[150px]">OTP:</span>
                <span>{details?.verification?.otp ?? "N/A"}</span>
              </p>

              <p className="flex gap-x-2">
                <span className="w-[150px]">OTP Status:</span>
                <span>
                  {details?.verification?.status ? "Verified" : "Not Verified"}
                </span>
              </p>

              <p className="flex gap-x-2">
                <span className="w-[150px]">Expires At:</span>
                <span>
                  {details?.verification?.expiresAt
                    ? formatDate(details.verification.expiresAt)
                    : "N/A"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EmployerDetailsModal;
