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
    <div className="flex items-center w-[380px] px-3 py-2 transition-colors border rounded-lg border-primary-400 focus-within:border-primary-800 focus-within:shadow-lg focus-within:shadow-primary-200">
      <input
        disabled={disabled}
        type={type}
        className={`flex-1 h-[100%] text-sm text-primary-800 ${className} outline-none`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={id}
        name={name}
      />
      {icon && <span className="ml-3">{icon}</span>}
    </div>
  );
}
