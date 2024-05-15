"use client"

import Image from 'next/image';
import React, { Dispatch, SetStateAction, useCallback } from 'react'
import { Button } from '../ui/button';
import type { FileWithPath } from '@uploadthing/react'
import { useDropzone } from '@uploadthing/react/hooks'
import { generateClientDropzoneAccept } from 'uploadthing/client'


interface FileProps {
  imageUrl:string;
  handleChange:()=>void;
  setFiles:Dispatch<SetStateAction<File[]>>;
}

const FileUploader = ({imageUrl,handleChange,setFiles}:FileProps) => {

  const onDrop=useCallback((acceptedFiles:FileWithPath[])=> {
    setFiles(acceptedFiles);
    handleChange( URL.createObjectURL(acceptedFiles[0]));
  },[]);

  const {getRootProps,getInputProps}=useDropzone({
    onDrop,
    accept:'image/*'?generateClientDropzoneAccept(['image/*']):undefined
  })

  return (
      <div 
        {...getRootProps()}
        className=' bg-gray-50 cursor-pointer flex-center flex-col overflow-hidden h-72 bg-dark-3 rounded-2xl '
      >
        <input {...getInputProps()} />
        {imageUrl ? (
           <div className=' relative w-full h-96 bg-gray-50 cursor-pointer overflow-hidden'>
           <Image
             src={imageUrl}
             layout='fill'
             objectFit='contain'
             objectPosition='center'
             alt='object'
             className='w-full h-full'
           />
         </div>
        ):(
          <div className=' flex-center flex-col cursor-pointer py-5 text-gray-500'>
            <Image
              src='/assets/icons/upload.svg'
              height={77}
              width={77}
              alt="upload"
            />
            <h1 className=''>Upload a photo here</h1>
            <p className=' font-semibold'>SVG,PNG ..</p>
            <Button type='button' className='rounded-full text-white'>
              Select from computer
            </Button>
          </div>
        )}
      </div>
  )
}

export default FileUploader;
