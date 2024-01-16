import React from 'react'
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

export default function MedicalConditions() {
  
  const medicalInfo = useSelector(state => state.medical_info)
  const bp_top = Number(medicalInfo.blood_pressure.split('/')[0])
  const bp_bottom = Number(medicalInfo.blood_pressure.split('/')[1])

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
                  <GiBodyBalance className='text-2xl text-orange-500 mb-[1em]'/>
                  <p className='font-bold text-xl'>Body Mass Index (BMI)</p>
                 </div>
                  {
                    medicalInfo.bmi < 18.5 ? 
                    <p className='font-bold text-red-500 text-2xl'>Underweight </p>
                  : ''    
                  }
                  {
                    medicalInfo.bmi >= 18.5 && medicalInfo.bmi <= 24.9? 
                    <p className='font-bold text-green-500 text-2xl'>Normal </p>
                  : ''    
                  }
                  {
                    medicalInfo.bmi >= 25 && medicalInfo.bmi <= 29.9? 
                    <p className='font-bold text-orange-500 text-2xl'>Overweight </p>
                  : ''    
                  }
                  {
                    medicalInfo.bmi >= 30? 
                    <p className='font-bold text-red-500 text-2xl'>Obesity </p>
                  : ''    
                  }
                  </div>
  
                  <div className="heartbeat_count border shadow-md rounded-lg bg-white w-[20em] p-[1em] flex flex-col gap-[.5em] font-[Outfit]">
                 <div className="flex flex-col">
                  <GiHeartBeats className='text-2xl text-red-500 mb-[1em]'/>
                  <p className='font-bold text-xl'>Heartbeat Count (Pulse)</p>
                 </div>
                 {
                  medicalInfo.pulse < 60 ?
                  <p className='font-bold text-2xl text-orange-500'>Hypothermia (below normal)</p>
                  : ''
                 }
                 {
                  medicalInfo.pulse > 100 ?
                  <p className='font-bold text-2xl text-red-500'>Tachypnea (above normal)</p>
                  : ''
                 }
                 {
                  medicalInfo.pulse >= 60 && medicalInfo.pulse <= 100?
                  <p className='font-bold text-2xl text-green-500'>Normal</p>
                  : ''
                 }
                  </div>
  
  
             
  
                  <div className="temperature border shadow-md rounded-lg bg-white w-[20em] p-[1em] flex flex-col gap-[.5em] font-[Outfit]">
                 <div className="flex flex-col">
                  <BsThermometer className='text-2xl text-yellow-500 mb-[1em]'/>
                  <p className='font-bold text-xl'>Body Temperature</p>
                 </div>
                 {
                  medicalInfo.temperature >= 36.5 && medicalInfo.temperature <= 37.99 ? 
                  <p className='font-bold text-2xl text-green-500'>Normal</p>
                  : ''
                 }
                 {
                  medicalInfo.temperature <= 35 ? 
                  <p className='font-bold text-2xl text-red-500'>Hypothermia (Low)</p>
                  : ''
                 }
                 
                 {
                  medicalInfo.temperature >= 38 ? 
                  <p className='font-bold text-2xl text-red-500'>Fever (High)</p>
                  : ''
                 }
                 
                </div>
  
  
  
                  <div className="blood_type border shadow-md rounded-lg bg-white w-[20em] p-[1em] flex flex-col gap-[.5em] font-[Outfit]">
                 <div className="flex flex-col">
                  <BiTachometer className='text-2xl text-blue-500 mb-[1em]'/>
                  <p className='font-bold text-xl'>Blood Pressure</p>
                 </div>
                 {
                  (bp_top >= 90 && bp_top <= 120) && (bp_bottom >= 60 && bp_bottom <= 80)?
                  <p className='font-bold text-2xl text-green-500'>Normal</p>
                  : ''
           
                 }
                 {
                  (bp_top <= 90) && (bp_bottom <= 60)?
                  <p className='font-bold text-2xl text-green-500'>Hypotension (Below normal)</p>
                  : ''
           
                 }
                 {
                  (bp_top >= 120) && (bp_bottom >= 980)?
                  <p className='font-bold text-2xl text-green-500'>Hypertension (Above normal)</p>
                  : ''
           
                 }

                  </div>
  
                  <div className="blood_type border shadow-md rounded-lg bg-white w-[20em] p-[1em] flex flex-col gap-[.5em] font-[Outfit]">
                 <div className="flex flex-col">
                  <TiPipette className='text-2xl text-pink-500 mb-[1em]'/>
                  <p className='font-bold text-xl'>Blood Sugar Level</p>
                 </div>
                 {
                  medicalInfo.blood_sugar >= 70 && medicalInfo.blood_sugar <= 100? 
                  <p className='font-bold text-green-500 text-2xl'>
                    Normal
                    </p>
                  :''
                 }
                 {
                  medicalInfo.blood_sugar < 70 ? 
                  <p className='font-bold text-red-500 text-2xl'>
                    Hypoglycemia (Below normal)
                    </p>
                  :''
                 }
                 {
                  medicalInfo.blood_sugar > 100 ? 
                  <p className='font-bold text-red-500 text-2xl'>
                    Hyperglycemia (Above normal)
                    </p>
                  :''
                 }
             
                  </div>
  
                  <div className="blood_type border shadow-md rounded-lg bg-white w-[20em] p-[1em] flex flex-col gap-[.5em] font-[Outfit]">
                 <div className="flex flex-col">
                  <FaHeartbeat className='text-2xl text-green-500 mb-[1em]'/>
                  <p className='font-bold text-xl'>Cholesterol Level</p>
                 </div>
                 {
                  medicalInfo.cholesterol <= 200?
                  <p className='font-bold text-green-500 text-2xl'>Normal</p>
                :''
                 }
                 {
                  medicalInfo.cholesterol > 240?
                  <p className='font-bold text-red-500 text-2xl'>Critical</p>
                :''
                 }
                 
                 
                  </div>
  
  
  
  
  
  
              </div>
          </div>
      </div>
    )
    }else {
      return ''
    }
    
}
