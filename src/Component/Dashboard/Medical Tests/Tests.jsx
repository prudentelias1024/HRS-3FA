import React, { useState, useEffect } from 'react'
import SideNav from '../SideNav'
import ProfileNavbar from '../ProfileNavbar'
import TestResults from './TestResults'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function Tests() {
  const [tests, setTests] = useState([])
  const user = useSelector(state => state.currentUser)
  const getTests = async() => {
    if (user.type == 'patient') { 
    const res = await (await axios.get('http://localhost:8000/api/tests', {headers: {Authorization: localStorage.getItem('access-token')}})).data
    if (res.status === 200) {
      setTests(res.tests)
      console.log(res.tests)
    }
  }
  if (user.type == 'doctor') { 
    const res = await (await axios.get('http://localhost:8000/api/tests/my', {headers: {Authorization: localStorage.getItem('access-token')}})).data
    if (res.status === 200) {
      console.log(res.tests)
      setTests(res.tests)
    }
    }
  }
  useEffect(() => {
    getTests()
  }, [])


  
  return (
    <div className='flex flex-row justify-between h-full bg-[#FAFBFB]'>
    <SideNav />
    <div className="dashboard ml-[15%] w-full flex flex-col ">
      <ProfileNavbar/>
      <TestResults tests={tests}/>
   </div>
   </div>
  )
}
