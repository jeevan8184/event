"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'


const Search = ({placeholder='Search title'}:{placeholder:string}) => {
  const [text, setText] = useState('');
  const router=useRouter();
  const searchParams=useSearchParams();
  

  useEffect(()=> {
    let newUrl='';

    const queryFn=setTimeout(()=> {
      if(text) {
        newUrl=formUrlQuery({
          params:searchParams.toString(),
          key:'query',
          value:text
        })
      }else {
        newUrl=removeKeysFromQuery({
          params:searchParams.toString(),
          keysToRemove:['query']
        })
      }
      console.log('newUrl',newUrl);
      router.push(newUrl,{scroll:false});
    },300);

    return ()=> clearTimeout(queryFn);

  },[text,router,searchParams]);

  return (
    <div className=' flex gap-2 input items-center '>
      <Image src='/assets/icons/search.svg' alt='search' height={24} width={24} className='' />
      <Input
        placeholder={placeholder}
        value={text}
        onChange={(e)=> setText(e.target.value)}
        className=' w-full input'
      />
    </div>
  )
}

export default Search