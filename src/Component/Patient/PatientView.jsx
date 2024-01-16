import React, {useEffect, useState} from 'react'
import moment from 'moment'
import axios from 'axios'

export default function PatientView({user,onAdd, onAdded}) {
  const addAsPatient = async() => {
    const res = await (await axios.put('http://localhost:8000/api/patients/my/add',{userId: user.three_fa_id } ,{headers: {Authorization: localStorage.getItem('access-token')}})).data
    onAdd()
    onAdded()

  }

  return (
    <div className="test_done grid grid-cols-5 pl-[3em]">
    <div className='inline-flex'>
            <img src={"http://localhost:8000/api"+user.profile_img} alt='patient_image' className='h-[2em] object-cover w-[2em] rounded-full'/>
            <p className="font-semibold text-sm ml-[.5em] mt-[.25em]">{user.full_name}</p>
          </div>
            <p className="font-semibold text-sm ml-[1.5em] capitalize mt-[.25em]">{user.gender}</p>
            <p className="font-semibold text-sm ml-[-8.5em]  mt-[.25em]">{user.email}</p>
            <p className="font-semibold text-sm cursor-pointer  text-blue-500  mt-[.25em]
            "
            onClick={addAsPatient}>Add as Patient </p>
     

    </div>
  )
}
