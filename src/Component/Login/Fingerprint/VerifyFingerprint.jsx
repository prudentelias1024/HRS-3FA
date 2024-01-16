import React, {useRef,useState} from 'react'
import { IoIosFingerPrint } from 'react-icons/io'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function VerifyFingerprint() {
    const fingerprintRef = useRef()
    const [fingerprint, setFingerprint] = useState(null)
    const [verificationError, setVerificationError] = useState(null)
    const navigate = useNavigate()
    const chooseFingerprintImage = () => {
     fingerprintRef.current.click()
    }
    const uploadFingerprint = async() => {
        const formData = new FormData()
        formData.append('fingerprint_image',fingerprintRef.current.files[0],fingerprintRef.current.files[0].name)
        const res = (await axios.post('http://localhost:8000/api/fingerprint/verifyUser', formData)).data
        if(res.status == 200){
            localStorage.setItem('access-token', res.access_token)
            navigate('/Dashboard')
        }
        if(res.status == 401){
            setVerificationError('Wrong fingerprint Uploaded. Upload the Fingerprint Image that was assigned to you during Enrolling')
        }
        
    }
  return (
    <div className="flex flex-col p-[2em] m-auto w-fit">
        <div className=''>
        <p className="text-[Outfit]"></p>
        {
          verificationError != null?
          <p className="font-[Outfit] text-base m-[1em] text-red-500 font-semibold text-center mb-[1em] ">{verificationError}</p>
     :''
        }
    
    <p className="font-[Outfit] text-center">Click to upload Fingerprint</p>
    <IoIosFingerPrint className='text-9xl m-auto' onClick={chooseFingerprintImage}></IoIosFingerPrint>
    <p className="font-[Outfit] text-center ">{fingerprintRef.current !== undefined && fingerprintRef.current.files !== undefined ? fingerprintRef.current.files[0].name:''}</p>
    <input type="file" ref={fingerprintRef} name="fingerprint" accept='.jpeg'   className='hidden'/>
        </div>
    
    <button onClick={uploadFingerprint} className='m-auto rounded-md font-[Sen]  lg:w-[20em] w-[95%] inline-flex gap-[.5em]  p-[.75em]  bg-purple-500 text-white font-bold '><IoIosFingerPrint className='text-2xl ml-[1em]'></IoIosFingerPrint>Verify Fingerprint</button>
    
    </div>
  )
}
