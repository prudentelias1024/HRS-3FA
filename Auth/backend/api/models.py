from django.db import models
from django.utils import timezone
# Create your models here.
import uuid
class User(models.Model):
    user_id = models.UUIDField(default=uuid.uuid4)
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    dob = models.DateField()
    phone_no = models.IntegerField()
    profile_img = models.ImageField(upload_to='user/')
    password = models.CharField(max_length=50)
    gender = models.CharField(max_length=6)
    address = models.CharField(max_length=200)
    enrolled_face = models.BooleanField(default=False)
    enrolled_fingerprint = models.BooleanField(default=False)
    three_fa_id = models.IntegerField(primary_key=True)
    assigned_specialist = models.CharField(max_length=200)
    
   
    class Meta:
        db_table = 'Users'


class Doctor(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')

    specialization = models.CharField(max_length=40)
    department = models.CharField(max_length=40)
      
    class Meta:
        db_table = 'Doctors'
 
    
    
    
 
class Appointment(models.Model):
    
    id = models.UUIDField(default=uuid.uuid4,primary_key=True)
    specialist = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='specialist')
  
    description = models.CharField(max_length=1000)
    title = models.CharField(max_length=100)
    appointment_start_time = models.DateTimeField()
    appointment_end_time = models.DateTimeField()
    appointed_to = models.ForeignKey(User, on_delete=models.CASCADE,related_name='appointer')

    appointment_status = models.BooleanField()

    
    class Meta:
        db_table = 'Appointments'
 

class MedicalInfo(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE,related_name='patient')
    blood_pressure = models.CharField(max_length=6) #mmHg
    blood_sugar = models.IntegerField() #mg/dL
    blood_group = models.CharField(max_length=20)
    genotype = models.CharField(max_length=2)
    cholesterol = models.IntegerField()  #mgdL
    pulse = models.IntegerField() #bpm
    bmi = models.FloatField()  #underweight <18.5 #normal 18.5~24.9 #overweight 25~29.9 #obesity 30
    height = models.FloatField() #cm
    temperature = models.FloatField() #cm
  
    weight = models.FloatField() #kg
    current_medical_conditions = models.CharField(max_length=1000)
    previous_medical_conditions = models.CharField(max_length=1000)
    allergy = models.CharField(max_length=1000)
    intolerance = models.CharField(max_length=1000)
    date_added = models.DateTimeField(default=timezone.now)
    class Meta:
        db_table = 'Medical_info'

   
class Test(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    patient = models.ForeignKey(User, on_delete=models.CASCADE)
    specialist = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    type = models.CharField(max_length=100)
    lab_note = models.CharField(max_length=1000)
    taken_at = models.CharField(max_length=100)
    status = models.CharField(max_length=20)
    taken_on = models.DateTimeField()
    released_on = models.DateTimeField()
    file = models.FileField(upload_to='test/')
    
    class Meta:
        db_table = 'Tests'

  
class Medication(models.Model):
    id = models.UUIDField(default=uuid.uuid4,primary_key=True)
    prescribed_by =  models.ForeignKey(Doctor, on_delete=models.CASCADE)
    prescribed_to = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=100)
    reason = models.CharField(max_length=200)
    description = models.CharField(max_length=1000)
    possible_allergies = models.CharField(max_length=250)
    type = models.CharField(max_length=100)
    dosage = models.CharField(max_length=4)
    created_on =  models.DateTimeField(default=timezone.now)
    
    class Meta():
        db_table = 'Medications'