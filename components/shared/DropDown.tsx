
import React, { startTransition, useEffect,useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ICateogory } from '@/lib/database/models/cateogory.model';
import { Input } from '../ui/input';
import { createCateogory, getAllCateogorys } from '@/lib/actions/cateogory.actions';

interface DropdownProps {
  value?:string;
  handleChange?:()=>void;
}

const DropDown = ({value,handleChange}:DropdownProps) => {
  const [cateogories, setCateogories] = useState<ICateogory[]>([]);
  const [newCateogory, setNewCateogory] = useState('');

  const handleAdd=async()=> {

    if(newCateogory.trim() !=='') {
      const addedCat=await createCateogory({cateogoryName:newCateogory.trim()});
      
      setCateogories((prev)=> [...prev,addedCat]);
    }
  };

  useEffect(()=> {
    const newFunc=async()=> {
      const allCats=await getAllCateogorys();
      allCats && setCateogories(allCats as ICateogory[]);
      console.log('cateogories',cateogories);
    }
    newFunc();
  },[]);
  

  return (
    <Select onValueChange={handleChange} defaultValue={value}>
      <SelectTrigger className="w-[400px] input">
        <SelectValue placeholder="cateogory" />
      </SelectTrigger>
      <SelectContent className='select'>
        {cateogories.length>0 && cateogories.map((cateogory,i)=> (
          <SelectItem value={cateogory._id} key={i} className='select-item '>
            {cateogory.name}
          </SelectItem>
        ))}
        <AlertDialog>
          <AlertDialogTrigger className=' text-blue-500 select-item'>Add new cateogory</AlertDialogTrigger>
          <AlertDialogContent className=" bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Cateogory</AlertDialogTitle>
              <AlertDialogDescription>
                <Input 
                  placeholder='eg:development'
                  value={newCateogory}
                  onChange={(e)=>setNewCateogory(e.target.value)}
                  className='input'
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className=' cancel'>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={()=> startTransition(handleAdd)} className='continue '>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>


  )
}

export default DropDown