"use client";

import { KeyboardEvent, ReactNode } from "react";

type prop = {
  value: string;
  onChange: (value: string) => void;
  type: `text` | `number` | `color` | `email` | `password` | `date` | `url`;
  className?: string;
  id: string;
  required?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  children?: ReactNode;
  label?: string;
  onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
};

export const InputComponent = ({
  value,
  onChange,
  type,
  className,
  id,
  required,
  placeholder,
  onKeyUp,
}: prop) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`text-sm w-full rounded-md p-2 bg-slate-50 border focus:outline-none ${className}`}
      required={required ? required : false}
      placeholder={placeholder || ""}
      onKeyUp={(e) => {
        if (onKeyUp) onKeyUp(e);
      }}
    />
  );
};

export const InputGroupComponent = ({
  value,
  onChange,
  type,
  className,
  id,
  required,
  placeholder,
  children,
  label,
  onKeyUp,
  readOnly,
}: prop) => {
  return (
    <div className="w-full flex flex-col gap-1 my-2">
      <strong className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required == true ? <sup className="text-red-600">*&#41;</sup> : <></>}
      </strong>

      <div>
        {children ? (
          <div className="px-2">{children}</div>
        ) : (
          <div className=""></div>
        )}

        <input
          type={type}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 ${className}`}
          required={required ? required : false}
          placeholder={placeholder || ""}
          readOnly={readOnly ? readOnly : false}
          onKeyUp={(e) => {
            if (onKeyUp) onKeyUp(e);
          }}
        />
      </div>
    </div>
  );
};

export const TextGroupComponent = ({
  value,
  onChange,
  className,
  id,
  required,
  placeholder,
  label,
}: prop) => {
  return (
    <div className="w-full flex flex-col gap-1 my-2">
      <strong className="text-xs font-bold text-slate-500">
        {label}
        {required == true ? <sup className="text-red-600">*&#41;</sup> : <></>}
      </strong>

      <div className="w-full flex items-center gap-1 bg-white border-slate-500 rounded-md border">
        <textarea
          id={id}
          value={value}
          cols={10}
          rows={3}
          onChange={(e) => onChange(e.target.value)}
          className={`text-sm w-full rounded-md p-2 bg-white focus:outline-none ${className}`}
          required={required ? required : false}
          placeholder={placeholder || ""}
        />
      </div>
    </div>
  );
};
