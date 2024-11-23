import React from "react";
import Spinner from "./_components/Spinner";

export default function loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner />;
    </div>
  );
}
