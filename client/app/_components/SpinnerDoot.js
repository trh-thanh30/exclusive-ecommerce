import React from "react";

export default function SpinnerDoot() {
  return (
    <div className="flex items-center justify-center h-screen space-x-2">
      <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
    </div>
  );
}
