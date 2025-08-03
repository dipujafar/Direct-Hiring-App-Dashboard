import { Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};

const UserDetails = ({ open, setOpen }: TPropsType) => {
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
          <h4 className="text-center text-xl font-medium">User Details</h4>
          <div
            className="w-10 h-10 bg-main-color  rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine size={18} color="#fff" className="" />
          </div>
        </div>
        <div className="mt-10 space-y-4">
          <div className="flex justify-between">
            <h4>User name :</h4>
            <p className="font-medium">James Tracy</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Email :</h4>
            <p className="font-medium">james1234@gmail.com</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Age :</h4>
            <p className="font-medium">35 Year</p>
          </div>

          <hr />
          <div className="flex justify-between">
            <h4>Gender :</h4>
            <p className="font-medium">Male</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Account Types :</h4>
            <p className="font-medium">User</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Location :</h4>
            <p className="font-medium">California</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetails;
