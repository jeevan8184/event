import { HomeCardLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const NavItems = () => {
  const pathname=usePathname();
  return (
    <div className=" flex flex-col flex-1 md:flex-row gap-5 max-sm:gap-3 max-w-sm ">
      {HomeCardLinks.map((item,i)=> {
        const isActive=item.route===pathname;
        return (
          <Link className={`${isActive && ' text-blue-500'} font-semibold `}
            href={item.route}
            key={i}
          >
            <p className={`${isActive && 'underline border-b-blue-500 '} text-[17px] font-semibold` }>{item.label}</p>
          </Link>
        )
      })}
    </div>
  )
}

export default NavItems