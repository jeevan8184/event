import Image from 'next/image';
import React, { Dispatch, SetStateAction, useCallback } from 'react'
import type {FilesWithPath} from '@uploadthing/react';
import { useDropzone } from '@uploadthing/react';
import {generateClientDropzoneAccept} from 'uploadthing/client'
import { Button } from '../ui/button';

interface FileProps {
  imageUrl:string;
  handleChange:()=>void;
  setFiles:Dispatch<SetStateAction<File[]>>;
}

const FileUploader = ({imageUrl,handleChange,setFiles}:FileProps) => {

  const onDrop=useCallback((acceptedFiles:FilesWithPath[])=> {
    setFiles(acceptedFiles);
    handleChange(URL.createObjectURL(acceptedFiles[0]));
  },[]);

  const {getRootProps,getInputProps}=useDropzone({
    onDrop,
    accept:'image/*'?generateClientDropzoneAccept(['image/*']):undefined
  })

  return (
    <div {...getRootProps()}
      className=' bg-gray-50 cursor-pointer flex-center overflow-hidden h-72 bg-dark-3 rounded-xl '
    >
      <input {...getInputProps} className='cursor-pointer' />
      {imageUrl ? (
        <Image
          src={imageUrl}
          height={250} 
          width={250}
          alt='object'
          className=' w-full object-cover object-center '
        />
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
          <Button type='button' className='rounded-full'>
            Select from computer
          </Button>
        </div>
      )}
    </div>
  )
}

export default FileUploader;