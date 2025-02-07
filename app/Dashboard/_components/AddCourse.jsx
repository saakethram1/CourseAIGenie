"use client"
import { UserCourseListContext } from '@/app/_context/UserCourseList';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import Link from 'next/link';
import React, { useContext } from 'react'

const AddCourse = () => {
    const {user}=useUser();
    const {userCourseList,setUserCourseList}=useContext(UserCourseListContext)

  return (
    <div  className='flex justify-between items-center'>
     <div>
        <h2  className='text-2xl'>Hello,<span className='font-bold'> {user?.fullName}</span></h2>
       
        <p className='text-sm text-gray-500'>Create new Course with AI, Share with friends and Earn</p>
     </div>
     <Link href={userCourseList>10?'/Dashboard/upgrade':'/create-course'}>
     <Button>+ Create AI Course</Button>
     </Link>
    </div>
  )
}

export default AddCourse
