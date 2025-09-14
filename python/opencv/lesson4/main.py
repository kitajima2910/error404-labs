import os
import cv2

img = cv2.imread(os.path.join(".", "bird.jpg"))

h, w = img.shape[:2]
scale_percent = 20
width = int(w * scale_percent / 100)
height = int(h * scale_percent / 100)
resized_img = cv2.resize(img, (width, height))

img_gray = cv2.cvtColor(resized_img, cv2.COLOR_BGRA2GRAY)
img_rgb = cv2.cvtColor(resized_img, cv2.COLOR_BGR2RGB)
img_hsv = cv2.cvtColor(resized_img, cv2.COLOR_BGR2HSV)

cv2.imshow("Image", resized_img)
cv2.imshow("img_hsv", img_hsv)
cv2.waitKey(0)
cv2.destroyAllWindows()