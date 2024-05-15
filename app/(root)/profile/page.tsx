
import Collection from '@/components/shared/Collection';
import { Button } from '@/components/ui/button';
import { getEventsByUser } from '@/lib/actions/event.actions';
import { getUserByClerkId } from '@/lib/actions/user.actions';
import { SearchParamProps } from '@/types'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const ProfilePage =async ({searchParams}:SearchParamProps) => {

  const user=await currentUser();
  if(!user) redirect('/sign-in');

  const newUser=await getUserByClerkId(user?.id);
  const events=await getEventsByUser({
    userId:newUser._id,
    limit:3,
    page:1
  })

  return (
    <>
      {/* My events */}
      <section className=' bg-primary-50 bg-dotted-pattern bg-cover bg-center my-4'>
         <div className=' wrapper my-8 flex-center max-sm:flex-col sm:justify-between'>
           <h2 className=' font-semibold text-xl'>My events</h2>
            <Link href='/event/create'>
              <Button 
                className=' rounded-full bg-blue-500 text-white'
              >
                create Event
              </Button>
            </Link>
         </div>
      </section>

      <section className=' wrapper my-4'>
        <Collection
          data={events?.data}
          totalPages={events?.totalPages}
          limit={3}
          page={1}
          collectionType='My_events'
          subTitle='No events you have created'
        />
      </section>
    </>
  )
}

export default ProfilePage