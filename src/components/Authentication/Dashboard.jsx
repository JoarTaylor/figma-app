import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsSignedIn,
  selectUserEmail,
  selectUserId,
  selectUserName,
} from "../../store/features/user/user.selector";
import Button from "../utils/button";
import { signOutFromGoogleAsync } from "../../store/features/user/user.slice";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUserEmail);
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOutFromGoogleAsync());
    navigate("/");
  };

  return (
    <>
      <h1>{userName}</h1>
      <h2>{userEmail}</h2>
      <Button callback={handleSignOut}>Sign Out</Button>
    </>
  );
}
