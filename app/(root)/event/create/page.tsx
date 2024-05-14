import EventForm from '@/components/shared/EventForm';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const CreateEvent = () => {
  const {sessionClaims}=auth();

  const userId=sessionClaims?.userId as string;

  console.log('sessionClaims',sessionClaims);

  return (
    <>
      <section className='wrapper'>
        <h1 className=' font-semibold px-5 text-2xl '>Create Event</h1>
      </section>
      <div className=' wrapper my-8'>
        <EventForm type='Create' userId={userId} />
      </div>
    </>
  ) 
}

export default CreateEvent;