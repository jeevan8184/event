import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'

const HomePage = () => {
  return (
    <>
      <section className='  bg-dotted-pattern bg-cover '>
         <div className=' wrapper gap-6 xl:gap-0 grid grid-cols-1 md:grid-cols-2'>
            <div className=" flex flex-col gap-8 ">
              <h1 className=" flex-center font-bold text-[23px]">Host, Connect, 
                Celebrate: Your Events, Our Platform!</h1>
              <p className="">Book and learn helpful
                   tips from 3,168+ mentors in world-class companies
                    with our global community.
              </p>
              <Button 
                className=" bg-blue-500 rounded-full px-5 text-white w-full sm:w-fit my-5"
              >
                Explore
              </Button>
            </div>
            <Image 
              src="/assets/images/hero.png"
              height={1000}
              width={1000}
              alt="image"
              className=" h-[70vh] 2xl:h-[50vh] object-cover object-center "
            />
         </div>
      </section>
      <section className=''>
          
      </section>
    </>
  )
}

export default HomePage;