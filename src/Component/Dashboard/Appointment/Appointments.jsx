import React, {  useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import ProfileNavbar from '../ProfileNavbar'
import SideNav from '../SideNav'
import 'react-calendar/dist/Calendar.css'
import { useSelector } from 'react-redux'
import UpcomingAppointment from './UpcomingAppointment'
import AppointmentIndicator from './AppointmentIndicator'
import AppointmentDone from './AppointmentDone'
import axios from 'axios'
export default function Appointments() {
    const [value,setValue] = useState()
    const [appointments , setAppointments] = useState([])
    const [doneAppointments , setDoneAppointments] = useState([])
    const [appointmentCount , setAppointmentsCount] = useState(null)
    const [doneAppointmentCount , setDoneAppointmentsCount] = useState(null)

    const user = useSelector(state => state.currentUser)
    const getDoneAppointments = async() => {
      let url = ''
      if(user&& user.type == 'doctor'){
        url = 'http://localhost:8000/api/appointments/done/my'
       }else{
         url = 'http://localhost:8000/api/appointments/done'
       }
      
      const res =  (await axios.get(url,{headers: {Authorization: localStorage.getItem('access-token')}})).data
      console.log(res)
      if(res.status === 200){
        setDoneAppointments(res.appointments)
        setDoneAppointmentsCount(res.appointments.length)
        console.log(res.appointments);
       } 
      
     
    }

    const getUpcomingAppointments = async() => {
      let url = ''
      if(user&& user.type == 'doctor'){
        url = 'http://localhost:8000/api/appointments/upcoming/my'
      } else{
        url = 'http://localhost:8000/api/appointments/upcoming'
     
      }
      const res =  (await axios.get(url,{headers: {Authorization: localStorage.getItem('access-token')}})).data
      console.log(res)
      if(res.status === 200){
        setAppointments(res.appointments)
        setAppointmentsCount(res.appointments.length)
        console.log(res.appointments);
       } 
       
     
    }
    useEffect(() => {
      if (user  !== null) {
        
        getDoneAppointments()
        getUpcomingAppointments()
      }
    },[user])
  return (
      <div className='flex flex-row justify-between h-full bg-[#FAFBFB]'>
    <SideNav />
    <div className="dashboard ml-[15%] flex flex-col ">
      <ProfileNavbar/>
      {/* { user &&user.type === 'doctor'?
      <AppointmentIndicator totalAppointment={appointmentCount+doneAppointmentCount} doneAppointment={doneAppointmentCount}
      upcomingAppointment={appointmentCount}
      />: ''
    } */}

      <AppointmentDone title="Upcoming Appointments" appointments={appointments}/>
   
  <AppointmentDone title="Done Appointments" appointments={doneAppointments}/
  > 
     </div>
    <div className='flex bg-white border h-fit shadow-md rounded-md mt-[1.5em] flex-col mr-[1em] '>
    <Calendar  className="ml-[1em] border-none font-[Outfit]"  />
    <br />
     <hr />

    {/* {user.type === 'doctor'?
    <>
    <p className="font-[Outfit] ml-[2em] mt-[1em]">{appointmentCount} Appointments to go</p>
    <br />
    <hr />
    <div className="appointments mt-[1.5em] p-[.5em] flex flex-col gap-[1em]">
    </div>
</> : ''
} */}

    </div>
    </div>
  )
}