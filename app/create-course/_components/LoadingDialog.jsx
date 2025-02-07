import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Image from 'next/image'
  
const LoadingDialog = ({loading}) => {
  return (
    <AlertDialog open={loading}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogDescription>
       <div className='flex flex-col items-center py-10'>
        <Image src={'/rocket.gif'} width={100} height={100} />
        <h2>Please Wait..... Genie 🧞 is Working on your Course</h2>
       </div>
      </AlertDialogDescription>
    </AlertDialogHeader>
  </AlertDialogContent>
</AlertDialog>

  )
}

export default LoadingDialog
