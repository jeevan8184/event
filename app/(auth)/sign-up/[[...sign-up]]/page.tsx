import React from 'react'
import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <div className=" min-h-screen w-full flex-center">
        <SignUp />
    </div>
  )
}

export default SignUpPage;