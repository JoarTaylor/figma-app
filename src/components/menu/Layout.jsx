import React from "react";
import ProfilePic from "../../assets/profilepic.svg";
import SneakerIcon from "../../assets/sneakers.svg";
import Cart from "../../pages/Cart";
import Navlink from "../utils/Navlink";
import { Link, Outlet } from "react-router-dom";
import CartIcon from "../../assets/carticon.svg";
import { selectUserCart } from "../../store/features/user/user.selector";
import { useSelector } from "react-redux";

export default function Layout() {
  const cart = useSelector(selectUserCart);

  const quantityIncart = cart.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);

  return (
    <>
      <nav className="box-border  flex  w-full items-center justify-around">

          <Link className="pb-2" to="/">
            <img className="" src={SneakerIcon} alt="" />
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

   
          <div className="pb-5">
            <Link to="/cart">
              <div className=" relative top-2 left-3 rounded-full bg-[#FF7E1B] text-center text-[10px] font-extrabold text-white ">
                {quantityIncart ? `${quantityIncart}` : ""}
              </div>
              <img className="" src={CartIcon} alt="" />
            </Link>
          </div>
          <div className="pb-3">
            <Link to="/dashboard">
              <img src={ProfilePic} alt="" />
            </Link>
          </div>
        
      </nav>
      <Outlet />
    </>
  );
}