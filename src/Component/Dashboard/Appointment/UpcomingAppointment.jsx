import React from 'react'
import patientImage from '../../../lasu.jpeg'

export default function UpcomingAppointment({appointment}) {
  return (
    <div className="appointment_one border p-[1em] shadow-sm flex flex-col font-[Outfit]">
     <div className='flex gap-[.5em]'>
      <img src={patientImage} className="w-[3em] h-[3em] rounded-2xl" />
      <div className="patient_info">
        <p className="flex text-base font-bold">Prudent Elias</p>
          <p className='font-bold  mb-[.25em] text-sm'> 9:00am to 12am</p>
    
      </div>
    </div>

 
  </div>
  )
}
