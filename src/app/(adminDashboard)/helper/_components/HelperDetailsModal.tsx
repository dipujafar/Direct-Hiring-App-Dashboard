import { Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};

const HelperDetailsModal = ({ open, setOpen }: TPropsType) => {
  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf"; 
    link.download = "resume.pdf";
    link.click();
  };

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

        <h2 className="text-center text-xl font-semibold">Helpers Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Column */}
          <div className="space-y-4">
            <h4 className="text-[#2E3559] font-semibold">Personal Information</h4>
            <InfoItem label="Email" value="james1234@gmail.com" />
            <InfoItem label="First name" value="Emma" />
            <InfoItem label="Last name" value="Grate" />
            <InfoItem label="Gender" value="Female" />
            <InfoItem label="Age" value="34" />
            <InfoItem label="Phone Number" value="+1-800-925-6278" />

            <h4 className="text-[#2E3559] font-semibold pt-2">Home Address</h4>
            <InfoItem label="Address" value="Philippines, Calabarzon" />
            <InfoItem label="City" value="Calabarzon" />
            <InfoItem label="County" value="Philippines" />
            <InfoItem label="Zip Code" value="12345" />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <h4 className="text-[#2E3559] font-semibold">Other Details</h4>
            <InfoItem label="Language" value="English" />
            <InfoItem label="Education" value="High school degree" />
            <InfoItem label="Occupation" value="RBT" />
            <InfoItem label="Experience" value="5 years" />
            <div className="flex gap-x-2">
              <span className="w-[150px]">Resume:</span>
              <button
                className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded"
                onClick={handleResumeDownload}
              >
                Click here
              </button>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-semibold text-[#2E3559]">About Yourself</h4>
              <p className="text-sm text-gray-600">
                By signing up for our auto-renewing monthly membership, which will be charged to the card on file every 30 days.
              </p>
              <h4 className="font-semibold text-[#2E3559] mt-4">Background Check</h4>
              <p className="text-sm text-gray-600">
                By signing up for our auto-renewing monthly membership, which will be charged to the card on file every 30 days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <p className="flex gap-x-2 text-sm">
    <span className="w-[150px] font-medium">{label}:</span>
    <span>{value}</span>
  </p>
);

export default HelperDetailsModal;
