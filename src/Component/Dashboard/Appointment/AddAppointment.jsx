import axios from 'axios'
import React, {useState,useRef} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SideNav from '../SideNav'
import { useEffect } from 'react'


export default function AddAppointment() {
  useEffect(
    () => {
      console.log(location.state.docId);
    }
 ,[] )
    const location = useLocation()
    const titleRef = useRef()
    const descriptionRef = useRef()
    const appointmentStartTimeRef = useRef()
    const appointmentEndTimeRef = useRef()
    const [addedSuccessfully,setAddedSuccessfully] = useState(false)
    const navigate = useNavigate()
    const submitAppointment = async() => {
      const title = titleRef.current.value
      const description = descriptionRef.current.value
      const start_time = appointmentStartTimeRef.current.value
      const end_time = appointmentEndTimeRef.current.value
      const formData = new FormData()
      formData.append('title',title)
      formData.append('description',description)
      formData.append('start_time',start_time)
      formData.append('end_time',end_time)
      formData.append('specialist_id',location.state.docId)
      const res = await (await axios.post('http://localhost:8000/api/appointments', formData, {headers: { Authorization: localStorage.getItem('access-token')}})).data
      if(res.status === 200){
        setAddedSuccessfully(true)
        setTimeout(() => {
          navigate('/Dashboard')

        }, 3000);
 
      }
    }
  
  return (
  
    <div className='flex flex-row justify-between h-full bg-[#FAFBFB]'>
    <SideNav />
    <div className="dashboard ml-[15%] w-full flex flex-col ">
    { addedSuccessfully ?
      <p className="font-[Outfit] text-green-500  m-auto p-[1.5em] mt-[3em] rounded-sm">
        Medication added for Patient
      </p>
        : ''} 
    
   
    <div class=" flex flex-row gap-[7em] w-auto bg-[#F7F9FA]  pl-[2em] mx-[2em] mt-[3em] rounded-md py-[3em] ">
     
     
<div></div>

     <div  className='flex flex-wrap gap-[3em]'>
     
     <div className="text-[#7e7d7d]">
      <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" for="username">Appiontment Title</label> 
      <input ref={titleRef} class="w-full  h-8 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="Appointment Title "  type="text" name="patient_id" />
     </div>


     

     <div className="text-[#7e7d7d]">
      <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" for="username">Appintment Description</label> 
      <textarea ref={descriptionRef} class="w-full  h-[15em] rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="A fully detailed reason for this appointment"  type="text" name="patient_id" ></textarea>
     </div>

     <div className="text-[#7e7d7d]">
      <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" for="username">Appointment Start time</label> 
      <input ref={appointmentStartTimeRef} class="w-full  h-8 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="Reason for prescribing Medication "  type="datetime-local" name="patient_id" />
     </div>

     <div className="text-[#7e7d7d]">
      <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" for="username">Appointment End time</label> 
      <input ref={appointmentEndTimeRef} class="w-full  h-8 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="Drug type e.g Antibiotics "  type="datetime-local" name="patient_id" />
     </div>


  <button
  onClick={submitAppointment} className='border border-blue-500 ml-[45%] w-[50%] text-blue-500 rounded-md text-sm mt-[1em]  p-[.75em]'>Submit</button>

  </div>

   
     </div>

  </div>
  </div>

  )
}
