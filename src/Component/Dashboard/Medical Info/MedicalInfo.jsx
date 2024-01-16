import React, {useEffect, useState} from 'react'
import SideNav from '../SideNav'
import ProfileNavbar from '../ProfileNavbar'
import { GiBodyBalance, GiBodyHeight, GiHeartBeats, GiWeight } from 'react-icons/gi'
import { MdBloodtype } from 'react-icons/md' 
import { BsThermometer } from 'react-icons/bs' 
import {  BiTachometer } from 'react-icons/bi' 
import { FaHeartbeat } from 'react-icons/fa'
import { TiPipette } from 'react-icons/ti'
import { RiErrorWarningFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import moment from 'moment'
export default function MedicalInfo() {
 
  const medicalInfo = useSelector(state => state.medical_info)
  if(medicalInfo != null){
  return (
    <div className='flex flex-row bg-[#FAFBFB] h-full'>
        <SideNav/>
        <div className=" flex flex-col info ml-[13%] w-full py-[1em] px-[4em]">
            <ProfileNavbar/>
            {
              moment(medicalInfo.date_added).fromNow(true) == '2 months'?
            
            <div className='inline-flex m-auto mb-[1em]'>
              <RiErrorWarningFill className='text-2xl text-yellow-500'/>
              <p className='font-semibold font-[Outfit] text-md'>You might need to take a test, you medical readings might be obsolete</p>
            </div>
              : ''
            }
            <div className="info flex flex-row flex-wrap gap-[.6em]">
                <div className="weight border shadow-md rounded-lg bg-white w-[20em] p-[1em] flex flex-col gap-[.5em] font-[Outfit]">
               <div className="flex flex-col">
                <GiWeight className='text-red-500 text-2xl mb-[1em]'/>
                <p className='font-bold text-xl'>Weight</p>
                <p className='text-[#cfcece] font-semibold text-sm mt-4'>Last modified :{moment(medicalInfo.date_added).format('MMMM Do YYYY h:s a')}</p>
               </div>
                <p className='font-bold text-2xl'>{medicalInfo.weight} kg</p>
                </div>

                <div className="weight border shadow-md rounded-lg bg-white w-[20em] p-[1em] flex flex-col gap-[.5em] font-[Outfit]">
               <div className="flex flex-col">
                <GiBodyHeight  className='text-2xl text-blue-500 mb-[1em]'/>
                <p className='font-bold text-xl'>Height</p>
                <p className='text-[#cfcece] font-semibold text-sm mt-4'>Last modified :{moment(medicalInfo.date_added).format('MMMM Do YYYY h:s a')}</p>
               </div>
                <p className='font-bold text-2xl'>{medicalInfo.height} cm</p>
                </div>

                <div className="weight border shadow-md rounded-lg bg-white w-[20em] p-[1em] flex flex-col gap-[.5em] font-[Outfit]">
               <div className="flex flex-col">
                <GiBodyBalance className='text-2xl text-orange-500 mb-[1em]'/>
                <p className='font-bold text-xl'>Body Mass Index (BMI)</p>
                <p className='text-[#cfcece] font-semibold text-sm mt-4'>Last modified :{moment(medicalInfo.date_added).format('MMMM Do YYYY h:s a')}</p>
               </div>
                <p className='font-bold text-2xl'>{Number(medicalInfo.bmi).toFixed(1)} </p>
                
                </div>

                <div className="heartbeat_count border shadow-md rounded-lg bg-white w-[20em] p-[1em] flex flex-col gap-[.5em] font-[Outfit]">
               <div className="flex flex-col">
                <GiHeartBeats className='text-2xl text-red-500 mb-[1em]'/>
                <p className='font-bold text-xl'>Heartbeat Count (Pulse)</p>
                <p className='text-[#cfcece] font-semibold text-sm mt-4'>Last modified :{moment(medicalInfo.date_added).format('MMMM Do YYYY h:s a')}</p>
               </div>
                <p className='font-bold text-2xl'>{medicalInfo.pulse} bpm</p>
                </div>


                <div className="blood_type border shadow-md rounded-lg bg-white w-[20em] p-[1em] flex flex-col gap-[.5em] font-[Outfit]">
               <div className="flex flex-col">
                <MdBloodtype className='text-2xl text-purple-500 mb-[1em]'/>
                <p className='font-bold text-xl'>Blood Type</p>
                <p className='text-[#cfcece] font-semibold text-sm mt-4'>Last modified :{moment(medicalInfo.date_added).format('MMMM Do YYYY h:s a')}</p>
               </div>
                <p className='font-bold text-2xl'>{medicalInfo.blood_group}</p>
                </div>



                <div className="temperature border shadow-md rounded-lg bg-white w-[20em] p-[1em] flex flex-col gap-[.5em] font-[Outfit]">
               <div className="flex flex-col">
                <BsThermometer className='text-2xl text-yellow-500 mb-[1em]'/>
                <p className='font-bold text-xl'>Body Temperature</p>
                <p className='text-[#cfcece] font-semibold text-sm mt-4'>Last modified :{moment(medicalInfo.date_added).format('MMMM Do YYYY h:s a')}</p>
               </div>
                <p className='font-bold text-2xl'>{medicalInfo.temperature}c</p>
                </div>



                <div className="blood_type border shadow-md rounded-lg bg-white w-[20em] p-[1em] flex flex-col gap-[.5em] font-[Outfit]">
               <div className="flex flex-col">
                <BiTachometer className='text-2xl text-blue-500 mb-[1em]'/>
                <p className='font-bold text-xl'>Blood Pressure</p>
                <p className='text-[#cfcece] font-semibold text-sm mt-4'>Last modified :{moment(medicalInfo.date_added).format('MMMM Do YYYY h:s a')}</p>
               </div>
                <p className='font-bold text-2xl'>{medicalInfo.blood_pressure}mmHg</p>
                </div>

                <div className="blood_type border shadow-md rounded-lg bg-white w-[20em] p-[1em] flex flex-col gap-[.5em] font-[Outfit]">
               <div className="flex flex-col">
                <TiPipette className='text-2xl text-pink-500 mb-[1em]'/>
                <p className='font-bold text-xl'>Blood Sugar Level</p>
                <p className='text-[#cfcece] font-semibold text-sm mt-4'>Last modified :{moment(medicalInfo.date_added).format('MMMM Do YYYY h:s a')}</p>
               </div>
                <p className='font-bold text-2xl'>{medicalInfo.blood_sugar} mg/dL</p>
                </div>

                <div className="blood_type border shadow-md rounded-lg bg-white w-[20em] p-[1em] flex flex-col gap-[.5em] font-[Outfit]">
               <div className="flex flex-col">
                <FaHeartbeat className='text-2xl text-green-500 mb-[1em]'/>
                <p className='font-bold text-xl'>Cholesterol Level</p>
                <p className='text-[#cfcece] font-semibold text-sm mt-4'>Last modified :{moment(medicalInfo.date_added).format('MMMM Do YYYY h:s a')}</p>
               </div>
                <p className='font-bold text-2xl'>{medicalInfo.cholesterol} mgdL</p>
                </div>






            </div>
        </div>
    </div>
  )
  }else {
    return ''
  }
}
