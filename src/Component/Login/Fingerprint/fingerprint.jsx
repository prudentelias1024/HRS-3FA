import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { IoIosFingerPrint } from 'react-icons/io'
import {  RiCheckboxCircleFill } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
export default function Fingerprint() {
    const [scannerConnected, setScannerConnected] = useState(false)
    const [fingerScanned, setFingerScanned] = useState(false)
    const [verified, setVerified] = useState(false)
    const navigate = useNavigate()
    const generateFingerprint = async() => {
      try{
      const res = await(await axios.get('http://localhost:8000/api/fingerprint/enrol',  {responseType: 'blob', headers: {Authorization: localStorage.getItem("access-token")}}))
      const blob = new Blob([res.data],{type:res.headers['content-type']})
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download','fingerprint.jpg')
      link.click()
      setTimeout(() => {
        if(res.status == 200){
          navigate('/Dashboard/settings')
        }
    
      }, 5000);
      } catch(err) {
        console.error('Error fetching file', err)
      }
    }
    useEffect(() => {
        setScannerConnected(false)
        setFingerScanned(false)
        setVerified(false)
    },[])
  return (
    <>
    <div className='flex flex-col gap-[1.5em] pt-[3em] '>
            <IoIosFingerPrint className='text-7xl text-pink-600 m-auto'></IoIosFingerPrint>
            <p className='text-2xl font-[Outfit] font-medium  m-auto'>To create a fake fingerprint. Click the button below</p>
            <button onClick={generateFingerprint} className='m-auto rounded-md font-[Sen]  lg:w-[20em] w-[95%] inline-flex gap-[.5em]  p-[.75em]  bg-purple-500 text-white font-bold p-auto'><IoIosFingerPrint className='text-2xl ml-[1em]'></IoIosFingerPrint>Generate Fingerprint</button>
     
             
<Link className='font-[Sen] m-auto text-blue-500' to='/'>Back Home</Link>

    </div>
    </>
  )
}