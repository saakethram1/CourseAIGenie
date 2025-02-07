import React from 'react'
import AddCourse from './AddCourse'
import { CourseList } from '@/configs/Schema1'
import UserCourseList from './UserCourseList'
import Image from 'next/image'
import { HiOutlineBookOpen } from 'react-icons/hi'
import { HiMiniEllipsisVertical } from 'react-icons/hi2'
import DropdownOptions from './DropdownOptions'
import { db } from '@/configs/db'
import { eq } from 'drizzle-orm'
import Link from 'next/link'

const CourseCard = ({course,refreshData,displayUser=false}) => {

    const deleteCourse=async()=>{
        const resp=await db.delete(CourseList)
        .where(eq(CourseList.id,course?.id))
        .returning({id:CourseList?.id})

        if(resp){
            refreshData()
        }
    }


  return (
    <div className='shadow-sm rounded-lg border p-2 hover:scale-105 hover:bg-primary hover:bg-opacity-60 transition-all cursor-pointer mt-4'>
    <Link href={'/course/'+course?.courseId}>
      <Image src={course?.courseBanner} width={300} height={300}
        className='w-full h-[120px] mt-3 rounded-lg'
      />
      </Link>
      <div className='p-2 mt-2'>
        <h2 className='font-medium text-lg flex justify-between items-center'>{course?.courseOutput?.CourseName} 
       {!displayUser && <DropdownOptions deleteCourse={()=>deleteCourse()}><div className=' hover:bg-slate-800 rounded-sm hover:bg-opacity-30'><HiMiniEllipsisVertical /></div> 
        </DropdownOptions>}
        </h2>

        <p className='text-sm text-gray-400 my-1'>{course?.category}</p>
        <div className='flex items-center justify-between'>
            <h2 className='flex gap-2 items-center p-1 bg-purple-50 text-primary text-sm rounded-sm'><HiOutlineBookOpen /> {course?.courseOutput?.NoOfChapters}</h2>
            <h2 className='text-sm bg-purple-50 text-primary p-1 rounded-sm'>{course?.level}</h2>
        </div>
       {displayUser && <div className='flex gap-2 items-center mt-2'>
        <Image className='rounded-full' src={course?.userProfileImage} width={35} height={35 } />
        <h2 className='text-sm'>{course?.userName}</h2>
        </div>}
      </div>
    </div>
  )
}

export default CourseCard
