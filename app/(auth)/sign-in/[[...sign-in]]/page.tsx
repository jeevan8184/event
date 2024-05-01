import React from 'react'
import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return (
    <div className=" min-h-screen w-full flex-center">
        <SignIn />
    </div>
  )
}

export default SignInPage;