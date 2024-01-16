import React from 'react'

import { AiFillCalendar } from 'react-icons/ai'
import { FaUser, FaUserNurse } from 'react-icons/fa'
export default function AppointmentIndicator({totalAppointment,doneAppointment,upcomingAppointment}) {
  return (
 
    <div className='bg-white flex flex-row shadow-md w-[45em] justify-evenly py-[2em] pr-[4em] ml-[2em] rounded-lg'>
    <div className=' appointments flex flex-row justify-between'>
     <AiFillCalendar className='text-5xl text-purple-500 mr-[.25em]' />
     <div className='flex flex-col font-[Outfit]'>
     <p className='font-bold text-2xl'>{totalAppointment} </p>
     <p className='text-base'>Appointments </p>
     <p className='text-xs text-[#ccc] uppercase mt-[.5em]'>Today</p>
     </div>
    </div>

    <div className=' appointments flex flex-row'>
     <AiFillCalendar className='text-5xl text-orange-500 mr-[.25em]' />
     <div className='flex flex-col font-[Outfit]'>
     <p className='font-bold text-2xl'>{upcomingAppointment} </p>
     <p className='text-base'>Appointments left </p>
     <p className='text-xs text-[#ccc] uppercase mt-[.5em]'>Today</p>
     </div>
    </div>

    <div className=' appointments flex flex-row'>
     <AiFillCalendar className='text-5xl text-orange-500 mr-[.25em]' />
     <div className='flex flex-col font-[Outfit]'>
     <p className='font-bold text-2xl'>{doneAppointment} </p>
     <p className='text-base'>Appointments Done </p>
     <p className='text-xs text-[#ccc] uppercase mt-[.5em]'>Today</p>
     </div>
    </div>


   


     </div>   )
}
