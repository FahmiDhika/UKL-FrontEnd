"use client";

import { ReactNode } from "react";

type prop = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  id: string;
  required?: boolean;
  children: ReactNode;
  label?: string;
};

const Select = ({
  value,
  onChange,
  className,
  id,
  required,
  children,
  label,
}: prop) => {
  return (
    <div className="flex flex-col my-2 gap-1">
      {label ? (
        <strong className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required == true ? (
            <sup className="text-red-600">*&#41;</sup>
          ) : (
            <></>
          )}
        </strong>
      ) : (
        <></>
      )}

      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required || false}
        className={`w-full rounded-md px-4 py-2 text-sm bg-white border-2 border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 appearance-none ${className}`}
      >
        {children}
      </select>
    </div>
  );
};

export default Select