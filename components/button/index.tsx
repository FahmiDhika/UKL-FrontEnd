"use client";

import { ReactNode, Children } from "react";

type buttonProp = {
  children: ReactNode;
  type: `button` | `submit` | `reset`;
  onClick?: () => void;
  className?: string;
};

export const ButtonSuccess = ({
  children,
  type,
  onClick,
  className,
}: buttonProp) => {
  return (
    <button
      type={type}
      onClick={() => {
        if (onClick) onClick();
      }}
      className={`px-4 py-2 text-lg font-bold bg-green-600 text-white rounded-lg hover:bg-green-800 ${className}`}
    >
      {children}
    </button>
  );
};

export const ButtonCancel = ({
  children,
  type,
  onClick,
  className,
}: buttonProp) => {
  return (
    <button
      type={type}
      onClick={() => {
        if (onClick) onClick();
      }}
      className={`px-4 py-2 text-lg font-bold bg-red-600 text-white rounded-lg hover:bg-red-800 ${className}`}
    >
      {children}
    </button>
  );
};
