"use client";

import { useEffect } from "react";

type prop = {
  title: string;
  message: string;
  onClose: () => void;
  type?: "success" | "error";
};

const ModalAlert = ({ title, message, onClose, type = "success" }: prop) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      onClose();
    }, 3000); // auto close setelah 3 detik
  }, [onClose]);

  const bgColor = type === "success" ? `bg-green-500` : `bg-red-500`;

  return (
    <div className="fixed inset-0 felx justify-center items-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="bg-white rounded-lg shadow-xl p-6 z-10 max-w-sm w-full">
        <h1
          className={`text-white text-lg font-bold px-4 py-2 rounded-t-lg ${bgColor}`}
        >
          {title}
        </h1>

        <div className="mt-2 px-2 py-4 text-gray-700">{message}</div>

        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAlert;
