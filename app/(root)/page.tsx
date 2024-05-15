
import CateogoryFilter from '@/components/shared/CateogoryFilter';
import Collection from '@/components/shared/Collection';
import Search from '@/components/shared/Search';
import { Button } from '@/components/ui/button';
import { getAllEvents } from '@/lib/actions/event.actions';
// import { createUser } from '@/lib/actions/user.actions';
import { SearchParamProps } from '@/types';
// import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
// import { redirect } from 'next/navigation';
import React from 'react'

export default async function HomePage ({searchParams}:SearchParamProps)  {

  const page=Number(searchParams?.page) || 1;
  const category=(searchParams?.category as string) || "";
  const searchText=(searchParams?.query as string) || "";


  const events=await getAllEvents({
    query:searchText,
    category,
    limit:3,
    page
  })

  
  return (
    <>
      <section className='  bg-dotted-pattern bg-cover '>
         <div className=' wrapper gap-6 xl:gap-0 grid grid-cols-1 md:grid-cols-2'>
            <div className=" flex flex-col justify-center gap-8 ">
              <h1 className=" font-bold text-3xl text-wrap"> Host, Connect, 
                Celebrate: <br /> Your Events, Our Platform!</h1>
              <p className=" text-wrap text-lg">Book and learn helpful
                   tips from 3,168+ mentors <br /> in world-class companies
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
      <section className=' wrapper my-8 flex flex-col gap-5 '>
          <h2 className=' font-bold text-2xl'>Related Events</h2>
          <div className=' flex flex-col gap-5 md:flex-row'>
            <Search placeholder='Search title' />
            <CateogoryFilter />
          </div>

          <Collection
            data={events?.data}
            collectionType='All_events'
            totalPages={events?.totalPages}
            limit={4}
            page={page}
            subTitle="No events found"
          />
      </section>
    </>
  )
}
