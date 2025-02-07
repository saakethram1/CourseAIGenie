import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {HiOutlinePuzzle} from "react-icons/hi";
import { Button } from '@/components/ui/button';
import EditCourseBasicInfo from './EditCourseBasicInfo'
import {getDownloadURL, ref,uploadBytes} from 'firebase/storage'
import {storage} from '@/configs/firebaseConfig'
import { CourseList } from '@/configs/Schema';
import { db } from '@/configs/db'
import { eq ,and} from 'drizzle-orm' 
import Link from 'next/link';
const CourseBasicInfo = ({course,refreshData,edit=true}) => {
    const [selectedFile,setSelectedFile]=useState();
     useEffect(()=>{
        if(course){
            setSelectedFile(course?.courseBanner)
        }
     },[course])
   /**
    * Select file and Upload to Firebase Storage
    * @param {*} event 
    */

    const onFileSelected=async(event)=>{
        const file=event.target.files[0];
        setSelectedFile(URL.createObjectURL(file))
        const fileName=Date.now()+'.jpg'
        const storageRef=ref(storage,'course-ai/'+fileName)
        
        await uploadBytes(storageRef, file);
        console.log("File uploaded successfully!");
  
        // Get download URL
        const downloadUrl = await getDownloadURL(storageRef);
        console.log("Download URL:", downloadUrl);
  
        // Ensure `course.id` is defined before executing the query
        if (!course?.id) {
          console.error("Invalid course ID");
          return;
        }
  
        // Debugging: Log the query before executing
        console.log(
          `Executing SQL: UPDATE CourseList SET courseBanner = '${downloadUrl}' WHERE id = '${course.id}';`
        );
  
        // Update database
        await db.update(CourseList)
          .set({ courseBanner: downloadUrl })
          .where(eq(CourseList.id, course.id));// ✅ Corrected where condition
          
  
        console.log("Database updated successfully!");
    }
  return (
    <div className='p-8 border rounded-xl shadow-sm mt-5 '>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div>
             <h2 className='font-bold text-3xl'>{course?.courseOutput?.CourseName}{edit && <EditCourseBasicInfo course={course} refreshData={refreshData} />}</h2>
             <p className='text-sm text-gray-500 mt-3'>{course?.courseOutput?.Description}</p>
             <h2 className='font-medium mt-4 flex gap-2 items-center text-primary'><HiOutlinePuzzle />{course?.category}</h2>
           {!edit && <Link href={'/course/'+course?.courseId+"/start"}>
             <Button className='w-full mt-5'>Start</Button>
             </Link>}
        </div>
        <div className=''>
          <label htmlFor='upload-image'>
            <Image className='rounded-xl w-full h-[250px] cursor-pointer hover:opacity-25'
            src={selectedFile?selectedFile: '/photo.svg'} width={300} height={300}  />
            </label>
           {edit &&<input type="file" id="upload-image" className='opacity-0'
                onChange={onFileSelected}
            />}
        </div>
      </div>
    </div>
  )
}

export default CourseBasicInfo
