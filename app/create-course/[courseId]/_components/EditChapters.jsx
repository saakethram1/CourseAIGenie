import React,{useEffect, useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from "@/components/ui/dialog"
import { HiPencilSquare } from 'react-icons/hi2'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { db } from '@/configs/db'
import { eq ,and} from 'drizzle-orm' 
import { CourseList } from '@/configs/Schema1'
const EditChapters = ({course,index,refresh}) => {

    const chapter=course?.courseOutput?.Chapters;
    const [name,setName]=useState();
    const [about,setAbout]=useState();
    useEffect(()=>{
        setName(chapter[index].ChapterName);
        setAbout(chapter[index].about)
    },[course])

    const onUpdateHandler=async()=>{
        course.courseOutput.Chapters[index].ChapterName=name;
        course.courseOutput.Chapters[index].about=about;
     const result =await db.update(CourseList).set({
                courseOutput:course?.courseOutput
            }).where(eq(CourseList?.id,course?.id))
            .returning({id:CourseList.id});
        console.log(course);
       refresh();
    }


  return (
    <Dialog>
  <DialogTrigger><HiPencilSquare /></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Chapter</DialogTitle>
      <DialogDescription>
        <div className='mt-3'>
                   <label>Course Title</label>
                   <Input onChange={(event)=>setName(event.target.value)}
                    defaultValue={chapter[index].ChapterName} />
               </div>
               <div>
                   <label>Description</label>
                   <Textarea defaultValue={chapter[index].about}
                   onChange={(event)=>setAbout(event.target.value)}
                    className='h-40' />
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

export default EditChapters
