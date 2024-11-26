import React from "react";

export default function Input({
  icon,
  placeholder,
  className,
  value,
  onChange,
  id,
  name,
  type,
  disabled,
}) {
  return (
    <div className="relative flex items-center w-[380px]">
      <input
        disabled={disabled}
        type={type}
        className={`text-sm text-slate-500 ${className} outline-none w-full pr-12 px-3 py-2 transition-colors border rounded-lg border-primary-400 focus-within:border-primary-800 focus-within:shadow-lg focus-within:shadow-primary-200`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={id}
        name={name}
      />
      {icon && (
        <span className="absolute pl-2 border-l border-primary-400 right-3 text-primary-800">
          {icon}
        </span>
      )}
    </div>
  );
}
