import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsSignedIn, selectUserEmail, selectUserId, selectUserName } from '../store/features/user/user.selector'

export default function Dashboard() {
  const userEmail = useSelector(selectUserEmail);
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);
  const isSignedIn = useSelector(selectIsSignedIn)
  

  return (
    <>

    </>
  )
}
