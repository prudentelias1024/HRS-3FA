import React, { useRef, useState } from 'react'

import Lasulogo from '../../../lasu.jpeg'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {  actions } from "../../../store";
import { useDispatch } from 'react-redux';
export default function NativeLoginDoctor() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [emailError, setEmailError] = useState()
  const [passwordError, setPasswordError] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const login = async() => {
    setEmailError('')
    setPasswordError('')
    let formData = {
      email: emailRef.current.value,
      password : passwordRef.current.value,
      type: 'doctor'
    }
   
    console.log(formData);
    let res = (await axios.post('http://localhost:8000/api/nativeLogin',formData)).data
    console.log(res)
    if (res.emailError) {
      setEmailError(res.emailError)
    } else if(res.passwordError){
       setPasswordError(res.passwordError)
    } else {
      if(res.access_token){
      localStorage.setItem('access-token',res.access_token)
      dispatch(actions.updateUser(res.user))
     
      navigate('/Dashboard')
      }
    }
  }
  return (
    <>
    <form   class="w-full lg:w-1/3  lg:border lg:rounded-lg m-auto mt-[4em] px-6 lg:px-12 py-6 flex flex-col gap-[2em]">
        <img src={Lasulogo} className='h-[6em] w-[6em] object-cover m-auto' alt="lasu_logo" />
        <p className="font-[Outfit] text-2xl font-semibold text-center ">LASU Medical Records</p>
        {
        passwordError ? 
    
        <p className="font-[Outfit] text-xl text-red-500 font-semibold text-center mb-[1em] ">{passwordError}</p>
        : ''
}
{
        emailError ? 
    
        <p className="font-[Outfit] text-xl text-red-500 font-semibold text-center mb-[1em] ">{emailError}</p>
        : ''
}
       
     <div class="email">
         <label class="font-[Outfit] text-[1em] font-bold" for="username">Email</label> 
         <input ref={emailRef} class="w-full h-8 border font-[Outfit] p-4 rounded-sm font-bold"   type="text" name="email" />
         
     </div>
   
     <div class="password">
         <label class="font-[Outfit] text-[1em] font-bold" for="password">Password</label> 
         <input ref={passwordRef} class="w-full h-8 border font-[Outfit] p-4 rounded-sm font-bold" type="password" name="password"   /> 
    
    </div>
   
     <button  onClick={login} class="bg-orange-500 text-white font-[Outfit] p-2 rounded-lg" name="login" type="button">Login</button>
  
  <Link className='font-[Sen] m-auto text-blue-500 text-center' to='/NativeRegistration'>Register Here?</Link>

    <Link className='font-[Sen] m-auto text-blue-500 text-center' to='/nativeLogin'>Login as a patient</Link>

    </form>
 
 
  </>

    )
}
