import { HomeCardLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const NavItems = () => {
  const pathname=usePathname();
  return (
    <div className=" flex flex-col flex-1 md:flex-row gap-5 max-sn:gap-3 max-w-sm ">
      {HomeCardLinks.map((item,i)=> {
        const isActive=item.route===pathname;
        return (
          <Link className={`${isActive && ' text-blue-500'} font-semibold `}
            href={item.route}
            key={i}
          >
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}

export default NavItems