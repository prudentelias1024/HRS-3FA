import React, {useEffect, useState, useRef} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import SideNav from '../SideNav'
import { FaFileUpload } from 'react-icons/fa'
export default function AddTests() {
  const location = useLocation()
  const typeRef = useRef()
  const labNoteRef = useRef()
  const takenAtRef = useRef()
  const takenOnRef = useRef()
  const fileRef = useRef()
  const statusRef = useRef()
  const releasedOnRef = useRef()
  const [addedSuccessfully,setAddedSuccessfully] = useState(false)
  const [fileName,setFileName] = useState('')
  const [fileAttached,setFileAttached] = useState(null)
  const navigate = useNavigate()
  const submitTest = async() => {
    const type = typeRef.current.value
    const lab_note = labNoteRef.current.value
    const taken_at = takenAtRef.current.value
    const taken_on = takenOnRef.current.value
    const status = statusRef.current.value
    const released_on = releasedOnRef.current.value

    const formData = new FormData()
    formData.append('type',type)
    formData.append('lab_note',lab_note)
    formData.append('taken_at',taken_at)
    formData.append('taken_on',taken_on)
    formData.append('status',status)
    formData.append('released_on',released_on)
    formData.append('specialist_id',location.state.docId)
    formData.append('patient_id',location.state.patientId)
    formData.append('file', fileAttached, fileAttached.name)

    const res = await (await axios.post('http://localhost:8000/api/tests', formData, {headers: { Authorization: localStorage.getItem('access-token')}})).data
    if(res.status === 200){
      setAddedSuccessfully(true)
      setTimeout(() => {
        navigate('/Dashboard')

      }, 3000);

    }
  }
  const uploadImage = () => {
    fileRef.current.click()
 
  }
  const chooseFile = (event) => {
    console.log(fileRef.current.files)

     setFileAttached(fileRef.current.files[0])
     setFileName(fileRef.current.files[0].name)
    console.log(fileName);
  }

return (

  <div className='flex flex-row justify-between h-full bg-[#FAFBFB]'>
  <SideNav />
  <div className="dashboard ml-[15%] w-full flex flex-col ">
  { addedSuccessfully ?
    <p className="font-[Outfit] text-green-500  m-auto p-[em] mt-[3em] rounded-sm">
      Test added for Patient
    </p>
      : ''} 
  
 
  <div class=" flex flex-row gap-[7em] w-auto bg-[#F7F9FA]  pl-[2em] mx-[2em] mt-[3em] rounded-md py-[3em] ">
   
   
<div></div>

   <div  className='flex flex-wrap gap-[3em]'>
   


   <div onClick={uploadImage} className="text-blue-500 rounded-sm border h-[15em] w-fit m-auto p-[.5em] bg-blue-100 ">
    <FaFileUpload className='text-5xl mx-auto mt-[1.5em]'></FaFileUpload>
    {
      fileName == ''?

    
    <label class="font-[Outfit] text-[1em] text-blue-500 border-sm mt-[1em]" for="username">Upload Scanned Copy</label> 
:
<label class="font-[Outfit] text-[1em] text-blue-500 border-sm" for="username">{fileName}</label> 

}
    <input ref={fileRef} onChange={(event) => {chooseFile(event)}}  class="w-full hidden  h-8 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal"   type="file" name="patient_id" />
   


    </div>

   

   <div className="text-[#7e7d7d]">
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" for="username">Test Lab Note</label> 
    <textarea ref={labNoteRef} class="w-full  h-[15em] rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="A fully detailed reason for this appointment"  type="text" name="patient_id" ></textarea>
   </div>

   <div className="text-[#7e7d7d]">
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" for="username">Test type</label> 
    <input ref={typeRef} class="w-full  h-8 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="Test Type "  type="text" name="patient_id" />
   </div>


   <div className="text-[#7e7d7d]">
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" for="username">Test Taken at</label> 
    <input ref={takenAtRef} class="w-full  h-8 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="e.g General Lab "  type="text" name="patient_id" />
   </div>

   <div className="text-[#7e7d7d]">
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" for="username">Test Taken on</label> 
    <input ref={takenOnRef} class="w-full  h-8 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="Drug type e.g Antibiotics "  type="datetime-local" name="patient_id" />
   </div>

   <div className="text-[#7e7d7d]">
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" for="username">Test released on</label> 
    <input ref={releasedOnRef} class="w-full  h-8 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal"  type="datetime-local" name="test_release_datetime" />
   </div>

   <div className="text-[#7e7d7d] w-[20em]">
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" for="username">Test Status</label> 
    <select ref={statusRef} class="w-full  h-10 rounded-md border font-[Outfit]  font-bold placehold:font-normal" placeholder="Drug type e.g Antibiotics "  type="datetime-local" name="patient_id" >
    <option value="">...</option>
    <option value="preminary ">Preminary</option>
    <option value="final ">Final</option>
      </select>
   </div>


<button
onClick={submitTest} className='border border-blue-500 ml-[45%] w-[50%] text-blue-500 rounded-md text-sm mt-[1em]  p-[.75em]'>Submit</button>

</div>

 
   </div>

</div>
</div>

)
}
