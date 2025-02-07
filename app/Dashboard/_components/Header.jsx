import React from 'react'
import {Button}  from '@/components/ui/button'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
function Header() {
  return (
    
     <div className='flex justify-between p-4  shadow-md'>
     <Image className='h-10 w-10' alt='logo' src={'/logo2.svg'} width={50} height={10}/>
     <UserButton/>
    </div>
    
  )
}

export default Header
