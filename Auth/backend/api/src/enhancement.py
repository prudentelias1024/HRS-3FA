import cv2 as cv
import numpy as np

def histogramEqualizer(inputImg):
    equImg = cv.equalizeHist(inputImg)
    equHist = cv.calcHist([equImg],[0], None, [256], [0,256])
    equcdf = equHist.cumsum()
    equcdfNorm = equcdf *float(equHist.max()) /equcdf.max()
    return equImg
    
def claheEqualizer(inputImg):
    claheObj = cv.createCLAHE(clipLimit=5, tileGridSize=(8,8))
    claheImg = claheObj.apply(inputImg)
   
    claheHist = cv.calcHist([claheImg], [0], None, [256], [0,256])
    clahecdfNorm = claheHist.cumsum()
    return claheImg
    
def check_dark_background(img):
    average_intensity = np.mean(img)
    if average_intensity < 50:
        return True
    else: 
        return False
    