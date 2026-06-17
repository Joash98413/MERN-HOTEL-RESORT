import React from 'react'
import {NavLink} from'react-router-dom'
import { IoMdAddCircleOutline, IoIosLogOut } from "react-icons/io";
import { MdFormatListBulletedAdd, MdChecklistRtl, MdSpaceDashboard } from "react-icons/md";

function Sidebar({ setToken })  {
  return (
    <div className='w-[18%] min-h-screen border-r-2 border-gray-100 bg-white'>
      <div className='mt-4 px-6'>
        <h1 className='text-[24px] font-bold text-fuchsia-900'>Deluxe Hotel Resort</h1>
      </div>
      <div className='flex flex-col gap-4 pt-6'>
        <NavLink to='/dashboard' className='flex items-center gap-3 px-4 py-3 border-b-2 border-gray-200 text-gray-700 hover:bg-fuchsia-500 hover:text-white'>
         <MdSpaceDashboard className='text-[34px]'/>
         <p className='text-base'>Dashboard</p>
        </NavLink>

        <NavLink to='/add' className='flex items-center gap-3 px-4 py-3 border-b-2 border-gray-200 text-gray-700 hover:bg-fuchsia-500 hover:text-white'>
         <IoMdAddCircleOutline className='text-[34px]'/>
         <p className='text-base'>Add Rooms</p>
        </NavLink>

        <NavLink to='/list' className='flex items-center gap-3 px-4 py-3 border-b-2 border-gray-200 text-gray-700 hover:bg-fuchsia-500 hover:text-white'>
         <MdFormatListBulletedAdd className='text-[34px]' />
         <p className='text-base'>Room lists</p>
        </NavLink>

        <NavLink to='/reservation' className='flex items-center gap-3 px-4 py-3 border-b-2 border-gray-200 text-gray-700 hover:bg-fuchsia-500 hover:text-white'>
         < MdChecklistRtl className='text-[34px]'/>
         <p className='text-base'>Reservations</p>
        </NavLink>
        
        <button onClick={()=> setToken("")} className='flex items-center gap-3 px-6 py-3 border-b-2 border-gray-200 text-gray-600 hover:bg-fuchsia-500 hover:text-white w-full text-left'>
           <IoIosLogOut className='text-[34px]'/>
         <p className='text-base'>Logout</p>
        </button>
      </div>
    </div>
  )
}

export default Sidebar