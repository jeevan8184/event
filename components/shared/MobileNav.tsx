
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import NavItems from './NavItems'
import Image from 'next/image'
import { Separator } from '../ui/separator'


const MobileNav = () => {
  return (
    <section className=' md:hidden'>
         <Sheet>
            <SheetTrigger>
               <Image
                  src="/assets/icons/menu.svg"
                  alt="open"
                  height={25}
                  width={25}
                />
            </SheetTrigger>
            <SheetContent className=" bg-white flex flex-col gap-3 md:hidden">
                <Image
                  src="/assets/images/logo.svg" width={128} height={38} alt="image"
                />
                <Separator />
                <NavItems />
            </SheetContent>
          </Sheet>

    </section>
  )
}

export default MobileNav