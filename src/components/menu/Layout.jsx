import React from "react";
import ProfilePic from "../../assets/profilepic.svg";
import SneakerIcon from "../../assets/sneakers.svg";
import Cart from "../../pages/Cart";
import Navlink from "../utils/Navlink";
import { Link, Outlet } from "react-router-dom";
import CartIcon from "../../assets/carticon.svg";
import {
  selectIsSignedIn,
  selectProfileImageSrc,
  selectUserCart,
} from "../../store/features/user/user.selector";
import { useSelector } from "react-redux";
import SignIn from "../../pages/SignIn";

export default function Layout() {
  const cart = useSelector(selectUserCart);
  const isSignedIn = useSelector(selectIsSignedIn);
  const profileImageSrc = useSelector(selectProfileImageSrc);

  const quantityIncart = cart.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);

  return (
    <>
      <nav className="box-border  hidden w-full items-center sm:flex border-b-[1px] border-b-[#E4E9F2]">
        <div className="w-full items-center sm:flex gap-[33px]">
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
        </div>

        <div className="flex items-center">
          <div className=" sm:mr-[22.18px]">
            <Link className="relative flex items-center" to="/cart">
              { quantityIncart > 0 &&
              <div className=" absolute left-[50%] translate-y-[-90%] translate-x-[-10%] rounded-full bg-[#FF7E1B] text-center text-[10px] py-0.5 px-3 font-extrabold text-white ">
                {quantityIncart ? quantityIncart : null}
              </div>
}
              <img className=" h-10 w-10" src={CartIcon} alt="" />
            </Link>
          </div>
          <div className="ml-[31px] ">
            {isSignedIn ? (
              <Link to="/dashboard">
                <img
                  className=" h-10 object-scale-down"
                  src={profileImageSrc}
                  alt=""
                />
              </Link>
            ) : (
              <SignIn />
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
