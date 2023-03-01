import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/utils/button'
import { signInWithGoogle } from '../firebase';
import { selectIsSignedIn } from '../store/features/user/user.selector';
import { getUserAsync, getUserAuthIdAsync, signInWithGoogleAsync } from '../store/features/user/user.slice';


export default function SignIn() {
    const dispatch = useDispatch()
    const isSignedIn = useSelector(selectIsSignedIn)
    
    const handleSignIn = () => {
        dispatch(signInWithGoogleAsync())
        dispatch(getUserAuthIdAsync())
        dispatch(getUserAsync())
        
    }

    if(!isSignedIn) 
  return (
    <Button callback={handleSignIn}>Sign in</Button>
  )
}
