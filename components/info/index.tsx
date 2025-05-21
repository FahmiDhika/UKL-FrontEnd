import { ReactNode } from "react";

// icon import
import { IoAlertCircleOutline } from "react-icons/io5"; // alert
import { TbAlertTriangleFilled } from "react-icons/tb"; // warning

type prop = {
  title: string;
  children: ReactNode;
};

export const AlertInfo = ({ title, children }: prop) => {
  return (
    <div className="w-full h-fit bg-sky-200 rounded-md text-sky-800 px-4 py-3 shadow-md border-l-4 border-sky-800">
      <div className="flex gap-4">
        <IoAlertCircleOutline size={50} />

        <div className="">
          <h1 className="font-bold text-lg">{title}</h1>
          <p className="text-sm">{children}</p>
        </div>
      </div>
    </div>
  );
};

export const WarningInfo = ({ title, children }: prop) => {
  return (
    <div className="w-full h-fit bg-red-200 rounded-md text-red-800 px-4 py-3 shadow-md border-l-4 border-red-800">
      <div className="flex gap-4">
        <TbAlertTriangleFilled size={50} />

        <div className="">
          <h1 className="font-bold text-lg">{title}</h1>
          <p className="text-sm">{children}</p>
        </div>
      </div>
    </div>
  );
};
