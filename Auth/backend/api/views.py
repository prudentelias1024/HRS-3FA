from django.shortcuts import render
import jwt
from .models import User, Appointment, Doctor,MedicalInfo,Medication,Test
from .serializer import UserSerializer,AppointmentSerializer,DoctorSerializer,MedicalInfoSerializer,MedicationSerializer ,UserDisplaySerializer,  TestSerializer
from django.conf import settings
from rest_framework.response import Response
from django.utils import timezone
import bcrypt
from PIL import Image
from .src import all
import base64
from io import BytesIO
import cv2
import numpy as np
from django.http import  HttpResponse
import os
import mimetypes
from pathlib import Path
# Create your views here.

from rest_framework.decorators import api_view

def authenticator(req):
    if req.META.get('HTTP_AUTHORIZATION') != None:
        token = req.META['HTTP_AUTHORIZATION']    
        user_id = jwt.decode(token,settings.APP_SECRET_KEY )
        try:
             user = User.objects.get(user_id=user_id['user_id'])
             user = UserSerializer(user).data
             req.user = { "full_name": user['full_name'],
                'email': user['email'],
                'dob': user['dob'], 
                "user_id": user['user_id'],
                'phone_no': user['phone_no'], 
                'profile_img': user['profile_img'], 
                "gender": user['gender'],
                "address": user['address'],
                "enrolled_face": user['enrolled_face'],
                "enrolled_fingerprint": user['enrolled_fingerprint'],
                "three_fa_id": user['three_fa_id'],
                "assigned_specialist": user['assigned_specialist'],    
                'type' : 'patient'
       
            }
         
        except User.DoesNotExist:
            return False
        try:
                user = Doctor.objects.get(user_id=user['three_fa_id'])
                user = DoctorSerializer(user).data
                req.user['type'] = 'doctor'
       
                return True
        except Doctor.DoesNotExist:
                return True
        
@api_view(['POST'])
def native_login(req):
    print(req.data)
    email = req.data['email']
    password = req.data['password'].encode('utf-8')
    try:
       user =  User.objects.get(email=email)
       user = UserSerializer(user).data
    except User.DoesNotExist:
             return Response({"emailError":'User does not exist'})
    hashed_password = user['password'].replace('b\'','').replace('\'','').encode('utf-8')
    if bcrypt.checkpw(password, hashed_password):
            token = jwt.encode({'user_id':user['user_id']}, settings.APP_SECRET_KEY)
            return Response({"user": user, "access_token": token})
    
      
            
    else:
        return Response({"passwordError": "Password Incorrect"})
    



@api_view(['POST'])
def native_register(req):
    if req.method == 'POST':
            password = req.data['password'].encode('utf-8')
            password = bcrypt.hashpw(password, bcrypt.gensalt())
   
            user = User(
                full_name=req.data['full_name'],
                email=req.data['email'],
                dob=req.data['dob'],
                address=req.data['address'],
                phone_no=req.data['phone_no'],
                gender=req.data['gender'],
                profile_img=req.data['profile_img'],
                password=password,
                        )
            user.save()
            return Response({'status':200})


@api_view(['POST'])
def verify_fingerprint(req):
        if req.method == 'POST':
                img_data = req.FILES.get('fingerprint_image')
                img_data = img_data.read()
                np_arr = np.frombuffer(img_data,np.uint8)
                img_data = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
         
                res = all.find_fingerprint_label(img_data)
                if res !=  'Unknown':
                    user = User.objects.get(three_fa_id=res)
                    user = UserSerializer(user).data
                    token = jwt.encode({'user_id':user['user_id']}, settings.APP_SECRET_KEY)
                    return Response({"status": 200, "access_token": token})
                else:
                    return Response({"status": 401})
                
            
                
                
                
                
@api_view(['POST'])
def enrol_user_face(req):
    
    authenticated = authenticator(req)
    print(authenticated)
    if authenticated:
        if req.method == 'POST':
            if not req.user['enrolled_face']:
                data = req.data['image']
                img_data = base64.b64decode(data.split(',')[1])
                np_arr = np.frombuffer(img_data,np.uint8)
                img_data = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
            
                res = all.enrol_face(img_data, req.user['three_fa_id'])
                if res['done']:
                    user = User.objects.get(user_id=req.user['user_id'])
                    user.enrolled_face = True
                    user.save()
                return Response(res)
    
    else:
        return Response({"status": 403})    



@api_view(['POST'])
def face_verify_user(req): 
    if req.method == 'POST':
        data = req.data['image']
        img_data = base64.b64decode(data.split(',')[1])
        np_arr = np.frombuffer(img_data,np.uint8)
        img_data = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        res = all.recognize_user(img_data)
        if res['face_detected']:        
            user = User.objects.get(three_fa_id=res['label'])
            user = UserSerializer(user).data
            token = jwt.encode({'user_id':user['user_id']}, settings.APP_SECRET_KEY)
            return Response({ "access_token": token, "face_detected":res['face_detected'], "confidence": res['confidence']})
        else:
             return Response({  "face_detected":res['face_detected'], "confidence": res['confidence']})
    
        


@api_view(['GET','POST'])
def user_test(req):
    if req.method == 'POST':
        authenticated = authenticator(req)
        if authenticated:
            patient = User.objects.get(three_fa_id=req.data['patient_id'])
            specialist = Doctor.objects.get(user_id=req.data['specialist_id'])
            test = Test(patient=patient,
                        specialist=specialist,
                        type=req.data['type'],
                        lab_note=req.data['lab_note'],
                        taken_at=req.data['taken_at'],
                        status=req.data['status'],
                        taken_on=req.data['taken_on'],
                        released_on=req.data['released_on'],
                        file=req.data['file']
                        )
            test.save()
            return Response({"status":200})
        
    if req.method == 'GET':
        authenticated = authenticator(req)
        if authenticated:
            try:
                user = User.objects.get(three_fa_id= req.user['three_fa_id'])
                tests = Test.objects.filter(patient=user)
                tests = TestSerializer(tests, many=True).data
                return Response({"status": 200,"tests":tests})
  
            except Test.DoesNotExist:
                return Response({"status":404})
        else:
            return Response({"status":403})
        
        
            
            
                
            
            
@api_view(['GET'])
def doctor_test(req):
    if req.method == 'GET':
        authenticated = authenticator(req)
        if authenticated:
            try:
                user = Doctor.objects.get(user_id= req.user['three_fa_id'])
                tests = Test.objects.filter(specialist=user)
                tests = TestSerializer(tests, many=True).data
                return Response({"status": 200,"tests":tests})
  
            except Test.DoesNotExist:
                return Response({"status":404})
        else:
            return Response({"status":403})
    

            
@api_view(['GET'])
def doctor_appointment(req):
     if req.method == 'GET':
        authenticated = authenticator(req)
        if authenticated:
            try:
                user = Doctor.objects.get(user_id= req.user['three_fa_id'])
                appointments = Appointment.objects.filter(specialist=user)
                appointments = AppointmentSerializer(appointments, many=True).data
                return Response({"status": 200,"appointments":appointments})
  
            except Appointment.DoesNotExist:
      
                return Response({"status":404})
        else:
                return Response({"status":403})
      
        
        

@api_view(['GET','POST'])
def appointments(req):
  if req.method == 'GET':
        authenticated = authenticator(req)
        if authenticated:
            try:
                user = User.objects.get(three_fa_id= req.user['three_fa_id'])
                appointments = Appointment.objects.filter(appointed_to=user)
                appointments = AppointmentSerializer(appointments, many=True).data
                return Response({"status": 200,"appointments":appointments})
  
            except Appointment.DoesNotExist:
                return Response({"status":404})
        else:
                return Response({"status":403})
            
  



@api_view(['GET'])
def done_appointment(req):
    now = timezone.now()
    if req.method == 'GET':
        authenticated = authenticator(req)
        if authenticated:
            try:
                user = User.objects.get(user_id= req.user['user_id'])
                appointments = Appointment.objects.filter(appointed_to=user,appointment_end_time__lt=now)
                appointments = AppointmentSerializer(appointments, many=True).data
                return Response({"status": 200,"appointments":appointments})
  
            except Doctor.DoesNotExist:
                return Response({"status":404})
    else:
                return Response({"status":403})
    
  

@api_view(['GET'])
def doctor_ongoing_appointment(req):
     now = timezone.now()
     if req.method == 'GET':
        authenticated = authenticator(req)
        if authenticated:
            try:
                user = Doctor.objects.get(user_id= req.user['three_fa_id'])
                appointments = Appointment.objects.filter(specialist=user,appointment_start_time__gt=now, appointment_end_time__lt=now)
                appointments = AppointmentSerializer(appointments, many=True).data
                return Response({"status": 200,"appointments":appointments})
  
            except Doctor.DoesNotExist:
                return Response({"status":404})
     else:
                return Response({"status":403})
    


@api_view(['GET'])
def doctor_done_appointment(req):
     now = timezone.now()
     if req.method == 'GET':
        authenticated = authenticator(req)
        if authenticated:
            try:
                user = Doctor.objects.get(user_id= req.user['three_fa_id'])
                appointments = Appointment.objects.filter(specialist=user,appointment_end_time__lt=now)
                appointments = AppointmentSerializer(appointments, many=True).data
                return Response({"status": 200,"appointments":appointments})
  
            except Doctor.DoesNotExist:
                return Response({"status":404})
     else:
                return Response({"status":403})
    


@api_view(['GET'])
def ongoing_appointment(req):
    now = timezone.now()
    if req.method == 'GET':
        authenticated = authenticator(req)
        if authenticated:
            try:
                user = User.objects.get(three_fa_id= req.user['three_fa_id'])
                appointments = Appointment.objects.filter(appointed_to=user,appointment_start_time__gt=now, appointment_end_time__gt=now)
                appointments = AppointmentSerializer(appointments, many=True).data
                return Response({"status": 200,"appointments":appointments})
  
            except Appointment.DoesNotExist:
                return Response({"status":404})
        else:
                return Response({"status":403})
            
  

@api_view(['GET'])
def doctor_upcoming_appointment(req):
    now = timezone.now()
    if req.method == 'GET':
        authenticated = authenticator(req)
        if authenticated:
            try:
                user = Doctor.objects.get(user_id= req.user['three_fa_id'])
                appointments = Appointment.objects.filter(specialist=user,appointment_start_time__gt=now)
                appointments = AppointmentSerializer(appointments, many=True).data
                return Response({"status": 200,"appointments":appointments})
  
            except Appointment.DoesNotExist:
                return Response({"status":404})
        else:
                return Response({"status":403})
            

@api_view(['GET'])
def upcoming_appointment(req):
    now = timezone.now()
    if req.method == 'GET':
        authenticated = authenticator(req)
        if authenticated:
            try:
                user = User.objects.get(three_fa_id= req.user['three_fa_id'])
                appointments = Appointment.objects.filter(appointed_to=user,appointment_start_time__gt=now)
                appointments = AppointmentSerializer(appointments, many=True).data
                return Response({"status": 200,"appointments":appointments})
  
            except Appointment.DoesNotExist:
                return Response({"status":404})
        else:
                return Response({"status":403})
            
    


@api_view(['GET'])
def all_doctors(req):
 if req.method == 'GET':
        authenticated = authenticator(req)
        if authenticated:
            try:
                doctors = Doctor.objects.all()
                doctors = DoctorSerializer(doctors, many=True).data
                return Response({"status": 200,"doctors":doctors})
  
            except Doctor.DoesNotExist:
                return Response({"status":404})
        else:
            return Response({"status":403})
    
  
    
    
@api_view(['GET','POST'])
def user_medications(req):
    if req.method == 'POST':
        authenticated = authenticator(req)
        if authenticated:
            patient = User.objects.get(three_fa_id=req.data['patient_id'])
            specialist = Doctor.objects.get(user_id=req.data['specialist_id'])
            medication = Medication(
                prescribed_by=specialist,
                prescribed_to=patient,
                name=req.data['name'],
                reason=req.data['reason'],
                description=req.data['description'],
                possible_allergies=req.data['possible_allergies'],
                type=req.data['type'],
                dosage=req.data['dosage'],        
                manufacturer=req.data['manufacturer'],        
            )
            medication.save()
            return Response({"status": 200})
   
    if req.method == 'GET':
        authenticated = authenticator(req)
        if authenticated:
            try:         
                user = User.objects.get(user_id=req.user['user_id'])
                medications = Medication.objects.filter(prescribed_to= user)
                medications = MedicationSerializer(medications,many=True).data
                return Response({"status": 200,"medications":medications})
  
            except Medication.DoesNotExist:
                return Response({"status":404})
        else:
                return Response({"status":403})
    

    
@api_view(['GET','POST'])
def doctor_medications(req):
    if req.method == 'GET':
        authenticated = authenticator(req)
        if authenticated:
            try:         
                user = Doctor.objects.get(user_id=req.user['three_fa_id'])
                medications = Medication.objects.filter(prescribed_by= user)
                medications = MedicationSerializer(medications,many=True).data
                return Response({"status": 200,"medications":medications})
  
            except Medication.DoesNotExist:
                return Response({"status":404})
        else:
                return Response({"status":403})
    





@api_view(['PUT'])
def remove_patient(req):
  if req.method == 'PUT':
        authenticated = authenticator(req)
        if authenticated:
            patient = User.objects.get(three_fa_id=req.data['userId'])
            patient.assigned_specialist = None
            patient.save()
            return Response({"status": 200})


@api_view(['PUT'])
def add_patient(req):
  if req.method == 'PUT':
        authenticated = authenticator(req)
        if authenticated:
            patient = User.objects.get(three_fa_id=req.data['userId'])
            patient.assigned_specialist = req.user['user_id']
            patient.save()
            return Response({"status": 200})




@api_view(['GET'])
def my_patient(req):
    
     if req.method == 'GET':
        authenticated = authenticator(req)
        if authenticated:
            try:
                patients = User.objects.filter(assigned_specialist=req.user['user_id'])
                patients = UserSerializer(patients, many=True).data
                return Response({"status": 200,"patients":patients})
  
            except User.DoesNotExist:
                return Response({"status":404})
        else:
            return Response({"status":403})



@api_view(['GET'])
def not_my_patient(req):
     if req.method == 'GET':
        authenticated = authenticator(req)
        if authenticated:
            try:
                patients = User.objects.filter(assigned_specialist__isnull=True,
                                               ).exclude(three_fa_id=req.user['three_fa_id'])
                patients = UserSerializer(patients, many=True).data
                return Response({"status": 200,"patients":patients})
  
            except User.DoesNotExist:
                return Response({"status":404})
        else:
            return Response({"status":403})
    
@api_view(['GET','POST', 'PUT'])
def medical_info(req):
        if req.method == 'PUT':
            authenticated = authenticator(req)
            if authenticated:
                print(req.data['bmi'])
                medical_info = MedicalInfo.objects.get(user_id=req.data['patient_id'])
                medical_info.blood_pressure= req.data['blood_pressure'] 
                medical_info.blood_sugar=req.data['blood_sugar'] 
                medical_info.blood_group=req.data['blood_group'] 
                medical_info.genotype=req.data['genotype'] 
                medical_info.cholesterol=req.data['cholesterol'] 
                medical_info.pulse=req.data['pulse'] 
                medical_info.bmi=req.data['bmi'] 
                medical_info.weight =req.data['weight'] 
                medical_info.height=req.data['height'] 
                medical_info.temperature=req.data['temperature'] 
                medical_info.current_medical_conditions=req.data['current_medical_conditions'] 
                medical_info.previous_medical_conditions=req.data['previous_medical_conditions'] 
                medical_info.allergy=req.data['allergy'] 
                medical_info.intolerance=req.data['intolerance'] 
                medical_info.save()      
                return Response({"status": 200})

        if req.method == 'POST':
            authenticated = authenticator(req)
            if authenticated:
                patient = User.objects.get(three_fa_id=req.data['patient_id'])
                # specialist = Doctor.objects.get(user_id=req.data['specialist_id'])
                medical_info = MedicalInfo(
                   user_id=patient,
                #    doc_id=specialist,
                   blood_pressure=req.data['blood_pressure'] ,
                   blood_sugar=req.data['blood_sugar'] ,
                   blood_group=req.data['blood_group'] ,
                   genotype=req.data['genotype'] ,
                   cholesterol=req.data['cholesterol'] ,
                   pulse=req.data['pulse'] ,
                   bmi=req.data['bmi'] ,
                   weight=req.data['weight'] ,
                   height=req.data['height'] ,
                   temperature=req.data['temperature'] ,
                   current_medical_conditions=req.data['current_medical_conditions'] ,
                   previous_medical_conditions=req.data['previous_medical_conditions'] ,
                   allergy=req.data['allergy'] ,
                   intolerance=req.data['intolerance'] ,
                )

                
                
                
        if req.method == 'GET':
            authenticated = authenticator(req)
            if authenticated:
                try:
                    user = User.objects.get(three_fa_id=req.user['three_fa_id'])
                    medical_info = MedicalInfo.objects.get(user_id=user)
                    medical_info = MedicalInfoSerializer(medical_info).data
                    return Response({"status": 200,"medical_info":medical_info})
    
                except MedicalInfo.DoesNotExist:
                    return Response({"status":404})
            else:
                return Response({"status":403})
            
@api_view(['GET'])
def patient_medical_info(req,pk):
         if req.method == 'GET':
            authenticated = authenticator(req)
            if authenticated:
                try:
                    user = User.objects.get(three_fa_id=pk)
                    medical_info = MedicalInfo.objects.get(user_id=user)
                    medical_info = MedicalInfoSerializer(medical_info).data
                    return Response({"status": 200,"medical_info":medical_info})
    
                except MedicalInfo.DoesNotExist:
                    return Response({"status":404})
            else:
                return Response({"status":403})
   
@api_view(['GET'])
def download_test_file(req,pk):
    authenticated = authenticator(req)
    if authenticated:
        if req.method == 'GET':
            print(pk)
            BASE_DIR = Path(__file__).resolve().parent.parent   
            fingerprint_image = os.path.join(BASE_DIR, 'media/test')
            fingerprint_image = os.path.join(fingerprint_image, pk)
            with open(fingerprint_image,'rb') as file:       
                mime_type = mimetypes.guess_type(fingerprint_image)
                res = HttpResponse(file.read(), content_type='image/jpeg')
                res['Content-Disposition'] = f"attachment; filename='test_result.jpg'"
                res['Content-Length'] = os.path.getsize(fingerprint_image)
                return res
    
            
       
    
    
@api_view(['GET'])
def get_user(req):
            authenticated = authenticator(req)
            if authenticated:
                     return Response({"status":200, "user": req.user})
            else:
                return Response({"status":403, "message": "You are not authenticated. Please login"})
   
@api_view(['GET'])
def enrol_user_fingerprint(req):
    authenticated = authenticator(req)
      
    if req.method == 'GET':
        if authenticated:
            fingerprint_image =  all.enrol_fingerprint(req.user['three_fa_id'])
            user = User.objects.get(user_id=req.user['user_id'])
            user.enrolled_fingerprint = True
            user.save()
            dest_path = "C:\\Users\\ADMIN\\PycharmProjects\\hrs-3fa\\hbs\\Auth\\backend\\Datasets\\Fingerprint\\" + str(1) 
            fingerprint_image = os.path.join(dest_path,"fingerprint.jpg")
            
            
            if os.path.exists(fingerprint_image)  :
                with open(fingerprint_image,'rb') as file:       
                    mime_type = mimetypes.guess_type(fingerprint_image)
                    res = HttpResponse(file.read(), content_type='image/jpeg')
                    res['Content-Disposition'] = f"attachment; filename='fingerprint.jpg'"
                    res['Content-Length'] = os.path.getsize(fingerprint_image)
                return res
            
        else:
            return Response({"status":403, "message": "You are not authenticated. Please login"})

