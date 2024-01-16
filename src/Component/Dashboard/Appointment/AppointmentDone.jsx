import React from 'react'
import patientImage from '../../../lasu.jpeg'
import * as moment from 'moment'

export default function AppointmentDone({title, appointments}) {
  const dayArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday', 'Sunday']
  const acceptAppointment = () => {
    
  }
  const declineAppointment = () => {

  }
  return (
    <div className={"appointment_done bg-white flex flex-col border shadow-md font-[Outfit] mt-[1em] mr-[1em] w-[95%] ml-[.5em] rounded-lg p-[1em]"}>
    <p className='font-bold'>{title}</p>
    <p className="text-[#ccc] text-sm text-bold">{moment().format('MMMM Do YYYY')}</p>
    <div className=" flex flex-col gap-[1em]">
      <div className="header bg-[#f1f1f1] mt-[1em] text-[#7e7d7d] grid grid-cols-6 py-[1em] text-xs uppercase pl-[1em]">
      <p className="">Consultant</p>
      <p className="title">Title</p>
      <p className="day">Date</p>
      <p className="day">Day</p>
      <p className="start_time ">Start time</p>
      <p className="end_time ">End time</p>
      {/* {
        title == 'Upcoming Appointments' ? 
        <p className="draw ">Action</p>
      : ''   
      } */}
      </div>

      {appointments.length > 0 ?
      appointments.map((appointment) => {
        return    ( <div className="today_appointment grid grid-cols-6">
        <div className='inline-flex'>
          <img src={'http://localhost:8000/api'+appointment.appointed_to.profile_img} alt='patient_image' className='h-[2em] w-[2em] rounded-full object-cover'/>
          <p className="font-bold ml-[.25em] text-sm">{appointment.appointed_to.full_name}</p>
        </div>
        <p className="font-bold text-sm">{appointment.title}
        </p>
        <p className="font-bold text-sm">
        {
          moment(appointment.appointment_start_time).format('MMMM Do YYYY')
        }
        </p>
        {

          <p className="font-bold text-sm">{moment().date() == moment(appointment.appointment_start_time)? 'Today': dayArray[moment(appointment.appointment_start_time).day()-1]}</p>
        }
        <p className="font-bold text-sm">{moment(appointment.appointment_start_time).format(' h:mm a')}</p>
        <p className="font-bold text-sm">{moment(appointment.appointment_end_time).format(' h:mm a')}</p>
        {
        title == 'Upcoming Appointments' ? 
    <div className='flex flex-row gap-[1em] -mt-4'>
  <button
  onClick={acceptAppointment} className='text-green-500 rounded-md text-sm '>Accept</button>
  <button
  onClick={acceptAppointment} className='text-red-500 rounded-md text-sm '>Reject</button>
    </div>    

        
        : ''   
      }
        
      </div>)
      
      })  :   
       <p className="font-bold  font-[Outfit] text-base m-auto mt-[20%] mb-[20%] text-[#7e7d7d]  text-center ">No {title} yet</p>
    }
    
    </div>
     </div>
    
  )
}
