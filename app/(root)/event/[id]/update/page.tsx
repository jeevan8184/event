
import EventForm from '@/components/shared/EventForm'
import { getEventById } from '@/lib/actions/event.actions'
import { getUserByClerkId } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

type UpdateParams= {
  params:{
    id:string
  }
}

const UpdateEvent = async({params:{id}}:UpdateParams) => {

  const user=await currentUser();
  if(!user) redirect('/sign-in');

  const newUser=await getUserByClerkId(user?.id);
  const event=await getEventById(id);

  return (
    <div className=' wrapper flex flex-col gap-5 my-5'>
      <h2 className=' font-semibold text-xl'>Update Event</h2>

      <EventForm 
        userId={newUser._id}
        eventId={event._id}
        event={event}
        type='Update'
      />
    </div>
  )
}

export default UpdateEvent;