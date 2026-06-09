"use client";

import React from "react";

interface ShortTextBoxProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  pattern?: string;
  title?: string;
}

export default function ShortTextBox({
  id,
  name,
  value,
  onChange,
  label,
  type = "text",
  placeholder,
  required = false,
  pattern,
  title,
}: ShortTextBoxProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className="text-sm uppercase tracking-widest"
          style={{ color: "#b3b3b3" }}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        required={required}
        pattern={pattern}
        title={title}
        className="rounded-lg px-4 py-2 bg-[#141414] border border-[#23272b] focus:outline-none focus:border-[#e3342f] transition-colors text-[#f1f1f1] placeholder-[#8d99ae] font-medium"
      />
    </div>
  );
}
