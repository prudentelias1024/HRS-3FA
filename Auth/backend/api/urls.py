
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views
urlpatterns = [
    path('nativeLogin', views.native_login),
    path('nativeRegistration', views.native_register),
    
    path('face/enrol', views.enrol_user_face),
    path('fingerprint/enrol', views.enrol_user_fingerprint),
    
    path('face/verifyUser', views.face_verify_user),
    path('fingerprint/verifyUser', views.verify_fingerprint),
    
    
    path('user', views.get_user),
    path('tests', views.user_test),
    path('tests/my', views.doctor_test),
    
    path('appointments/my', views.doctor_appointment),
    path('appointments', views.appointments),
    path('appointments/done', views.done_appointment),
    path('appointments/done/my', views.doctor_done_appointment),
   
    path('medications/my', views.doctor_medications),
    path('medications', views.user_medications),
    
    path('appointments/upcoming', views.upcoming_appointment),
    
    path('appointments/upcoming/my', views.doctor_upcoming_appointment),
        
    path('doctors/all', views.all_doctors),
    path('patients/my', views.my_patient),
    path('patients/my/remove', views.remove_patient),
    path('patients/my/add', views.add_patient),
    path('patients/all', views.not_my_patient),

    path('download/media/test/<str:pk>', views.download_test_file),
    
    path('medicalInfo', views.medical_info),
    path('patient/medicalInfo/<int:pk>', views.patient_medical_info),
    
] +  static( settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

