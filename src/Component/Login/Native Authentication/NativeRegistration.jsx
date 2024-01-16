import React, { useRef, useState } from 'react'
import Lasulogo from '../../../lasu.jpeg'
import { Form, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function NativeRegistration() {
    const nameRef = useRef()
    const emailRef = useRef()
    const dobRef = useRef()
    const contactRef = useRef()
    const passwordRef = useRef()
    const confPwdRef = useRef()
    const addressRef = useRef()
    const genderRef = useRef()
    const [passwordError,setPasswordError] = useState(false)
    const [imageData,setImageData] = useState(false)
    const navigate = useNavigate()
    
    const chooseImage = (event) => {
        setImageData(event.target.files[0])
    }
    const register = async() => {
        setPasswordError(false)
        let full_name = nameRef.current.value
        let email = emailRef.current.value
        let dob = dobRef.current.value
        let contact = contactRef.current.value
        let password = passwordRef.current.value
        let password_repeat = confPwdRef.current.value
        let gender = genderRef.current.value
        let address = addressRef.current.value
        if(password !== password_repeat){
            setPasswordError(true)
        }
        let formData = new FormData()
        formData.append('full_name',full_name)
        formData.append('email',email)
        formData.append('dob',dob)
        formData.append('address',address)
        formData.append('phone_no',contact)
        formData.append('gender',gender)
        formData.append('password',password)
        formData.append('password2',password_repeat)
        formData.append('profile_img', imageData, imageData.name)

        if (!passwordError) {
         let res = await((await axios.post('http://localhost:8000/api/nativeRegistration',formData,
         {headers: {'Content-Type': "multipart/form-data"}}
         ))).data
         console.log(res)
            if (res.status === 200) {
             navigate('/nativeLogin')
        }
        }

      
    }
  return (
    <>
    
    <form   className="w-full lg:w-1/3  lg:border lg:rounded-lg m-auto mt-[4em] px-6 lg:px-12 py-6 flex flex-col gap-[1em]">
        <img src={Lasulogo} className='h-[6em] w-[6em] object-cover m-auto' alt="lasu_logo" />
        <p className="font-[Outfit] text-2xl font-semibold text-center mb-[1em] ">LASU Medical Records</p>
       {
        passwordError ? 
    
        <p className="font-[Outfit] text-xl text-red-500 font-semibold text-center mb-[1em] ">Password doesn't match</p>
        : ''
}
<div>
             <label className="font-[Poppins] text-[1em] font-bold" for="username">Image </label> 
             <input onChange={(event) => {chooseImage(event)}}  className="w-full h-12 border font-[Poppins] p-4 rounded-sm font-bold" accept='image/jpeg,image/png,image/jpg'  type="file" name="profile_img" />
             
         </div>
    


     <div className="username w-full">
         <label className="font-[Outfit] text-[1em] font-bold" for="username">Full Name</label> 
         <input ref={nameRef} className="w-full  h-8 border font-[Outfit] lg:p-4 rounded-sm font-bold"   type="text" name="username" />
         
     </div>
   
       
     <div className="email">
         <label className="font-[Outfit] text-[1em] font-bold" for="username">Email</label> 
         <input ref={emailRef} className="w-full h-8 border font-[Outfit] p-4 rounded-sm font-bold"   type="text" name="email" />
         
     </div>
   
     <div className="phone_no">
         <label className="font-[Outfit] text-[1em] font-bold" for="username">Phone Number</label> 
         <input ref={contactRef} className="w-full h-8 border font-[Outfit] p-4 rounded-sm font-bold"   type="text" name="phone_no" />
     </div>

     <div className="dob">
         <label className="font-[Outfit] text-[1em] font-bold" for="username">Date Of Birth</label> 
         <input ref={dobRef} className="w-full h-8 border font-[Outfit] p-4 rounded-sm font-bold"   type="date" name="dob" />
     </div>

     <div className="gender">
         <label className="font-[Outfit] text-[1em] font-bold" for="gender">Gender</label> 
         <select 
         className="w-full h-8 border font-[Outfit]  rounded-sm font-bold"
         ref={genderRef} name="gender">
            <option name="" >..</option>
            <option value="male"  >Male</option>
            <option value="female"  >Female</option>
         </select>
     </div>
   
   
     <div className="address">
         <label className="font-[Outfit] text-[1em] font-bold" for="username">Home Address</label> 
         <input ref={addressRef} className="w-full h-8 border font-[Outfit] p-4 rounded-sm font-bold"   type="text" name="home_add" />
     </div>
   

   
     <div className="password">
         <label className="font-[Outfit] text-[1em] font-bold" for="password">Password</label> 
         <input ref={passwordRef} className="w-full h-8 border font-[Outfit] p-4 rounded-sm font-bold" type="password" name="password"   /> 
    
    </div>

     <div className="confirm_pass">
         <label className="font-[Outfit] text-[1em] font-bold" for="password_conf">Confirm Password</label> 
         <input ref={confPwdRef} className="w-full h-8 border font-[Outfit] p-4 rounded-sm font-bold" type="password" name="password_conf"   /> 
    
    </div>
     <button onClick={register} className="bg-orange-500 text-white font-[Outfit] p-2 rounded-lg" name="login" type="button">Register</button>
  
  <Link className='font-[Sen] m-auto text-blue-500' to='/NativeLogin'>Login Here?</Link>
  </form>


    
    </>
)
}
