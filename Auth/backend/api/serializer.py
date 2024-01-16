from rest_framework import serializers
import uuid
class UserSerializer(serializers.Serializer):
    user_id = serializers.UUIDField(default=uuid.uuid4)
    full_name = serializers.CharField(max_length=100)
    email = serializers.CharField(max_length=100)
    dob = serializers.DateField()
    phone_no = serializers.IntegerField()
    profile_img = serializers.ImageField()
    password = serializers.CharField(max_length=50)

    gender = serializers.CharField(max_length=6)
    address = serializers.CharField(max_length=200)
    enrolled_face = serializers.BooleanField(allow_null=True)
    enrolled_fingerprint = serializers.BooleanField(allow_null=True)
    three_fa_id = serializers.IntegerField()
    assigned_specialist = serializers.CharField(max_length=200)
 

class UserDisplaySerializer(serializers.Serializer):
    user_id = serializers.UUIDField(default=uuid.uuid4)
    full_name = serializers.CharField(max_length=100)
    email = serializers.CharField(max_length=100)
    dob = serializers.DateField()
    phone_no = serializers.IntegerField()
    profile_img = serializers.ImageField()
    gender = serializers.CharField(max_length=6)
    address = serializers.CharField(max_length=200)
    enrolled_face = serializers.BooleanField(allow_null=True)
    enrolled_fingerprint = serializers.BooleanField(allow_null=True)
    
   
    
 
  
class DoctorSerializer(serializers.Serializer):
    user_id = UserDisplaySerializer()  
    specialization = serializers.CharField(max_length=40)
    department = serializers.CharField(max_length=40)
    
    
    
    
 
class AppointmentSerializer(serializers.Serializer):
    
    id = serializers.UUIDField(default=uuid.uuid4)
    specialist = DoctorSerializer()
    description = serializers.CharField(max_length=1000)
    title = serializers.CharField(max_length=100)
    appointment_start_time = serializers.DateTimeField()
    appointment_end_time = serializers.DateTimeField()
    appointed_to = UserSerializer()
    appointment_status = serializers.BooleanField()

class MedicalInfoSerializer(serializers.Serializer):
    user_id = UserDisplaySerializer()
    blood_pressure = serializers.CharField(max_length=6) #mmHg
    blood_sugar = serializers.IntegerField() #mg/dL
    blood_group = serializers.CharField(max_length=20)
    genotype = serializers.CharField(max_length=2)
    cholesterol = serializers.IntegerField()  #mgdL
    pulse = serializers.IntegerField() #bpm
    bmi = serializers.FloatField()  #underweight <18.5 #normal 18.5~24.9 #overweight 25~29.9 #obesity 30
    height = serializers.FloatField() #cm
    temperature = serializers.FloatField() #cm
  
    weight = serializers.FloatField() #kg
    current_medical_conditions = serializers.CharField(max_length=1000)
    previous_medical_conditions = serializers.CharField(max_length=1000)
    allergy = serializers.CharField(max_length=1000)
    intolerance = serializers.CharField(max_length=1000)
    date_added = serializers.DateTimeField()
    
   
   
class TestSerializer(serializers.Serializer):
    id = serializers.UUIDField(default=uuid.uuid4)
    patient = UserDisplaySerializer()
    specialist = DoctorSerializer()
    type = serializers.CharField(max_length=100)
    lab_note = serializers.CharField(max_length=1000)
    taken_at = serializers.CharField(max_length=100)
    status = serializers.CharField(max_length=20)
    taken_on = serializers.DateTimeField()
    released_on = serializers.DateTimeField()
    file = serializers.FileField()
  
  
class MedicationSerializer(serializers.Serializer):
    id = serializers.UUIDField(default=uuid.uuid4)
    prescribed_by = DoctorSerializer()
    prescribed_to = UserDisplaySerializer()
    name = serializers.CharField(max_length=100)
    reason = serializers.CharField(max_length=200)
    description = serializers.CharField(max_length=1000)
    possible_allergies = serializers.CharField(max_length=250)
    type = serializers.CharField(max_length=100)
    dosage = serializers.CharField(max_length=4)
    created_on =  serializers.DateTimeField()
    
  