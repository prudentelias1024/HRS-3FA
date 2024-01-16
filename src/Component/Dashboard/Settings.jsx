import React, {useEffect} from 'react'
import SideNav from './SideNav'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { actions } from '../../store'

export default function Settings() {
 const user = useSelector(state => state.currentUser)
 const dispatch = useDispatch()
 const getUser = async() => {
  const res =  (await axios.get('http://localhost:8000/api/user',{headers: {Authorization: localStorage.getItem('access-token')}})).data
  console.log(res)
  if(res.status === 200){
    dispatch(actions.updateUser(res.user))
  }
}
  useEffect(() => {
    getUser()
    console.log(user);
  }, [])
  return (
    <div className='flex flex-row justify-between h-full '>
    <SideNav />
    <div className="dashboard ml-[15%] w-full flex flex-col gap-[2.5em] font-[Outfit] ">
    <p className="text-xl font-bold p-[2em]">My Settings</p>
   
    
    <div className="appearance flex flex-row justify-between mr-[1.5em]">
    <div className="flex flex-col">
    <p className="text-base font-bold pb-[.5em] px-[2em]">Two Factor Authentication</p>
    <p className="text-sm text-[#929292] font-semibold ml-[2.25em]">Add Face Recognition to secure your records and activity</p>
    </div>
    {
     user !== null && !user.enrolled_face ?
      <Link to='/faceRecognition/enrol' className='bg-purple-500 w-fit h-fit  p-[.5em] rounded-lg mt-[-1em]  text-white mr-[3em] '>Enrol Face</Link> 
      :
      <p className='text-purple-500 w-fit h-fit  p-[.5em] rounded-lg mt-[-1em]   mr-[3em] '>Enrolled</p> 
      
    }
   
</div>


<div className="appearance flex flex-row justify-between mr-[1.5em]">
    <div className="flex flex-col">
    <p className="text-base font-bold pb-[.5em] px-[2em]">Three Factor Authentication</p>
    <p className="text-sm text-[#929292] font-semibold ml-[2em]">Add Fingerprint security to secure your medical records and activity </p>
    </div>
   
    {
     user !== null && !user.enrolled_fingerprint ?
      <Link to='/fingerprint/enrol' className='bg-purple-500 w-fit h-fit  p-[.5em] rounded-lg mt-[-1em]  text-white mr-[3em] '>Enrol Face</Link> 
      :
      <p className='text-purple-500 w-fit h-fit  p-[.5em] rounded-lg mt-[-1em]   mr-[3em] '>Enrolled</p> 
      
    }
   
</div>



<div className="appearance flex flex-row justify-between mr-[1.5em]">
    <div className="flex flex-col">
    <p className="text-base font-bold pb-[.5em] px-[2em]">Logout</p>
    <p className="text-sm text-[#929292] font-semibold ml-[2em]">You'll have to login next time to access this application </p>
    </div>
   
    <Link to='/logout' className='bg-purple-500 w-fit h-fit  p-[.5em] rounded-lg mt-[-1em]  text-white mr-[3em] '>Logout</Link> 
   
</div>



   </div>
  </div>
  )
}
