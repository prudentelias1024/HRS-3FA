import React from 'react'
import { useNavigate } from 'react-router-dom';
import EditMedicalInfo from '../Dashboard/Medical Info/EditMedicalInfo';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function MyPatient({user,onAdd, onRemove}) {
  const currentUser =  useSelector(state => state.currentUser)
  const navigate = useNavigate()
  const removePatient = async() => {
    const res = await (await axios.put('http://localhost:8000/api/patients/my/remove',{userId: user.three_fa_id } ,{headers: {Authorization: localStorage.getItem('access-token')}})).data
    onAdd()
    onRemove()


  }

  const medInfoPage = () => {
    navigate('/Dashboard/MedicalInfo/edit', {state: {patientId:user.three_fa_id }})
  }

  const addTestPage = () => {
    navigate('/Dashboard/Tests/AddTest', {state: {patientId:user.three_fa_id, docId:currentUser.three_fa_id}})
  }
  
  const addMedicationPage = () => {
    navigate('/Dashboard/AddMedication', {state: {patientId:user.three_fa_id, docId:currentUser.three_fa_id}})
  }
  
  console.log(user);
  return (
    <div className="test_done grid grid-cols-5 pl-[2em] mt-[1em]">
    <div className='inline-flex'>
            <img src={"http://localhost:8000/api"+user.profile_img} alt='patient_image' className='h-[2em] object-cover w-[2em] rounded-full'/>
            <p className="font-semibold text-sm ml-[.5em] mt-[.25em]">{user.full_name}</p>
          </div>
            <p onClick={medInfoPage} className="font-semibold text-sm  text-blue-500  mt-[.25em]  cursor-pointer">Edit Medical info </p>
            <p onClick={addTestPage} className="font-semibold text-sm  text-blue-500  mt-[.25em]  cursor-pointer">Add Test result </p>
            <p onClick={addMedicationPage}  className="font-semibold text-sm  text-blue-500  mt-[.25em]  cursor-pointer">Add Medication </p>
            <p onClick={removePatient}  className="font-semibold text-sm  text-red-500  mt-[.25em]  cursor-pointer">Remove Patient </p>
     

    </div>

   
  )
}
