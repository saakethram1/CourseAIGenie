"use client"
import { db } from '@/configs/db';
import { CourseList } from '@/configs/Schema1';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from '../_components/CourseBasicInfo';
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';

const FinishScreen = ({params}) => {
    const {user}=useUser();
const [course,setCourse]=useState([]);
const [loading,setLoading]=useState(false);
const router=useRouter()
  useEffect(()=>{
    params && GetCourse()
  },[params,user])

  const GetCourse=async()=>{
    
    const result=await db.select().from(CourseList)
    .where(and(eq(CourseList.courseId,params?.courseId),
    eq(CourseList?.createdBy,user?.primaryEmailAddress?.emailAddress)))
    setCourse(result[0]);
     console.log(result);
    
  }
  return (
    <div className='px-10 md:px-20 lg:px-44 my-7'>
    <h2 className='text-center font-bold text-2xl my-3 text-primary'>Congrats Your Course is Ready</h2>

    
    <CourseBasicInfo course={course} refreshData={()=>console.log()}/>
    <h2 className='mt-3'>Course URL:</h2>
    <h2 className='text-center text-gray-400 border p-2 round flex gap-5 items-center'>{process.env.NEXT_PUBLIC_HOST_NAME}/course/view/{course?.courseId} <HiOutlineClipboardDocumentCheck onClick={async()=>await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_HOST_NAME+"/course/view/"+course?.courseId) }
     className='h-5 w-5 cursor-pointer hover:text-primary' /></h2>
      
    </div>
  )
}

export default FinishScreen
