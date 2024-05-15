import { IEvent } from '@/lib/database/models/event.model'
import React from 'react'
import Card from './Card'
import Pagination from './Pagination'

interface collectionType {
  data:IEvent[],
  collectionType?:'All_events' | 'My_events'
  totalPages?:number,
  limit:number,
  page:number | string,
  subTitle:string
}

const Collection = ({data,collectionType,totalPages,limit,page,subTitle}:collectionType) => {
  return (
    <div className=''>
      {data.length>0 ? (
       <div className=' flex flex-col gap-8 items-center'>
          <ul className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full'>
            {data.map((event)=> {
              return (
                <li className=' flex justify-center' key={event._id}>
                  <Card event={event} />
                </li>
              )
            })}
          </ul>
          {totalPages &&  totalPages>1 && (
            <Pagination page={page} totalPages={totalPages} />
          )}
       </div>
      ):(
        <div className=' flex justify-center '>
          <p className=' font-semibold text-xl'>{subTitle}</p>
        </div>
      )}

    </div>
  )
}

export default Collection
