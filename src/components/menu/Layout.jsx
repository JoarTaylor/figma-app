import React from "react";
import ProfilePic from "../../assets/profilepic.svg";
import SneakerIcon from "../../assets/sneakers.svg";
import Cart from "../../pages/Cart";
import Navlink from "../utils/Navlink";
import { Link, Outlet } from "react-router-dom";
import CartIcon from "../../assets/carticon.svg";

export default function Layout() {
  return (
    <>
      <nav className="mx-[165px] mb-[90px] flex items-center border-b-2 ">
        <div className="flex items-center">
          <Link to="/">
            <img
              className="mr-[32px] h-[20px] w-[137.5px]"
              src={SneakerIcon}
              alt=""
            />
          </Link>
          <Link to="/collections">
            <Navlink>Collections</Navlink>
          </Link>
          <Link to="/men">
            <Navlink>Men</Navlink>
          </Link>
          <Link to="/women">
            <Navlink>Women</Navlink>
          </Link>
          <Link to="/about">
            <Navlink>About</Navlink>
          </Link>
          <Link to="/contact">
            <Navlink>Contact</Navlink>
          </Link>
          <div className="ml-[34px] mr-[46.18px]">
            <Link to="/cart">
              <img className="" src={CartIcon} alt="" />
            </Link>
          </div>
          <div className="">
            <Link to="/dashboard">
              <img src={ProfilePic} alt="" />
            </Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
