import React from "react";

export default function Navlink({ children }) {
  return (
    <div
      className=" text[15px] mr-[32px] border-b-4 border-white pt-[45px] pb-[45px] text-[#69707D] hover:border-b-4 hover:border-[#FF7E1B]"
      href=""
    >
      {children}
    </div>
  );
}
