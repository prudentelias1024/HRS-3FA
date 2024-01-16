import axios from 'axios'
import React, {useRef, useState} from 'react'
import { useLocation , useNavigate} from 'react-router-dom'
import SideNav from '../SideNav'

export default function AddMedication() {
  const location = useLocation()
  const nameRef = useRef()
  const reasonRef = useRef()
  const descriptionRef = useRef()
  const allergiesRef = useRef()
  const dosageRef = useRef()
  const typeRef = useRef()
  const manufacturerRef = useRef()
  const [addedSuccessfully,setAddedSuccessfully] = useState(false)
  const navigate = useNavigate()
  console.log(location.state)
  const submitMedication = async() => {
    const name = nameRef.current.value
    const reason = reasonRef.current.value
    const description = descriptionRef.current.value
    const possible_allergies = allergiesRef.current.value
    const type = typeRef.current.value
    const dosage = dosageRef.current.value
    const manufacturer = manufacturerRef.current.value
    const formData = new FormData()
    formData.append('name',name)
    formData.append('reason',reason)
    formData.append('description',description)
    formData.append('possible_allergies',possible_allergies)
    formData.append('type',type)
    formData.append('dosage',dosage)
    formData.append('manufacturer',manufacturer)
    formData.append('specialist_id',location.state.docId)
    formData.append('patient_id',location.state.patientId)
    const res = await (await axios.post('http://localhost:8000/api/medications', formData, {headers: { Authorization: localStorage.getItem('access-token')}})).data
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
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" for="username">Drug Name</label> 
    <input ref={nameRef} class="w-full  h-8 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="Drug name "  type="text" name="patient_id" />
   </div>


   

   <div className="text-[#7e7d7d]">
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" for="username">Reason for Drug Prescription</label> 
    <textarea ref={reasonRef} class="w-full  h-[15em] rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="Reason for prescribing drug"  type="text" name="patient_id" ></textarea>
   </div>

   <div className="text-[#7e7d7d]">
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" for="username">Medication Description</label> 
    <textarea ref={descriptionRef} class="w-full  h-[15em] rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="Full details for patient to understand the medication "  type="text" name="patient_id" ></textarea>
   </div>

   <div className="text-[#7e7d7d]">
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" for="username">Drug Manufacturer</label> 
    <input ref={manufacturerRef} class="w-full  h-8 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="Drug Manufacturer "  type="text" name="patient_id" />
   </div>



   <div className="text-[#7e7d7d]">
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" for="username">Drug type</label> 
    <input ref={typeRef} class="w-full  h-8 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="Drug type e.g Antibiotics "  type="text" name="drug-type" />
   </div>

   <div className="text-[#7e7d7d]">
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" for="username">Drug Allergies</label> 
    <input ref={allergiesRef} class="w-full  h-8 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="Allergies/Side Effect (separated with ,) "  type="text" name="drug-allergies" />
   </div>


   <div className="text-[#7e7d7d]">
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" for="username">Drug Dosage</label> 
    <input ref={dosageRef} class="w-full  h-8 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="Drug type e.g 2/1, 3/1 "  type="text" name="drug-dosage" />
   </div>


<button
onClick={submitMedication} className='border border-blue-500 ml-[45%] w-[50%] text-blue-500 rounded-md text-sm mt-[1em]  p-[.75em]'>Submit</button>

</div>

 
   </div>

</div>
</div>

)
}
