"use client";

import React from "react";

type CheckboxOption = string | { value: string; label: React.ReactNode };

interface CheckboxProps {
  options: CheckboxOption[];
  value: string;
  onChange: (value: string) => void;
  label?: React.ReactNode;
}

export default function Checkbox({
  options,
  value,
  onChange,
  label,
}: CheckboxProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <span
          className="text-sm uppercase tracking-widest"
          style={{ color: "#b3b3b3" }}
        >
          {label}
        </span>
      )}
      <div className="flex flex-col gap-1">
        {options.map((option) => {
          const optionValue =
            typeof option === "string" ? option : option.value;
          const optionLabel =
            typeof option === "string" ? option : option.label;
          return (
            <div
              key={optionValue}
              className="flex items-center gap-2 select-none"
              style={{ color: "#8d99ae" }}
            >
              <input
                type="checkbox"
                checked={value === optionValue}
                onChange={() => onChange(optionValue)}
                className="accent-[#e3342f] rounded border border-[#23272b] focus:ring-2 focus:ring-[#e3342f] transition-all cursor-pointer"
                style={{
                  width: "22px",
                  height: "22px",
                  minWidth: "22px",
                  minHeight: "22px",
                  maxWidth: "22px",
                  maxHeight: "22px",
                }}
              />
              <span>{optionLabel}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
