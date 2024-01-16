import React from 'react'
export default function MyPatientHeader({removeGender,removeEmail}) {
  return (

  <div className=" flex w-[95%] ml-[2.5em] flex-col gap-[1em]">
  <div className={"header bg-[#f1f1f1] mt-[1em] text-[#7e7d7d] grid grid-cols-6 py-[1em] text-xs uppercase pl-[1em]"}>
  <p className="patient_name">Patient Profile</p>
  {removeGender ? '':

  <p className="title ml-[1.5em]">Gender</p>
}
  {removeEmail ? '':

  <p className="title">Email</p>
}

{
  removeEmail && removeGender ?
  <p className="action ml-[4em]">Action</p>
  :
  <p className="action ml-[10em]">Action</p>
  

}
  </div>





  </div>

  )
}
