"use client"

import React from 'react'
import { Button } from '../ui/button'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, MoveLeft, MoveRightIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery } from '@/lib/utils'

interface PaginationProps {
  page:number | string,
  totalPages:number,
  urlParamName?:string
}

const Pagination = ({page,totalPages,urlParamName}:PaginationProps) => {

  const router=useRouter();
  const searchParams=useSearchParams();

  const handleClick=(btnType:string)=> {
    const pageValue=btnType==='pre' ? Number(page)-1 : Number(page)+1;

    const newUrl=formUrlQuery({
      params:searchParams.toString(),
      key:urlParamName || 'page',
      value:pageValue.toString()
    })
    router.push(newUrl,{scroll:false});

  }
  return (
    <div className=' flex flex-row gap-4 flex-end'>
      <Button
        variant='none'
        disabled={Number(page)<=1}
        className='w-28 font-bold'
        onClick={()=> handleClick('pre')}
      >
        <ChevronLeft />
      </Button>
      <p className=' flex-center'>{page}</p>
      <Button
        variant='none'
        disabled={Number(page)>=totalPages}
        className=' w-28 font-bold'
        onClick={()=> handleClick('nxt')}
      >
        <ChevronRight />
      </Button>
    </div>
  )
}

export default Pagination