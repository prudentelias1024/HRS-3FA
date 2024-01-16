import React from 'react'
import Face from "../../../face.jpeg";
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import {  RiCheckboxCircleFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../store';

export default function CameraFeed() {
  const user = useSelector(state => state.currentUser)
  const videoRef = useRef()
  const canvasRef = useRef()
  const captureIntervalRef = useRef(null)
  const [cameraOpened , setCameraOpened] =  useState(false)
  const [faceDetected , setFaceDetected] =  useState(false)
  const [enrolled , setEnrolled] =  useState(false)
  const [cameraStream, setCameraStream] = useState(null)
  const [enrolCount, setEnrolCount] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const getUser = async() => {
    const res =  (await axios.get('http://localhost:8000/api/user',{headers: {Authorization: localStorage.getItem('access-token')}})).data
    console.log(res)
    if(res.status === 200){

      dispatch(actions.updateUser(res.user))
      navigate('/Dashboard')
   
     } 
     if(res.status == 403){
       navigate('/', {state: {message: 'You are not authenticated. Please login'}})
     } 
   
   
  }
 
  const stopCamera = () => {
      if(cameraStream){
      cameraStream.getTracks().forEach((track) => {
          track.stop()
      })
      clearInterval(captureIntervalRef.current)
  }
}
  const sendFrameToServer = async(imageData) => {
    const res =(await axios.post('http://localhost:8000/api/face/enrol',{image: imageData}, 
    {
      headers: {Authorization: localStorage.getItem('access-token')}
    })).data  
    console.log(res)
    setEnrolCount(res.enrolled)
    if (res.done) {
      getUser()
      setEnrolled(true)
      clearInterval(captureIntervalRef.current)
      stopCamera()
      navigate('/Dashboard')
    } else if(res.faceDetected){
      setFaceDetected(true)
      
    }
  }
  const captureFrame = () => {
    const canvas = document.createElement('canvas')
    canvasRef.width = videoRef.current.videoWidth
    canvasRef.height = videoRef.current.videoHeight
    const context = canvas.getContext('2d')
    context.drawImage(videoRef.current,0,0 ,canvas.width,canvas.height)
    const imageDataURL = canvas.toDataURL('image/jpeg',1)
    sendFrameToServer(imageDataURL)

  }
  const startCamera = () =>{
      setCameraOpened(true)
      navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
          if(videoRef.current){
              videoRef.current.srcObject = stream
              setCameraStream(stream)
              captureIntervalRef.current = setInterval(captureFrame,1000)
          }
      }).catch((error) => {
          console.error('Error ',error)
      })

  }
  useEffect(() => {
       if(user == null){
        navigate('/', {state: {message: 'You have to log in using username and password to enrol'}})
       }
       return() => {
        stopCamera()
       }
    
  }, [])

  
 return (
<>  
{
  cameraOpened
?      <div className=''>
<div  className=' w-full h-full lg:w-[640px] lg:h-[480px]  mt-[4em] m-auto flex flex-col '>
    <video ref={videoRef} autoPlay={true} playsInline={true} className='m-auto '   ></video>
        <button onClick={stopCamera} className='bg-red-500 w-full m-auto text-white font-[Outfit] p-2 my-[1em]'>Close Camera</button>
    
</div>
</div>

:
    <div className='flex flex-col'>
       <img src={Face} className='h-[25em] w-[25em] m-auto object-cover' alt="Face icon" />
 
          <button onClick={startCamera} className=' rounded-md font-[Sen] text-center m-auto w-[90%] lg:w-[20em] py-[.75em] bg-purple-500 text-white font-bold '>
          Open Camera
         </button>
  
    </div>
}
<div className='flex flex-col gap-[1em] text-center py-[2.5em] px-[1em] lg:p-[5em] m-auto '>
      
{


cameraOpened ?          
   <div className=' inline-flex gap-[1em] text-green-600 m-auto'>
<RiCheckboxCircleFill className='text-xl '></RiCheckboxCircleFill>
<p className='text-xl font-[Sen] -mt-1'>Camera Opened</p>
</div>

    :
        <div className=' inline-flex gap-[1em] text-red-600 m-auto'>
        <RiCheckboxCircleFill className='text-xl '></RiCheckboxCircleFill>
        <p className='text-xl font-[Sen] -mt-1'>Open Camera</p>
        </div>
}
{


faceDetected ?          
   <div className=' inline-flex gap-[1em] text-green-600 m-auto'>
<RiCheckboxCircleFill className='text-xl '></RiCheckboxCircleFill>
<p className='text-xl font-[Sen] -mt-1 '>Face Detected</p>
</div>

    :
        <div className=' inline-flex gap-[1em] text-red-600 m-auto'>
        <RiCheckboxCircleFill className='text-xl '></RiCheckboxCircleFill>
        <p className='text-xl font-[Sen] '>Don't move too far</p>
        </div>
}
{
enrolled ? 
<div className=' inline-flex gap-[1em] text-green-600 m-auto'>
<RiCheckboxCircleFill className='text-xl  '></RiCheckboxCircleFill>
<p className='text-xl font-[Sen] '>Enrollment Completed </p>
</div>
:

        <div className=' inline-flex gap-[1em] text-red-600 m-auto'>
        <RiCheckboxCircleFill className='text-xl  '></RiCheckboxCircleFill>
        <p className='text-xl font-[Sen] '>Enrolling...... ({enrolCount}/100%) </p>
        </div>
}            
<Link className='font-[Sen] m-auto text-blue-500' to='/faceRecognition'>Enrolled? Verify Face Here</Link>

</div>
</>

)
}
