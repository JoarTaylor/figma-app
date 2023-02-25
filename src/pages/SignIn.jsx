import React from 'react'
import { useDispatch } from 'react-redux';
import Button from '../components/utils/button'
import { signInWithGoogle } from '../firebase';
import { signInWithGoogleAsync } from '../store/features/user/user.slice';

export default function SignIn() {
    const dispatch = useDispatch()
    
    const handleSignIn = () => {
        dispatch(signInWithGoogleAsync())
    }


  return (
    <Button callback={handleSignIn}>Sign in with Google</Button>
  )
}
