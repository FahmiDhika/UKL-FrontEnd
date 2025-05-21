"use client";

import React, { useState } from "react";
import { WarningInfo } from "../info";

type prop = {
  disabled?: boolean;
  acceptTypes: string[];
  onChange: (file: File | null) => void;
  className?: string;
  required: boolean;
  id?: string;
  label?: string;
  maxSize?: number;
};

const FileInput = (prop: prop) => {
  const [message, setMessage] = useState("");
  const limitSize = prop.maxSize || 2048;
  const acceptTypes = prop.acceptTypes.join(", ");

  const handleFileInput = (
    event: React.ChangeEvent,
    callback: (data: File | null) => void
  ): void => {
    const target = event.target as HTMLInputElement;
    const currentFile = (target.files as FileList)[0];
    setMessage("");

    if (!currentFile) {
      callback(null);
      return;
    }

    if (!prop.acceptTypes.includes(currentFile.type)) {
      target.value = "";
      setMessage(
        `'${currentFile.name}' adalah tipe file yang invalid. File yang boleh diinput adalah: ${acceptTypes}`
      );
      callback(null);
      return;
    }

    if (currentFile.size > limitSize * 1024) {
      target.value = "";
      setMessage(`File yang diinput melebihi batas ${limitSize} KB.`);
      callback(null);
      return;
    }

    // ✅ Tambahkan baris ini supaya file valid dikirim ke state
    callback(currentFile);
  };

  return (
    <div className="w-full flex flex-col gap-1 my-2">
      <strong className="block text-sm font-medium text-gray-700 mb-1">
        {prop.label}
      </strong>
      <input
        type={`file`}
        className={`text-sm w-full rounded-md p-2 bg-slate-50 border-2 border-indigo-400 focus:border-slate-500 focus:outline-none ${prop.className}`}
        disabled={prop.disabled}
        required={prop.required || false}
        accept={acceptTypes}
        id={prop.id}
        onChange={(e) => handleFileInput(e, prop.onChange)}
      />
      {message !== "" ? (
        <WarningInfo title="Peringatan">{message}</WarningInfo>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FileInput;
