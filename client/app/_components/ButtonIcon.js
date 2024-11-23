import React from "react";

export default function ButtonIcon({ text, icon, className }) {
  return (
    <div
      className={`flex items-center w-full px-3 py-2 transition-all border rounded-lg ${className}`}
    >
      <button className={`text-sm font-semibold flex-1 h-full w-fit`}>
        {text}
      </button>
      {icon && <span className="">{icon}</span>}
    </div>
  );
}
