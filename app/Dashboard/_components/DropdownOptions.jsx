import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { HiOutlineTrash } from 'react-icons/hi'
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
  

const DropdownOptions = ({children,deleteCourse}) => {
 const [open,setOpen]=useState(false);
 

  return (
    <div>
    <DropdownMenu>
  <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
  <DropdownMenuContent>

    <DropdownMenuItem onClick={()=>setOpen(true)}>
    <div className='flex items-center gap-1'>
    <HiOutlineTrash />Delete
    </div>
    </DropdownMenuItem>
    
  </DropdownMenuContent>
</DropdownMenu>

<AlertDialog open={open}>
  
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={()=>setOpen(false)}>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>{deleteCourse();setOpen(false)}} >Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

</div>
  )
}

export default DropdownOptions
