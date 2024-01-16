import React from 'react'
import Face from "../../../face.jpeg";
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import {  RiCheckboxCircleFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { actions } from '../../../store';
import { useDispatch } from 'react-redux';

export default function FaceRecogniton() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const videoRef = useRef()
  const canvasRef = useRef()
  const captureIntervalRef = useRef(null)
  const [cameraOpened , setCameraOpened] =  useState(false)
  const [faceDetected , setFaceDetected] =  useState(false)
  const [faceRecognized , setFaceRecognized] =  useState(false)
  const [faceDetectionMessage, setFaceDetectionMessage] = useState(null)
  const [cameraStream, setCameraStream] = useState(null)
  const stopCamera = () => {
      setCameraOpened(false)
      setFaceDetected(false)
      setFaceRecognized(false)
      if(cameraStream){
     cameraStream.getTracks().forEach(track => {
          track.stop()
      })
      setCameraStream(null)
      clearInterval(captureIntervalRef.current)
  } 
}
  const sendFrameToServer = async(imageData) => {
    const res =(await axios.post('http://localhost:8000/api/face/verifyUser',{image: imageData})).data  
    console.log(res)
    if (!res.face_detected) {
      setFaceDetectionMessage(res.message)
    } else {
      stopCamera()
      setFaceDetected(true)
      setFaceRecognized(true)
      localStorage.setItem('access-token', res.access_token)
        navigate('/Dashboard')
     
     

      
   
    }
    
  }
  const captureFrame = () => {
    const canvas = document.createElement('canvas')
    console.log(videoRef)
    if(videoRef.current !== null){
    canvasRef.width = videoRef.current.videoWidth
    canvasRef.height = videoRef.current.videoHeight
    const context = canvas.getContext('2d')
    context.drawImage(videoRef.current,0,0 ,canvas.width,canvas.height)
    const imageDataURL = canvas.toDataURL('image/jpeg',1)
    sendFrameToServer(imageDataURL)

  }
  }
  const startCamera = () =>{
      setCameraOpened(true)
      navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
          if(videoRef.current){
              videoRef.current.srcObject = stream
              setCameraStream(stream)
              captureIntervalRef.current = setInterval(captureFrame,10000)
          }
      }).catch((error) => {
          console.error('Error ',error)
      })

  }
  useEffect(() => {
     return () => stopCamera()
     
  }, [])

  return (
    <>
    
{
  cameraOpened
?      <div className=''>
    
{faceDetectionMessage !== null ?
        <p className="font-[Outfit] text-sm text-red-500 font-semibold text-center mb-[1em] ">{faceDetectionMessage}</p>
        : ''

}
<div  className='w-full h-full lg:w-[640px] lg:h-[480px] mt-[4em] m-auto flex flex-col '>
    <video ref={videoRef} autoPlay={true} playsInline={true} className='m-auto'   ></video>
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
   <div className=' inline-flex gap-[1em] text-green-600 lg:m-auto'>
<RiCheckboxCircleFill className='text-xl '></RiCheckboxCircleFill>
<p className='text-xl font-[Sen] -mt-1'>Camera Opened</p>
</div>

    :
        <div className=' inline-flex gap-[1em] text-red-600 lg:m-auto'>
        <RiCheckboxCircleFill className='text-xl '></RiCheckboxCircleFill>
        <p className='text-xl font-[Sen] -mt-1'>Open Camera</p>
        </div>
}
{


faceDetected ?          
   <div className=' inline-flex gap-[1em] text-green-600 lg:m-auto'>
<RiCheckboxCircleFill className='text-xl '></RiCheckboxCircleFill>
<p className='text-xl font-[Sen] -mt-1 '>Face Detected</p>
</div>

    :
        <div className=' inline-flex gap-[1em] text-red-600 lg:m-auto'>
        <RiCheckboxCircleFill className='text-xl '></RiCheckboxCircleFill>
        <p className='text-xl font-[Sen] -mt-1 '>Don't move too far</p>
        </div>
}
{
faceRecognized ? 
<div className=' inline-flex gap-[1em] text-green-600 lg:m-auto'>
<RiCheckboxCircleFill className='text-xl  '></RiCheckboxCircleFill>
<p className='text-xl font-[Sen] '>Verification </p>
</div>
:

        <div className=' inline-flex gap-[1em] text-red-600 lg:m-auto'>
        <RiCheckboxCircleFill className='text-xl  '></RiCheckboxCircleFill>
        <p className='text-xl font-[Sen] '>Verification </p>
        </div>
}            
<Link className='font-[Sen] m-auto text-blue-500' to='/faceRecognition/enrol'>Not Enrolled before? Enrol Here</Link>

</div>
</>
    )
 }
