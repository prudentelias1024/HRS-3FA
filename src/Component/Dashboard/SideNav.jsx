import React from 'react'
import { MdSpaceDashboard } from "react-icons/md";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import { GiHypodermicTest, GiMedicines } from "react-icons/gi";
import { CiWavePulse1 } from "react-icons/ci";
import { FaFirstAid, FaHospitalUser, FaUserAlt, FaUserNurse } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function SideNav() {
  const user = useSelector(state =>state.currentUser)
  return (
    <>
    <div className="flex flex-col gap-[2em] w-[15%] h-full p-[2em] fixed  bg-blue-500 text-white">
        <Link to="/Dashboard" className=' inline-flex gap-[1em] font-[Outfit] mt-[3em]'>
        <MdSpaceDashboard className='text-2xl text-white' />
        <p className="">Dashboard</p>
        </Link>
        
    {
     user &&  user.type == 'patient'?
    <>
      <Link to="/Dashboard/MedicalInfo" className=' inline-flex gap-[1em] font-[Outfit]'>
      <div className=' inline-flex gap-[1em] font-[Outfit]'>
      <FaFirstAid className='text-2xl text-white' />
      <p className="">Medical Info</p>
      </div>
      </Link>



            <Link to="/Dashboard/Conditions" className=' inline-flex gap-[1em] font-[Outfit]'>
        <div className=' inline-flex gap-[1em] font-[Outfit]'>
        <CiWavePulse1 className='text-2xl text-white' />
        <p className="">Conditions</p>
        </div>
    </Link>
        
    

        <div className='inline-flex gap-[1em] font-[Outfit]'>
        <AiOutlineClockCircle className='text-2xl text-white' />
        <p className="">History</p>
        </div>
      
        <Link to="/Dashboard/Doctors" className=' inline-flex gap-[1em] font-[Outfit]'>
        <FaUserNurse className='text-2xl text-white' />
        <p className="">Specialist</p>
        </Link>

    </>: ''
}

    {
     user &&  user.type == "doctor"? 
      <Link to="/Dashboard/Patients" className=' inline-flex gap-[1em] font-[Outfit]'>
      <FaHospitalUser className='text-2xl text-white' />
      <p className="">Patients</p>
      </Link>:''

    }


        <Link to='/Dashboard/Appointment' className=' inline-flex gap-[1em] font-[Outfit]'>
        <AiOutlineCalendar className='text-2xl text-white' />
        <p className="">Appointments</p>
        </Link>




        
        <Link to="/Dashboard/Tests" className=' inline-flex gap-[1em] font-[Outfit]'>
        <GiHypodermicTest className='text-2xl text-white' />
        <p >Tests</p>
        </Link >


        <Link to="/Dashboard/Medications" className=' inline-flex gap-[1em] font-[Outfit]'>

        <div className=' inline-flex gap-[1em] font-[Outfit]'>
        <GiMedicines className='text-2xl text-white' />
        <p className="">Medications</p>
        </div>

    </Link>

        <Link to='/Dashboard/Settings' className=' inline-flex gap-[1em] font-[Outfit]'>
        <FiSettings className='text-2xl text-white' />
        <p className="">Settings</p>
        </Link >


    </div>
    </>
  )
}
