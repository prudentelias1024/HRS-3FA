import React, {useState, useEffect, useRef}from 'react'
import SideNav from './SideNav'
import ProfileNavbar from './ProfileNavbar'

import patientImage from '../../lasu.jpeg'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function Doctors() {
  const docIdRef = useRef()
  const user = useSelector(state => state.currentUser)
  const [doctors,setDoctors] = useState(null)
  
  const navigate = useNavigate()
  useEffect(() => {
    getDoctors()
  },[])
  const goToAppointmentCreator = () => {
    let doctorId = docIdRef.current.getAttribute('value')
    navigate('/Dashboard/addAppointment',{state:{docId:doctorId}})
  }

  const getDoctors = async() => {
    const res = await (await axios.get('http://localhost:8000/api/doctors/all', {headers: {Authorization: localStorage.getItem('access-token')}})).data
    if(res.status === 200){
      console.log(res)
      setDoctors(res.doctors)
    }
  
  }

  return (
    <div className='flex flex-row justify-between h-full bg-[#FAFBFB]'>
    <SideNav />
    <div className="dashboard ml-[15%] w-full flex flex-col ">
    <ProfileNavbar/>

   <p className="font-[Outfit] p-[1em] font-bold text-2xl">Doctors </p> 
   <div className="flex flex-col">

   <div className="w-[94%] mx-[3%]  flex flex-col gap-[1em]">
   <div className="header bg-[#f1f1f1] mt-[1em] text-[#7e7d7d]  grid grid-cols-4 py-[1em] text-xs uppercase pl-[2em]">
      <p className="">Profile</p>
      <p className="type">Department</p>
      <p className="type">Specialization</p>
      {/* <p className="department">No of Patient</p> */}
      <p className="draw ">Action</p>
      
      </div>



      {/* test section */}
      {
        doctors != null && doctors.length > 0 ?
        doctors.map((doctor) => {
          return   <div className="test_done border rounded-md w-[98%]   bg-white grid grid-cols-4 p-[.5em]">
          <div className='inline-flex'>
            <img src={'http://localhost:8000/api'+doctor.user_id.profile_img} alt='patient_image' className='h-[1.5em] w-[1.5em] rounded-full'/>
            <p className="font-semibold ml-3 text-sm">{doctor.user_id.full_name}</p>
          </div>
          <p className="font-semibold text-sm">{doctor.department}</p>
          <p className="font-semibold text-sm">{doctor.specialization}</p>
          <p onClick={goToAppointmentCreator} ref={docIdRef}  value={doctor.user_id.three_fa_id}  className='text-purple-500 cursor-pointer font-bold text-sm ml-[-4em]   '>Book Appointment</p> 
        </div>
     
        }): ''
      }
    






   </div>

   </div>
   </div>
   </div>  )
}
