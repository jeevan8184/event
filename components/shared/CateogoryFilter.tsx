"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ICateogory } from '@/lib/database/models/cateogory.model'
import { getAllCateogorys } from '@/lib/actions/cateogory.actions'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'

const CateogoryFilter = () => {
  const router=useRouter();
  const searchParams=useSearchParams();

  const [cateogories, setCateogories] = useState<ICateogory[]>([]);

  useEffect(()=> {
    const newFunc=async()=> {
      const allCats=await getAllCateogorys();
      allCats && setCateogories(allCats as ICateogory[]);
    }
    newFunc();
  },[])

  const onSelectCategory = (category: string) => {
    let newUrl = '';

    if(category && category !== 'All') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'category',
        value: category
      })
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['category']
      })
    }

    router.push(newUrl, { scroll: false });
}

  return (
    <Select onValueChange={(value:string)=> onSelectCategory(value)}>
      <SelectTrigger className="w-[300px] input">
        <SelectValue placeholder="search category" />
      </SelectTrigger>
      <SelectContent className=' bg-white rounded-2xl border-none flex flex-col gap-1'>
      <SelectItem value="All" className="select-item p-regular-14 pl-5">All</SelectItem>
        {cateogories.map((cat)=> (
          <SelectItem key={cat._id} value={cat.name} className=' select-item cursor-pointer my-0.5 px-4 py-1 rounded-lg'>
            {cat.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

  )
}

export default CateogoryFilter