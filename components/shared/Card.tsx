"use client"

import { IEvent } from '@/lib/database/models/event.model'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import DeleteCard from './DeleteCard'
import Link from 'next/link'
import { formatDateTime } from '@/lib/utils'

interface CardProps {
  event:IEvent
}

const Card = ({event}:CardProps) => {

  const router=useRouter();

  return (
    <div className=' flex flex-col relative min-h-[380px] w-full max-w-[400px] 
      rounded-2xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer bg-gray-50'>
      <div className=' rounded-full backdrop-blur-0 bg-transparent '>
        <Link href={`/event/${event._id}`} className=' w-full'>
          <Image
            src={event.imageUrl}
            height={200}
            width={380}
            className=' object-cover w-full h-full'
            alt='image'
          />
        </Link>
        <div className=' absolute top-2 right-2 px-1 py-1 bg-white rounded-xl cursor-pointer flex-1 '>
          <Image 
            onClick={()=> router.push(`/event/${event._id}/update`) } 
            src='/assets/icons/edit.svg' 
            height={20}
            width={20} 
            className='' 
            alt='edit'  
          />
          <DeleteCard eventId={event._id} />
        </div>
      </div>
      <div className=' flex flex-col gap-2 w-full h-full my-3 bg-grey-50 px-2'>
        <div className=' flex gap-4'>
           <p className=' rounded-3xl bg-green-500/10 text-green-600 px-4 py-2'>
            {event.isFree ? 'Free':`${event.price}`}
           </p>
           <p className=' rounded-3xl bg-grey-500/10 text-grey-600 px-4 py-2'>
             {event.cateogory.name}
           </p>
        </div>
        <p className=' text-sm flex gap-1'>
          <Image src='/assets/icons/calendar.svg' height={24} width={24} alt='image' />
          <span>
            {formatDateTime(event.startDateTime).dateOnly} - {formatDateTime(event.startDateTime).timeOnly}
          </span>
        </p>
        <p className=' font-semibold text-lg my-1'>{event.title}</p>
        <div className=' flex-between w-full'>
           <p className=' text-grey-500'>
            {event.organizer.firstName} {event.organizer.lastName}
           </p>
        </div>
      </div>
    </div>
  )
}

export default Card