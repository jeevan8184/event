"use client"

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import MobileNav from './MobileNav'
import NavItems from './NavItems'

const Header = () => {
  const router=useRouter();
  return (
    <header className=" flex-between wrapper px-5 bg-grey-50">
       <div className=" flex-between gap-6 w-full px-4">
          <Link href="/">
            <Image
               src="/assets/images/logo.svg" width={128} height={38} alt="image"
            />
          </Link>
          <div className=' w-full flex-center flex-col'>
            <SignedIn>
              <div className='md:flex-between items-center max-w-sm hidden'>
                <NavItems />
              </div>
            </SignedIn>
          </div>
       </div>
       <div className=" flex flex-between gap-4">
          <div className="">
            <SignedIn>
               <UserButton afterSignOutUrl='/' />
            </SignedIn>
            <SignedOut>
                <Button
                  className=' rounded-full text-white px-4 bg-blue-500'
                  onClick={()=> router.push('/sign-in')}
                >
                  login
                </Button>
            </SignedOut>
          </div>
          <MobileNav />
       </div>
    </header>
  )
}

export default Header