"use client"
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/Schema1'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'
const CourseStart = ({params}) => {

  const[course,setCourse]=useState();
  const[selectedChapter,setSelectedChapter]=useState();
  const[content,setContent]=useState();
    useEffect(()=>{
     GetCourse()
    },[])

    /**
     * Used to get Course Info By COurse Id
     */

    const GetCourse=async()=>{
        const result=await db.select().from(CourseList)
        .where(eq(CourseList?.courseId,params?.courseId))
       setCourse(result[0]);
       GetSelectedChapterContent(0);
    }
    const GetSelectedChapterContent=async(chapterId)=>{
    
        const result=await db.select().from(Chapters)
        .where(and(eq(Chapters.chapterId,chapterId),
        eq(Chapters.courseId,course?.courseId)))

        setContent(result[0])
       console.log("res",result);

    }

  return (
    <div className='flex flex-col'>
     <div className='fixed md:w-72 hidden md:block h-screen border-r shadow-sm '>
       <h2 className='font-medium text-lg bg-primary p-3 text-white'>{course?.courseOutput?.CourseName}</h2>
    

     <div>
       {course?.courseOutput?.Chapters.map((chapter,index)=>(
        <div key={index} onClick={()=>{setSelectedChapter(chapter);GetSelectedChapterContent(index)}}
         className={`cursor-pointer hover:bg-purple-50 ${selectedChapter?.ChapterName==chapter?.ChapterName && 'bg-purple-100'} `}>
        <ChapterListCard chapter={chapter} index={index}/>
        </div>
       ))}
     </div>
     </div>
     <div className='md:ml-72' >
        <ChapterContent chapter={selectedChapter} content={content}/>
     </div>
    </div>
  )
}

export default CourseStart
