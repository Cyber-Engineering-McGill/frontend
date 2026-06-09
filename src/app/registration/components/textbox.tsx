'use client';

import React from "react";

interface TextProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export default function TextBox({
  id,
  name,
  value,
  onChange,
  label,
  placeholder,
  required = false,
}: TextProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm uppercase tracking-widest" style={{ color: "#b3b3b3" }}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={4}
        className="rounded-lg px-4 py-2 bg-[#141414] border border-[#23272b] focus:outline-none focus:border-[#e3342f] transition-colors text-[#f1f1f1] placeholder-[#8d99ae] font-medium resize-y"
        placeholder={placeholder}
      />
    </div>
  );
}
