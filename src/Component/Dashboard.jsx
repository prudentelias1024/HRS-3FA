import React , {useEffect, useState, } from 'react'
import SideNav from './Dashboard/SideNav'
import {useDispatch, useSelector} from 'react-redux'
import ProfileNavbar from './Dashboard/ProfileNavbar'
import { AiFillMail, AiOutlineClockCircle, AiOutlineHome, AiOutlineMail, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import 'chart.js/auto'
import {  GiMedicines } from 'react-icons/gi'
import human from '../human.jpg'
import humanHeart from '../heart.jpg'
import axios from 'axios'
import { actions } from '../store'
import { FaHospitalUser } from 'react-icons/fa'
import MyPatientHeader from './Patient/MyPatientHeader'
import AppointmentDone from './Dashboard/Appointment/AppointmentDone'
import MyPatient from './Patient/MyPatient.jsx'
import moment from 'moment'
export default function Dashboard() {
  
  const user = useSelector(state =>state.currentUser)
  const medicalInfo = useSelector(state => state.medical_info)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [patientsCount , setPatientsCount] = useState(null)
  const [patients , setPatients] = useState([])
  const [appointments , setAppointments] = useState([])
  const [appointmentCount , setAppointmentsCount] = useState(null)
  const [testsCount , setTestsCount] = useState(null)
  const [tests , setTests] = useState([])
  const [medicationsCount , setMedicationsCount] = useState(null)
  const [medications , setMedications] = useState([])
  const getPatients = async() => {
    const res =  (await axios.get('http://localhost:8000/api/patients/my',{headers: {Authorization: localStorage.getItem('access-token')}})).data
    console.log(res)
    if(res.status === 200){
      setPatientsCount(res.patients.length)
      console.log(res.patients)
      setPatients(res.patients)
     } 
     if(res.status == 404){
      setPatientsCount(0)
   }
  }
   const getAppointments = async() => {
    let url = ''
    if(user&& user.type == 'patient'){
      url = 'http://localhost:8000/api/appointments'

    }else {
      url = 'http://localhost:8000/api/appointments/my'
    }
    const res =  (await axios.get(url,{headers: {Authorization: localStorage.getItem('access-token')}})).data
    console.log(res)
    if(res.status === 200){
      setAppointmentsCount(res.appointments.length)
      setAppointments(res.appointments)
      console.log(res.appointments);
     } 
     if(res.status == 404){
      setAppointmentsCount(0)
   }
  }
   
   const getMedications = async() => {
    let url = ''
    if(user && user.type =='patient'){
      url = 'http://localhost:8000/api/medications'

    }else {
      url = 'http://localhost:8000/api/medications/my'
    }
    
    const res =  (await axios.get(url,{headers: {Authorization: localStorage.getItem('access-token')}})).data
    console.log(res)
    if(res.status === 200){
      setMedicationsCount(res.medications.length)
      setMedications(res.medications)
     } 
     if(res.status == 404){
      setMedicationsCount(0)
   }
  }
   const getTests = async() => {
    let url = ''
    if(user && user.type == 'patient'){
      url = 'http://localhost:8000/api/tests'

    }else {
      url = 'http://localhost:8000/api/tests/my'
    }
    
    const res =  (await axios.get(url,{headers: {Authorization: localStorage.getItem('access-token')}})).data
    console.log(res)
    if(res.status === 200){
      setTestsCount(res.tests.length)
      setTests(res.tests)
     } 
     if(res.status == 404){
    setTestsCount(0)
   }
  }
   
  // const getUser = async() => {
  //   const res =  (await axios.get('http://localhost:8000/api/user',{headers: {Authorization: localStorage.getItem('access-token')}})).data
  //   if(res.status === 200){

  //     dispatch(actions.updateUser(res.user))
   
  //    } 
  //    if(res.status == 403){
  //      navigate('/', {state: {message: 'You are not authenticated. Please login'}})
  //    } 
  //   }  
 
   useEffect(() => {
    //  getUser()
    // navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
    //   stream.getTracks().forEach(track => {
    //     track.stop()
    //   })
    // })

    if(user !== null){

      getAppointments()
      getTests()
      getMedications()
      getPatients()
    }
    },[user])
    
    if(user){
     if( user.type === 'patient'){
    return (
      
    <div className='flex flex-row  font-[Outfit] bg-[#fafbfb] justify-between h-full'>
    <SideNav />
    <div className="dashboard ml-[15%] flex flex-row gap-[1em] justify-between">
      <div className='flex flex-col gap-[1em]'>
      <div className="info shadow-md  flex flex-col bg-white ml-[1em] p-[2em]  gap-[1.5em]">
      <img src={"http://localhost:8000/api"+user.profile_img} alt={user.full_name} className='h-[5em] w-[5em] object-cover m-auto rounded-full'/>
          <p className="font-bold capitalize m-auto">{user? user.full_name:''}</p>
      
      <div className=" w-[20em] flex flex-wrap gap-[1em]">
        <div className="gender flex flex-row gap-[.5em] ">
          <AiOutlineUser className='text-xl mt-[.5em]'/>
          <div>   
          <p className="text-[#cfcece] font-semibold">Gender</p>
          <p className="font-bold capitalize">{user? user.gender:''}</p>
          </div>
        </div>

        <div className="gender flex flex-row gap-[.5em] ">
          <AiOutlineClockCircle className='text-xl mt-[.5em]'/>
          <div>   
          <p className="text-[#cfcece] font-semibold">Dob</p>
          <p className="font-bold capitalize">{user? user.dob:''}</p>
          </div>
        </div>


        <div className="gender flex flex-row gap-[.5em] ">
          <AiOutlineMail className='text-xl mt-[.5em]'/>
          <div>   
          <p className="text-[#cfcece] font-semibold">Email</p>
          <p className="font-bold ">{user? user.email:''}</p>
          </div>
        </div>

        <div className="gender flex flex-row gap-[.5em] ">
          <AiOutlinePhone className='text-xl mt-[.5em]'/>
          <div>   
          <p className="text-[#cfcece] font-semibold">Contact</p>
          <p className="font-bold capitalize">{user? user.phone_no:''}</p>
          </div>
        </div>



      </div>
      

    </div>
      <div className="appointment_history shadow-md bg-white py-[2em] ml-[1em] flex flex-col">
   
      <p className="specialty font-bold capitalize text-xl mb-[1em] mx-auto"> Appointment History</p>
      
{
  appointments.length > 0 ? appointments.map((appointment) => {
    return      <div className="appointment p-[1em] border border-l-0 border-r-0 border-t border-b">
    
    <p className="specialty font-bold capitalize"> {appointment.specialist.specialization}</p>
    <p className="title font-bold "> {appointment.title}</p>
    <p className="doctor_name font-semibold text-[#cfcece] capitalize"> Dr. {appointment.specialist.user_id.full_name}</p>
    <p className="doctor_name font-semibold text-[#cfcece] "> 
    {moment(appointment.appointment_start_time).format(' h:mm a')}
       -
    {moment(appointment.appointment_end_time).format(' h:mm a')}
    , {moment(appointment.end_time).format('MMM Do YYYY')} </p>
      
       
        </div>

  }) : 
  <p className="font-bold  font-[Outfit] text-base m-auto mt-[20%] mb-[20%] text-[#7e7d7d]  text-center ">No appointment yet</p>

}
    
  {
    appointments.length > 0?
    <Link to='/dashboard/appointment' className='font-medium my-[1em]  text-blue-500 m-auto text-base'>View Previous appointments</Link>: ''
  }
      </div>
      </div>



<div className='flex flex-col gap-[1em]'>


  <div className="test_history h-fit shadow-md bg-white py-[2em] w-[20em] ml-[.5em] flex flex-col">

<p className="specialty font-bold capitalize text-xl mb-[1em] mx-auto">Previous Test</p>

{
  tests.length > 0 ? tests.map((test) => {
      return  <> <div className="appointment p-[1em] border border-l-0 border-r-0 border-t border-b">
      
      <p className="specialty font-bold capitalize">{test.type}</p>
      <p className="doctor_name font-semibold text-[#cfcece] capitalize"> Dr. {test.specialist.user_id.full_name}</p>
      <p className="doctor_name font-semibold text-[#cfcece] capitalize">  {moment(test.released_on).format('MMMM Do YYYY h:s a')}</p>
        
         
          </div>
      
      
</>
  }): <p className="font-bold  font-[Outfit] text-base m-auto mt-[20%] mb-[20%] text-[#7e7d7d]  text-center ">No Test result yet</p>

}
{tests.length > 0? 
  <Link to='/dashboard/Tests' className='font-medium my-[1em]  text-blue-500 m-auto text-base'>View Previous test</Link>: ''
}
</div>

  <div className="medication_history shadow-md h-fit bg-white py-[2em] w-[20em] ml-[.5em] flex flex-col">

<p className="specialty font-bold capitalize text-xl mb-[1em] mx-auto">Previous Medications</p>

{
  medications.length > 0? medications.map((medication) => {
 return <div className="medication p-[1em] border border-l-0 border-r-0 border-t border-b">

<div className="flex flex-row justify-between">
<div className="flex flex-col">

<p className="drug_name text-lg font-bold capitalize">{medication.name}</p>
<p className="doctor_name font-semibold text-[#cfcece] capitalize"> Dr. {medication.prescribed_by.user_id.full_name}</p>
</div>
<div className="flex flex-row flex-wrap w-[3.5em]">
  {
    Array.from({length: medication.dosage.split('/')[0]}).map((index) => {
      return <GiMedicines key={index} className='text-2xl text-red-800'/>

    })
  }
</div>

</div>
  
   
    </div>   
  }) :
  <p className="font-bold  font-[Outfit] text-base m-auto mt-[20%] mb-[20%] text-[#7e7d7d]  text-center ">No Medications yet</p>


}

 
   
{
  medications.length > 0?
  
<Link to='/dashboard/Tests' className='font-medium my-[1em]  text-blue-500 m-auto text-base'>View Previous medication</Link> : ''
}  
</div>


</div>

    {/* <div className='bg-white p-[1em]'>

        <div className="flex flex-row justify-between">

        <p className="font-semibold text-lg ml-[.5em]">Your BMI </p>
        <p className="font-semibold text-lg ml-[.5em]">Today: 19.5 </p>
        </div>
        <Line className='font-[Outfit]'  data={data} options={options} />
      </div>
      */}

     <div className="vitals flex flex-col gap-[0em]">

      <div className="medical_visual h-fit shadow-md bg-white py-[2em] w-[20em] ml-[.5em] flex flex-col">

      <p className="font-bold text-xl m-auto">Heart vitals</p>

      <img src={humanHeart} alt="heart" className='h-4/5 w-4/5 m-auto'/>
      <div className='flex flex-row flex-wrap justify-evenly gap-[1em]'>

     <div className="blood_pressure text-center    flex flex-col">

      <p className="font-bold text-xl">Blood Pressure</p>
      <p className="font-normal">{medicalInfo ?medicalInfo.blood_pressure: ''} mmHg</p>
     </div>
     <div className="pulse  text-center  flex flex-col">
      <p className="font-bold text-xl">Heartbeat count</p>
      <p className="font-normal">{medicalInfo ?medicalInfo.pulse: ''}bpm</p>
     </div>
     <div className="pulse  text-center  flex flex-col">
      <p className="font-bold text-xl">Cholesterol </p>
      <p className="font-normal">{medicalInfo ?medicalInfo.cholesterol: ''} mg/dL</p>
     </div>
     <div className="pulse  text-center  flex flex-col">
      <p className="font-bold text-xl">Blood Sugar </p>
      <p className="font-normal">{medicalInfo ?medicalInfo.blood_sugar: ''} mg/dL</p>
     </div>
      </div>
      </div>

<hr />

      <div className="medical_visual h-fit shadow-md bg-white py-[1em] w-[20em] ml-[.5em] flex flex-col">

      {/* <p className="font-bold text-xl m-auto">Heart vitals</p> */}

      <img src={human} alt="heart" className='h-1/2 w-1/2 object-contain m-auto'/>
      <div className='flex flex-row flex-wrap justify-evenly gap-[1em]'>

     <div className="blood_pressure text-center    flex flex-col">

      <p className="font-bold text-xl">Your Weight</p>
      <p className="font-normal">{medicalInfo ?medicalInfo.weight : ''} Kg</p>
     </div>
     <div className="pulse  text-center  flex flex-col">
      <p className="font-bold text-xl">Height </p>
      <p className="font-normal">{medicalInfo ?medicalInfo.height : ''}</p>
     </div>
     <div className="pulse  text-center  flex flex-col">
      <p className="font-bold text-xl">Body Mass Index </p>
      <p className="font-normal">{medicalInfo ? Number(medicalInfo.bmi).toFixed(1): 's'}</p>
     </div>
      </div>
      </div>



      <Link to='/dashboard/MedicalInfo' className='font-medium bg-white my-[1em]  text-blue-500 m-auto text-base'>View medical information</Link>
</div>


      </div>



</div>
    
  )
}else {
  return (
      <>
      <div className='flex flex-row  font-[Outfit] bg-[#fafbfb] justify-between h-full'>
    <SideNav />
    <div className="dashboard ml-[15%] flex flex-col gap-[1em] justify-between">
    <ProfileNavbar/>
   
    <div className="patients_stats flex flex-col">

    <p className="font-[Outfit] p-[1em] font-bold text-xl ml-[.5em]">Your Statistics </p> 
    <div className="grid grid-cols-4 gap-[1em] ml-[2em] ">
      <div className="total_patient flex flex-col bg-white rounded-md border shadow-sm  gap-[1em] w-[15em]">
      <div className='inline-flex justify-between mr-[1em]'>
    <p className="font-[Outfit] mt-[.5em]  font-bold text-base ml-[2em]">Total Patient </p> 
    <AiOutlineUser className='mt-[.5em] text-xl' />
      </div>
      <p className="font-[Outfit] ml-[2em] mb-[1em]  font-bold text-xl ">{patientsCount} </p> 
   
      </div>
      <div className="total_patient flex flex-col bg-white rounded-md border shadow-sm  gap-[1em] w-[15em]">
      <div className='inline-flex justify-between mr-[1em]'>
    <p className="font-[Outfit] mt-[.5em]  font-bold text-base ml-[2em]">Total Appoinment </p> 
    <AiOutlineUser className='mt-[.5em] text-xl' />
      </div>
      <p className="font-[Outfit] ml-[2em] mb-[1em]  font-bold text-xl ">
        {appointmentCount} </p> 
   
      </div>
      
      <div className="total_patient flex flex-col bg-white rounded-md border shadow-sm  gap-[1em] w-[15em]">
      <div className='inline-flex justify-between mr-[1em]'>
    <p className="font-[Outfit] mt-[.5em]  font-bold text-base ml-[2em]">Total Test Done </p> 
    <AiOutlineUser className='mt-[.5em] text-xl' />
      </div>
      <p className="font-[Outfit] ml-[2em] mb-[1em]  font-bold text-xl ">{testsCount} </p> 
   
      </div>

      <div className="total_patient flex flex-col bg-white rounded-md border shadow-sm  gap-[1em] w-[15em]">
      <div className='inline-flex justify-between mr-[1em]'>
    <p className="font-[Outfit] mt-[.5em]  font-bold text-base ml-[2em]">Total Medication Prescribed </p> 
    <AiOutlineUser className='mt-[.5em] text-xl' />
      </div>
      <p className="font-[Outfit] ml-[2em] mb-[1em]  font-bold text-xl ">{medicationsCount} </p> 
   
      </div>
      
      
    </div>
    </div>
 
    <div className="patients flex flex-col ml-[1em]">
  <p className="font-semibold text-lg mt-1 ml-[1em] mb-[1em] ">Appointments</p>

     {
      appointments != null && appointments.length != 0
     ?
    <AppointmentDone appointments={appointments} title="Upcoming Appointment"/>
      :     <p className="font-semibold text-base mt-1 text-center ">You have no  Appointment today</p>
 
      }

    </div>
<div className="patients flex flex-col ml-[1em]">
  <p className="font-semibold text-lg mt-1 ml-[1em] mb-[1em] ">Patients</p>
 
{
patients != null && patients.length > 0 ?
<MyPatientHeader/>
:    <p className="font-semibold text-base mt-1 text-center ">You have no  Patient assigned to you</p>
 
}
{
  patients && patients.map((patient) => {
    return <MyPatient user={patient}/>
})
}
</div>
   
    </div>
    </div>
      </>
  )
}
}else {
 return   ''
}
}