import cv2 as cv
import numpy as np

face_net = cv.dnn.readNetFromCaffe('deploy.prototxt', 'res10_300x300_ssd_iter_140000.caffemodel')
face_net