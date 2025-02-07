"use client"
import React ,{useEffect, useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    
  } from "@/components/ui/dialog"
  import { HiPencilSquare } from 'react-icons/hi2'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { DialogClose } from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { CourseList } from '@/configs/Schema1'
import { db } from '@/configs/db'
import { eq ,and} from 'drizzle-orm' 
const EditCourseBasicInfo = ({course,refreshData}) => {

    const [name,setName]=useState();
    const [description,setDescription]=useState();

    useEffect(()=>{
    setName(course?.courseOutput?.CourseName);
     setDescription(course?.courseOutput?.Description);
    },[course])

    
    const onUpdateHandler=async()=>{
        course.courseOutput.CourseName=name;
        course.courseOutput.Description=description
        const result =await db.update(CourseList).set({
            courseOutput:course?.courseOutput
        }).where(eq(CourseList?.id,course?.id))
        .returning({id:CourseList.id});

        console.log(course,"updated")
        refreshData();
    }

  return (
    
      <Dialog>
  <DialogTrigger><HiPencilSquare /></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Course Title & Description</DialogTitle>
      <DialogDescription>
        <div className='mt-3'>
            <label>Course Title</label>
            <Input onChange={(event)=>setName(event.target.value)}
             defaultValue={course?.courseOutput?.CourseName} />
        </div>
        <div>
            <label>Description</label>
            <Textarea onChange={(event)=>setDescription(event.target.value)}
             className='h-40'
            defaultValue={course?.courseOutput?.Description} />
        </div>

      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
        <DialogClose>
            <Button onClick={onUpdateHandler}>Update</Button>
        </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

    
  )
}

export default EditCourseBasicInfo
