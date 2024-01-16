import numpy as np
import cv2
import os

test_img = cv2.imread(r"C:\Users\ADMIN\PycharmProjects\Artificial Intelligence\Face Attendance Marker\HBS\hbs\Auth\test_c.jpg",cv2.COLOR_BGR2GRAY)

faces_detected,gray_img = all.face_detection(test_img)
# cv2.imshow(faces_detected)
print('Face Detected',faces_detected)
dataset_path = "C:\\Users\\ADMIN\\PycharmProjects\\Artificial Intelligence\\Face Attendance Marker\\HBS\\hbs\\Auth\\Datasets\\0"
faces, faceID = all.labeller(dataset_path)
face_recognizer = cv2.face.LBPHFaceRecognizer_create()
face_recognizer.train(np.array(faces), np.array(faceID))
face_recognizer.save(r"C:\Users\ADMIN\PycharmProjects\Artificial Intelligence\Face Attendance Marker\HBS\hbs\Auth\trainingData.yml")

name = {0:'Elias',1:'Oluwatayo'}

for face in faces:
    (x,y,w,h) = face
    roi_gray = gray_img[y:y+w, x:x+h]
    label, confidence = face_recognizer.predict(roi_gray)
    print(f'This belongs to label {label} with confidence {confidence}')
    (x,y,w,h) = face
    cv2.rectangle(test_img,(x,y),(x+w,y+h),(0,255,0),thickness=3)
    cv2.putText(test_img,name[label],(x,y),cv2.FONT_HERSHEY_DUPLEX,1,(255,0,0),3)
    predict_name= name[label]
    fr.put_text(test_img, name,x,y)
    

cv2.imshow(test_img)
cv2.waitKey(0)
cv2.destroyAllWindows()
