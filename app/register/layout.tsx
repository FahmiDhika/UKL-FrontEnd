import { ToastContainer } from "react-toastify";

export const metadata = {
  title: `Register | UKL FrontEnd`,
  desciption: `Build & Develop by Fahmi Dhika`,
};

type PropsLayout = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: PropsLayout) => {
  return (
    <div>
      {children}
      <ToastContainer containerId={`toastRegister`} />
    </div>
  );
};

export default RootLayout;
