"use client"
import { db } from '@/configs/db'
import { CourseList } from '@/configs/Schema1'
import React, { useEffect ,useState} from 'react'
import CourseCard from '../_components/CourseCard'
import { Button } from '@/components/ui/button'

function Explore() {
const[courseList,setCourseList]=useState([])
const [pageindex,setPageIndex]=useState(0);
  useEffect(()=>{
    GetAllCourse();
  },[pageindex])
  const GetAllCourse=async()=>{
    const result=await db.select().from(CourseList)
    .limit(9)
    .offset(pageindex*9);

    setCourseList(result);
  }
  return (
    <div>
     <h2 className='font-bold text-3xl'>Explore More Projects</h2>
     <p>Explore More Project build with AI by Other Users</p>

     <div className='grid grid-cols-2 lg:grid-cols-3'>
      {
        courseList.map((course,index)=>(
          <div>
            <CourseCard course={course} displayUser={true}/>
          </div>
        ))
      }
     </div>
     <div className='flex justify-between mt-5'>
     {pageindex!=0 && <Button onClick={()=>setPageIndex(pageindex-1)}>Previous Page</Button>}
     <Button onClick={()=>setPageIndex(pageindex+1)}>Next Page</Button>
     </div>
    </div>
  )
}

export default Explore
