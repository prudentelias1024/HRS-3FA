import React from 'react'
import {IoIosFingerPrint} from 'react-icons/io';
import {BiFace} from 'react-icons/bi';
import {MdOutlinePassword} from 'react-icons/md';
import Lasulogo from '../lasu.jpeg'
import { Link, useLocation } from 'react-router-dom';
export default function Auth() {
  const params = useLocation()
  return (  
        <>
        <div className='flex flex-col gap-[1em] text-center mt-[4em] lg:p-[5em] m-auto '>
        <img src={Lasulogo} className='h-[6em] w-[6em] object-cover m-auto' alt="lasu_logo" />
            {
          params.state?
          <p className="font-[Outfit] text-base m-[1em] text-red-500 font-semibold text-center mb-[1em] ">{params.state.message}</p>
     :''
        }
    
        <p className="font-[Outfit] text-2xl font-semibold ">LASU Medical Records</p>
        <Link to='/fingerprint' className='m-auto rounded-md font-[Sen]  lg:w-[20em] w-[95%] inline-flex gap-[.5em]  p-[.75em]  bg-purple-500 text-white font-bold p-auto'><IoIosFingerPrint className='text-2xl ml-[1em]'></IoIosFingerPrint>Login using Fingerprint</Link>
        <Link to='/faceRecognition' className='m-auto rounded-md font-[Sen]  lg:w-[20em] w-[95%] inline-flex gap-[.5em]  p-[.75em]  bg-purple-500 text-white font-bold p-auto'><BiFace className='text-2xl ml-[1em]'></BiFace>Login using your Face </Link>
        <Link to='/nativeLogin' className='m-auto rounded-md font-[Sen]  lg:w-[20em] w-[95%] inline-flex gap-[.5em]  p-[.75em]  bg-purple-500 text-white font-bold p-auto'><MdOutlinePassword className='text-2xl ml-[1em]'></MdOutlinePassword>Login with Native Password</Link>
        </div>
        </>
    )
}
