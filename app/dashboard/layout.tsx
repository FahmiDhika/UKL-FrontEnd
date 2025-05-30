import { ToastContainer } from "react-toastify";

export const metadata = {
  title: `Playlist | UKL FrontEnd`,
  desciption: `Build & Develop by Fahmi Dhika`,
};

type PropsLayout = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: PropsLayout) => {
  return <div>{children}</div>;
};

export default RootLayout;
