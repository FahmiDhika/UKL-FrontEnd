import React from "react";
import Link from "next/link";

interface prop {
  icon: React.ReactNode;
  label: string;
  path: string;
  active?: boolean;
}

const ItemList = ({ icon, label, path, active }: prop) => {
  return (
    <Link
      href={path}
      className={`flex items-center p-2 my-2 bg-slate-600 hover:scale-105 hover:shadow-xl hover:bg-slate-600/50 rounded-lg ease-in duration-150 ${
        active ? `text-black` : `text-gray-300`
      }`}
    >
      <span className="mr-4">{icon}</span>
      <span className="flex-1 text-lg">{label}</span>
    </Link>
  );
};

export default ItemList;
