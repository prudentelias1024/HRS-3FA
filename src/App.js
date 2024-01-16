import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import Auth   from './Component/Auth'
import './index.css'
import FaceRecogniton from './Component/Login/Face Recognition/faceRecognition';
import FaceEnroller from './Component/Login/Face Recognition/FaceEnroller';
import NativeLogin from './Component/Login/Native Authentication/NativeLogin';
import NativeRegistration from './Component/Login/Native Authentication/NativeRegistration';
import Dashboard from './Component/Dashboard';
import MedicalInfo from './Component/Dashboard/Medical Info/MedicalInfo';
import { useDispatch } from 'react-redux';
import { actions } from './store';
import Appointments from './Component/Dashboard/Appointment/Appointments';
import Settings from './Component/Dashboard/Settings';
import Doctors from './Component/Dashboard/Doctors';
import Tests from './Component/Dashboard/Medical Tests/Tests';
import AddTests from './Component/Dashboard/Medical Tests/AddTests';
import Medications from './Component/Dashboard/Medications/Medications';
import MedicalConditions from './Component/Dashboard/Conditions/MedicalConditions.jsx';
import axios from 'axios';
import { useEffect } from 'react';
import Logout from './Component/Logout';
import NativeLoginDoctor from './Component/Login/Native Authentication/NativeLoginDoctor';
import Patients from './Component/Dashboard/Patients';
import AddMedication from './Component/Dashboard/Medications/AddMedication';
import EditMedicalInfo from './Component/Dashboard/Medical Info/EditMedicalInfo';
import AddAppointment from './Component/Dashboard/Appointment/AddAppointment';
import Fingerprint from './Component/Login/Fingerprint/fingerprint.jsx';
import VerifyFingerprint from './Component/Login/Fingerprint/VerifyFingerprint.jsx';

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
  const getMedicalInfo = async() => {
    const res = await(await axios.get('http://localhost:8000/api/medicalInfo', {headers: {Authorization: localStorage.getItem('access-token')}})).data
    console.log(res)
    dispatch(actions.updateMedicalInfo(res.medical_info))
  }
   useEffect(() => {
    getMedicalInfo()
     getUser()
    },[])
  
  return (
 
    <div className="App">
      <Routes>

        <Route path='/' element={<Auth/>} />
        <Route path='/logout' element={<Logout/>} />
        <Route path='/fingerprint/enrol' element={<Fingerprint/>} />
        <Route path='/fingerprint' element={<VerifyFingerprint/>} />
        <Route path='/faceRecognition' element={<FaceRecogniton/>} />
        <Route path='/faceRecognition/enrol' element={<FaceEnroller/>} />
        <Route path='/nativeLogin' element={<NativeLogin/>} />
        <Route path='/nativeLogin/doctor' element={<NativeLoginDoctor/>} />
        <Route path='/NativeRegistration' element={<NativeRegistration/>} />
        <Route path='/Dashboard' element={<Dashboard/>} />
        <Route path='/Dashboard/MedicalInfo' element={<MedicalInfo/>} />
        <Route path='/Dashboard/Appointment' element={<Appointments/>} />
        <Route path='/Dashboard/addAppointment' element={<AddAppointment/>} />
        <Route path='/Dashboard/Settings' element={<Settings/>} />
        <Route path='/Dashboard/Doctors' element={<Doctors/>} />
        <Route path='/Dashboard/Patients' element={<Patients/>} />
        <Route path='/Dashboard/Medications' element={<Medications/>} />
        <Route path='/Dashboard/MedicalInfo/edit' element={<EditMedicalInfo/>} />
        <Route path='/Dashboard/AddMedication' element={<AddMedication/>} />
        <Route path='/Dashboard/Tests/AddTest' element={<AddTests/>} /> 
        <Route path='/Dashboard/Tests' element={<Tests/>} />
        <Route path='/Dashboard/Conditions' element={<MedicalConditions/>} />
      </Routes>
    </div>
  );
}

export default App;
