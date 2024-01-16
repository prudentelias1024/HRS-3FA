import axios from 'axios'
import React, { useRef } from 'react'
import { FaFileDownload } from 'react-icons/fa'
import moment from 'moment'
export default function TestResults({tests}) {
  const fileRef = useRef()
  const downloadTestFile = async() => {
    let file_name = fileRef.current.getAttribute('value')
    const res = await (await axios.get(`http://localhost:8000/api/download${file_name}`, { responseType: 'blob',headers: {Authorization: localStorage.getItem('access-token')}}))
    const blob = new Blob([res.data],{type:res.headers['content-type']})
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download','test_result.jpg')
    link.click()
   
  }
  if (tests.length != 0) {
  return(
    <div className=" flex flex-col gap-[1em]">
      <div className="header bg-[#f1f1f1] mt-[1em] text-[#7e7d7d]  grid grid-cols-6 py-[1em] text-xs uppercase pl-[2em]">
      <p className="">Consultant</p>
      <p className="type">Type</p>
      <p className="department">Supervised by</p>
      <p className="draw ">Taken On</p>
      {/* <p className="ref">Ref</p> */}
      <p className="ref">Released on</p>
      <p className="ref">Document Attached</p>
      </div>

      {
        tests.map((test) => {
          return    <div className="test_done grid grid-cols-6 pl-[1.5em]">
          <div className='inline-flex'>
            <img src={"http://localhost:8000/api"+test.patient.profile_img} alt='patient_image' className='h-[2em] object-cover w-[2em] rounded-full'/>
            <p className="font-semibold text-sm ml-[.5em] mt-[.25em]">{test.patient.full_name}</p>
          </div>
          <p className="font-semibold text-sm">{test.type}</p>
          <p className="font-semibold text-sm">CC: {test.specialist.user_id.full_name}</p>
          <p className="font-semibold text-sm">{moment(test.taken_on).format('MMM Do YYYY h:s a')}</p>
          <p className="font-semibold text-sm">{moment(test.released_on).format('MMM Do YYYY h:s a')}</p>
          {
            test.file !== null ?
          
          <div ref={fileRef} value={test.file} onClick={downloadTestFile} className="font-semibold inline-flex text-sm ml-[1em] text-blue-500 cursor-pointer"> 
          <FaFileDownload className='text-xl'/>
          <p className='text-sm '> Download Test result</p> </div>
          :''
        }
        </div>
     
  
        })
      }
   





   </div>
  )
  } else {
    return( <p className="font-bold  font-[Outfit] text-base m-auto mt-[20%] mb-[20%] text-[#7e7d7d]  text-center ">No Test result yet</p>
    )
  }
}
