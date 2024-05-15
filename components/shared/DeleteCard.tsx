import { IEvent } from '@/lib/database/models/event.model'
import React, { useTransition } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { deleteEvent } from '@/lib/actions/event.actions'
import { Loader } from 'lucide-react'


const DeleteCard = ({eventId}:{eventId:string}) => {
  const pathname=usePathname();
  let [isPending,startTransition]=useTransition();
  
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Image src='/assets/icons/delete.svg' height={20} width={20} className='' alt="delete" />
      </AlertDialogTrigger>
      <AlertDialogContent className=' bg-white'>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to Delete?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className=' flex max-sm:flex-col '>
          <AlertDialogCancel className='cancel'>cancel </AlertDialogCancel>
          <AlertDialogAction className=' bg-red-500 rounded-full text-white border-none ' 
           onClick={() =>
            startTransition(async () => {
              await deleteEvent({ eventId, path: pathname })
            })
          }>
            {isPending ? `Deleting ${<Loader />}`:'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}


export default DeleteCard