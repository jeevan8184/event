import EventForm from '@/components/shared/EventForm';
import { getUserByClerkId } from '@/lib/actions/user.actions';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const CreateEvent = async() => {
  // const {sessionClaims}=auth();

  // const userId=sessionClaims?.userId as string;

  const user=await currentUser();

  if(!user) redirect('/sign-in');

  const newUser=await getUserByClerkId(user?.id);

  return (
    <>
      <section className='wrapper'>
        <h1 className=' font-semibold px-5 text-2xl '>Create Event</h1>
      </section>
      <div className=' wrapper my-8'>
        <EventForm type='Create' userId={newUser._id} />
      </div>
    </>
  ) 
}

export default CreateEvent;

