import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Footer = () => {
  return (
    <footer className=' wrapper flex flex-col flex-between 
        items-center px-5 w-full py-5 sm:flex-row bg-grey-50 border-t border-t-slate-600' 
    >
      <Link href='/'>
        <Image 
          src='/assets/images/logo.svg' 
          height={38} 
          width={138} 
          alt="logo"
        />
      </Link>
      <p>2023 @copyright
        <strong>Evently. All Rights reserved.</strong>
      </p>
    </footer>
  )
}

export default Footer;
