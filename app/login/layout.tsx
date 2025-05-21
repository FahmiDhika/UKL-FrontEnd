import { ToastContainer } from "react-toastify";

export const metadata = {
  title: `Login | UKL FrontEnd`,
  desciption: `Build & Develop by Fahmi Dhika`,
};

type PropsLayout = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: PropsLayout) => {
  return (
    <div>
      {children}
      <ToastContainer containerId={`toastLogin`} />
    </div>
  );
};

export default RootLayout;
