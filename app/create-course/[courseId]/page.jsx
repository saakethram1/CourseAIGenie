"use client"
import { Chapters, CourseList } from '@/configs/Schema1'
import { useUser } from '@clerk/nextjs'
import React, { useEffect ,useState} from 'react'
import {and,eq} from 'drizzle-orm'
import {db} from '@/configs/db'
import CourseBasicInfo from './_components/CourseBasicInfo'
import CourseDetail from './_components/CourseDetail'
import ChapterList from './_components/ChapterList'
import { Button } from '@/components/ui/button'
import {GenerateChapterContent_AI} from '@/configs/AiModel'
import LoadingDialog from '../_components/LoadingDialog'
import service from '@/configs/service'
import { useRouter } from 'next/navigation'

const CourseLayout = ({params}) => {
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
  const GenerateChapterContent=()=>{
    setLoading(true);
    console.log(loading);
     const chapters=course?.courseOutput?.Chapters;
     chapters.forEach(async(chapter,index)=>{
      const PROMPT='Explain the concept in Detail on Topic:'+course?.name+',Chapter:'+chapter?.ChapterName+', in JSON Format with list of array, with field as title,explanation on given chapter in detail, Code Example(Code field in precode format) if applicable'
      console.log(PROMPT);
    //  if(index<3){
        try{
         let videoId='';
          //Genrate Video URL
          service.getVideos(course?.name+':'+chapter?.ChapterName).then(resp=>{
            console.log(resp);
            videoId=resp[0]?.id?.videoId
          })
          //Generate Chapter Content
            const res=await GenerateChapterContent_AI.sendMessage(PROMPT);
            console.log(res?.response?.text());
           const content=JSON.parse(res?.response?.text());
          
           //Save Chapter content +video Url
           await db.insert(Chapters).values({
            chapterId:index,
            courseId:course?.courseId,
            content:content,
            videoId:videoId
           })
           setLoading(false);
        }
        catch(e){
          setLoading(false);
           console.log(e);
        }
        await db.update(CourseList).set({
          publish:true
        })
        router.replace('/create-course/'+course?.courseId+"/finish")
    //  }
     })
  }

  return (
    <div className='mt-10 px-7 md:px-20 lg:px-44'>
     <h2 className='font-bold text-center text-2xl'>Course Layout</h2>
     {/*Basic Info */}
     <LoadingDialog loading={loading} />
     <CourseBasicInfo course={course} refreshData={()=>GetCourse()}/>
     <CourseDetail course={course}/>
     <ChapterList  course={course} refresh={()=>GetCourse()}/>
     <Button onClick={GenerateChapterContent} className='my-10'>Generate Course Content</Button>
    </div>
  )
}

export default CourseLayout
