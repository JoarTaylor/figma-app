import React from "react";
import ProfilePic from "../assets/profilepic.svg";
import SneakerIcon from "../assets/sneakers.svg";
import Cart from "./Cart";
import Navlink from "./Navlink";

export default function Navbar() {
  return (
    <div className="mx-[165px] mb-[90px] flex items-center border-b-2 ">
      <div className="flex items-center">
        <img
          className="text text tex mr-[32px] h-[20px] w-[137.5px]"
          src={SneakerIcon}
          alt=""
        />
        <Navlink>Collections</Navlink>
        <Navlink>Men</Navlink>
        <Navlink>Womens</Navlink>
        <Navlink>About</Navlink>
        <Navlink>Contacts</Navlink>
        <div className="ml-[34px] mr-[46.18px]">
          <Cart />
        </div>
        <div className="">
          <img src={ProfilePic} alt="" />
        </div>
      </div>
    </div>
  );
}
