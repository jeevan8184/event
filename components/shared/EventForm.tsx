"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, 
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import DatePicker from 'react-datepicker'

import { IEvent } from '@/lib/database/models/event.model';
import React, { useState } from 'react'
import { eventFormSchema } from "../../lib/Validations"
import { eventDefaultVals } from "@/constants"
import { Textarea } from "../ui/textarea"
import DropDown from "./DropDown"
import FileUploader from "./FileUploader"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Checkbox } from "../ui/checkbox"
import { useUploadThing } from "@/lib/uploadthing"
import { handleError } from "@/lib/utils"
import { createEvent, updateEvent } from "@/lib/actions/event.actions"

interface EventProps {
    userId:string,
    type:'Create' | 'Update',
    event?:IEvent,
    eventId?:string
}

const EventForm = ({userId,type,event,eventId}:EventProps) => {

  const initialValues=eventDefaultVals;
  const router=useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const {startUpload}=useUploadThing('imageUploader');

    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValues
      })
     
    async function onSubmit(values: z.infer<typeof eventFormSchema>) {
        console.log("values",values);

        let userImage=values.imageUrl;

        if(files.length>0) {
          const imgRes=await startUpload(files);
          console.log('imgRes',imgRes);

          if(!imgRes) return;

          userImage=imgRes[0]?.url;
        }

        if(type==='Create') {
          try {
            const event=await createEvent({
              userId,
              event:{...values,imageUrl:userImage,categoryId:values.cateogoryId},
              path:'/profile'
            })
            router.push(`/event/${event._id}`)
          } catch (error) {
            console.log(error);
            handleError(error);
          }
        }
        if(type==='Update') {
          try {
            const event=await updateEvent({
              userId,
              event:{...values,imageUrl:userImage,categoryId:values.cateogoryId,_id:eventId!},
              path:'/profile'
            })
            router.push(`/event/${event._id}`);
            
          } catch (error) {
            console.log(error);
            handleError(error);
          }
        }
    }
      

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col gap-5">
      <div className=" flex flex-col gap-4 md:flex-row ">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className=" w-full">
              <FormLabel className=" mx-4 text-[18px] font-semibold ">title</FormLabel>
              <FormControl>
                <Input placeholder="title.." {...field} className=" input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cateogoryId"
          render={({ field }) => (
            <FormItem className=" w-full">
              <FormLabel className="mx-4 text-[18px] font-semibold">cateogory</FormLabel>
              <FormControl>
                <DropDown
                  value={field.value}
                  handleChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className=" flex flex-col gap-4 md:flex-row mb-5 ">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className=" w-full h-72 mb-4">
              <FormLabel className="mx-4 text-[18px] font-semibold">description</FormLabel>
              <FormControl>
                <Textarea placeholder="description.." {...field} className=" textarea h-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className=" w-full h-72">
              <FormLabel className="mx-4 text-[18px] font-semibold">Drop Your photo here</FormLabel>
              <FormControl>
                <FileUploader 
                  imageUrl={field.value}
                  handleChange={field.onChange}
                  setFiles={setFiles}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className=" flex flex-col gap-4 md:flex-row">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className=" w-full">
              <FormLabel className="mx-4 text-[18px] font-semibold">Add Your location</FormLabel>
              <FormControl>
                <div className=" flex-center h-[50px] bg-gray-50 px-4 py-3 overflow-hidden rounded-full ">
                  <Image
                    src='/assets/icons/location-grey.svg'
                    alt="location"
                    height={24}
                    width={24}
                  />
                  <Input {...field} placeholder="location" className="input " />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className=' flex flex-col gap-4 md:flex-row'>
        <FormField
          control={form.control}
          name="startDateTime"
          render={({ field }) => (
            <FormItem className=" w-full">
              <FormLabel className="mx-4 text-[18px] font-semibold">Select start Datetime</FormLabel>
              <FormControl>
                <div className=" flex-center h-[50px] gap-2 rounded-full px-5 py-3 bg-gray-50 overflow-hidden ">
                  <Image
                    src='/assets/icons/calendar.svg'
                    alt="calendar"
                    height={24}
                    width={24}
                  />
                  <p className=" flex whitespace-nowrap text-gray-600"> Start date: </p>
                  <DatePicker
                    selected={field.value}
                    onChange={(date:Date)=> field.onChange(date)}
                    showTimeSelect
                    timeInputLabel="time"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    wrapperClassName=" w-full border-none"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDateTime"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="mx-4 text-[18px] font-semibold">Select End Datetime</FormLabel>
              <FormControl>
                <div className=" flex-center h-[50px] gap-2 rounded-full px-5 py-3 bg-gray-50 overflow-hidden ">
                  <Image
                    src='/assets/icons/calendar.svg'
                    alt="calendar"
                    height={24}
                    width={24}
                  />
                  <p className=" flex whitespace-nowrap text-gray-600"> End date: </p>
                  <DatePicker
                    selected={field.value}
                    onChange={(date:Date)=> field.onChange(date)}
                    showTimeSelect
                    timeInputLabel="time"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    wrapperClassName=" w-full border-none"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className=" flex flex-col gap-5 md:flex-row">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className=" w-full">
              <FormLabel className="mx-4 text-[18px] font-semibold">Add price</FormLabel>
              <FormControl>
                <div className=" flex-center h-[50px] bg-gray-50 px-4 py-3 overflow-hidden rounded-full ">
                  <Image
                    src='/assets/icons/dollar.svg'
                    alt="location"
                    height={24}
                    width={24}
                  />
                  <Input {...field} placeholder="price" type="number" className="input " />
                  <FormField
                    control={form.control}
                    name="isFree"
                    render={({ field }) => (
                      <FormItem className=" w-full">
                        <FormControl>
                          <div className=" flex-center ">
                            <label className="">isFree</label>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              id="isFree"
                              className=" m-2 h-5 w-5 border-primary-500"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className=" w-full">
              <FormLabel className="mx-4 text-[18px] font-semibold">description</FormLabel>
              <FormControl>
                <Input placeholder="URL.." {...field} className=" input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      </div>


      <div className=' w-full flex-between '>
        <Button className=" rounded-full px-6 bg-gray-500 text-white"
          onClick={()=> {
            form.reset();
            router.push('/');
          }}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className=" rounded-full px-6 text-white"
          disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? `${type}ing Event` : `${type} Event`}
        </Button>
      </div>
    </form>
  </Form>
  )
}

export default EventForm;