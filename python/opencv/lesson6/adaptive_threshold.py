import os
import cv2

img = cv2.imread(os.path.join(".", "handwrriten.jpg"))

img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# _, thresh = cv2.threshold(img_gray, 127, 255, cv2.THRESH_BINARY)
adaptive_thresh = cv2.adaptiveThreshold(img_gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 21, 30)
_, simple_thresh = cv2.threshold(img_gray, 80, 255, cv2.THRESH_BINARY)

cv2.imshow("img", img)
cv2.imshow("adaptive_thresh", adaptive_thresh)
cv2.imshow("simple_thresh", simple_thresh)
cv2.waitKey(0)
cv2.destroyAllWindows()