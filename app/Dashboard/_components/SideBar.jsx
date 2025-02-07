'use client'
import Link from 'next/link';
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import React, { useContext } from 'react'
import { HiHome } from "react-icons/hi2";
import { HiSquare3Stack3D,HiFire,HiOutlinePower} from "react-icons/hi2";
import { Progress } from "@/components/ui/progress"
import { UserCourseListContext } from '@/app/_context/UserCourseList';

function SideBar() {
    const {userCourseList,setUserCourseList}=useContext(UserCourseListContext)

    const Menu=[
        {
            id:1,
            name:'Home',
            icon:<HiHome/>,
            path:'/Dashboard'
        },
        {
            id:1,
            name:'Explore',
            icon:<HiSquare3Stack3D />,
            path:'/Dashboard/explore'
        },
        {
            id:1,
            name:'Upgrade',
            icon:<HiFire />,
            path:'/Dashboard/upgrade'
        },
        {
            id:1,
            name:'Logout',
            icon:<HiOutlinePower />,
            path:'/Dashboard/logout'
        }
    ]
    const path=usePathname();
  return (
    <div className='fixed h-full md:w-64 p-5 shadow-lg '>
     <Image src={'/logo.svg'} width={160} height={100} alt='logo'/>
     <hr  className='my-5'/>

     <ul>
        {Menu.map((item,index)=>(
            <Link href={item.path}>
            <div className={`flex items-center gap-2 text-gray-600 p-3
            cursor-pointer hover:bg-gray-100
             hover:text-black rounded-lg mb-3
             ${item.path==path && 'bg-gray-200 text-black'}`}>
                <div className='text-2xl'>{item.icon}</div>
                <h2>{item.name}</h2>
            </div>
            </Link>
        ))}
     </ul>
     <div className='absolute bottom-10 w-[80%] '>
     <Progress value={(userCourseList?.length/10)*100} />
     <h2 className='text-sm my-2' >{userCourseList?.length} out of 10 Course Created</h2>
     <h2 className='text-sx text-gray-500'>Upgrade Your Plan for unlimited</h2>
     </div>
    </div>
  )
}

export default SideBar
