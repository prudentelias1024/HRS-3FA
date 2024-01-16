import React, {useState, useEffect} from 'react'
import SideNav from './SideNav'
import ProfileNavbar from './ProfileNavbar'
import { useSelector } from 'react-redux'
import MyPatient from '../Patient/MyPatient'
import MyPatientHeader from '../Patient/MyPatientHeader'
import PatientView from '../Patient/PatientView'
import axios from 'axios'

export default function Patients() {
  const [myPatients,setMyPatients] = useState([])
  const [patients,setPatients] = useState([])

  
  const getMyPatients = async() => {
    const res =  await(await axios.get('http://localhost:8000/api/patients/my',{headers: {Authorization: localStorage.getItem('access-token')}})).data
    console.log(res)
    if(res.status === 200){
      console.log(res.patients)
      setMyPatients(res.patients)
      } 
  }
  const getAllPatientNotAssigned = async() => {
    const res =  await(await axios.get('http://localhost:8000/api/patients/all',{headers: {Authorization: localStorage.getItem('access-token')}})).data
    console.log(res)
    if(res.status === 200){
      console.log(res.patients)
      setPatients(res.patients)
     } 
  }
    useEffect(() => {
      getMyPatients()
      getAllPatientNotAssigned()
    }, [])
    
    const user = useSelector(state => state.currentUser)
  return (
    <div className='flex flex-row justify-between h-full bg-[#FAFBFB]'>
    <SideNav />
    <div className="dashboard ml-[15%] w-full flex flex-col ">
    <ProfileNavbar/>
    
 <p className="font-[Outfit] p-[1em] font-bold text-xl ml-[.5em]">My Patient </p> 
  <MyPatientHeader removeEmail={true} removeGender={true}/>

 
<div className="patients flex flex-col ml-[1em]">
  { myPatients && myPatients.length > 0?
   myPatients.map((patient) => {
    return <MyPatient user={patient} onAdd={getMyPatients} onRemove={getAllPatientNotAssigned}/>
  }): 
  <p className="mt-[1em] font-[Outfit] m-auto text-[#7e7d7d]  text-base">
  You have added 0 Patient 
</p>

  }
  </div>
 



<p className="font-[Outfit] p-[1em] font-bold text-xl mt-[1em] ml-[.5em]">Patient list</p> 
 

 
<div className="patients flex flex-col gap-[1em]">


<div className="search">
    <input  class="w-[95%] ml-[2.5%] h-8 border font-[Outfit] p-4 rounded-sm font-bold" type="text" name="search"  placeholder='Search for Patient' /> 
    
    </div>
    <MyPatientHeader removeEmail={false} removeGender={false}/>
 
  {
   patients && patients.length > 0?
   patients.map((patient) => {
     return <PatientView user={patient} onAdd={getMyPatients} onAdded={getAllPatientNotAssigned} />
    }) : 
    <p className="mt-[1em] font-[Outfit] m-auto text-[#7e7d7d]  text-base">
      No Patient Available
    </p>
 
  }


</div>

</div>
</div>
  )
}
