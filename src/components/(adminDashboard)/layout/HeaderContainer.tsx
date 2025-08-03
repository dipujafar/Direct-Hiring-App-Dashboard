import Navbar from "@/components/shared/Navbar";
import { Header } from "antd/es/layout/layout";

type TheaderProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const HeaderContainer = ({ collapsed, setCollapsed }: TheaderProps) => {
  return (
    <Header
      style={{
        padding: 0,
        backgroundColor: "#CDCDCD",
        height: "80px",
        display: "flex",
        alignItems: "center",
        color: "#fff",
        paddingInline: "0",
      }}
    >
      <Navbar collapsed={collapsed} setCollapsed={setCollapsed}></Navbar>
    </Header>
  );
};

export default HeaderContainer;
