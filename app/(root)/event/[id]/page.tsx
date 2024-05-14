import { getEventById } from '@/lib/actions/event.actions'
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'

const page =async ({params}:{params:{id:string}}) => {

    const event=await getEventById(params.id);
    // console.log('event',event);
  return (
    <>
        <section className='wrapper flex-center px-4 py-5 bg-primary-50 bg-dotted-pattern bg-contain'>
            <div className=' grid grid-cols-1 md:grid-cols-2  '>
                <Image
                    src={event?.imageUrl}
                    height={1000}
                    width={1000}
                    alt='image'
                    className=' min-h-[200px] object-cover flex-center rounded-xl'
                />
                <div className=' flex flex-col gap-4 md:ml-4 max-md:mt-4'>
                    <div className=' flex flex-col gap-4'>
                        <h2 className=' font-semibold text-2xl'>{event.title}</h2>
                        <div className=' flex flex-row gap-3'>
                            <p className='px-5 py-1.5 rounded-full bg-green-500/10 text-green-700'>
                                {event.isFree ? 'Free' :`${event.price}`}
                            </p>
                            <p className=' px-5 py-1.5 rounded-full bg-grey-500/10 text-grey-500'>
                                {event.cateogory.name}
                            </p>
                        </div>
                        <div className=' ml-2'>
                            <p className=''>
                                by {' '}
                                <strong>{event.organizer?.firstName} {event.organizer?.lastName}</strong>
                            </p>
                        </div>
                        <div className=' flex flex-row gap-4'>
                            <Image src='/assets/icons/calendar.svg' height={32} width={32} alt='calendar' />
                            <div className=' flex flex-col flex-wrap items-center'>
                                <p className=''>
                                    {formatDateTime(event.startDateTime).dateOnly} - {formatDateTime(event.startDateTime).timeOnly}
                                </p>
                                <p className=''>
                                    {formatDateTime(event.endDateTime).dateOnly} - {formatDateTime(event.endDateTime).timeOnly}
                                </p>
                            </div>
                        </div>
                        <div className=' flex gap-2 items-center '>
                            <Image src='/assets/icons/location.svg' height={32} width={32} alt='location' />
                            <p className='font-[600] '>{event.location}</p>
                        </div>
                    </div>

                    <div className=' flex flex-col gap-2'>
                        <p className=' font-[600]'>What you will learn ? </p>
                        <p className=''>{event.description}</p>
                        <p className=' text-blue-700 cursor-pointer underline'>{event.url}</p>
                    </div>
                </div>
            </div>
        </section>
    </>
    
  )
}

export default page