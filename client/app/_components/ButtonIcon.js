import React from "react";

export default function ButtonIcon({
  text,
  icon,
  className,
  type,
  disabled,
  onClick,
}) {
  return (
    <div
      className={`flex items-center w-full px-3 py-2 transition-all border rounded-lg ${className}`}
    >
      <button
        type={type}
        disabled={disabled}
        className={`text-sm font-semibold flex-1 h-full w-fit`}
        onClick={onClick}
      >
        {text}
      </button>
      {icon && <span className="">{icon}</span>}
    </div>
  );
}
