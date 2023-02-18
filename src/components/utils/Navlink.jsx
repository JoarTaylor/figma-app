import React from "react";

export default function Navlink({ children }) {
  return (
    <div
      className="border-b-4 border-white pt-8 pb-8 text-[#69707D] hover:border-b-4 hover:border-[#FF7E1B]"
      href=""
    >
      {children}
    </div>
  );
}
