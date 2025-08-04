import { Metadata } from "next";
import LoginForm from "./_components/LoginForm";



export const metadata: Metadata = {
  title: "Admin Login",
  description: "Admin login for SoleSwap.",
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
