import os
import cv2

img = cv2.imread(os.path.join(".", "dog.jpg"))

h, w = img.shape[:2]
width = int(w * 10 / 100)
height = int(h * 10 / 100)
resizing_img = cv2.resize(img, (width, height))

# print("Original Dimensions : ", img.shape)
print("Resized Dimensions : ", resizing_img.shape)

crop_img = resizing_img[211:510, 212:344]

cv2.imshow("resizing_img", resizing_img)
cv2.imshow("crop_img", crop_img)
cv2.waitKey(0)

cv2.destroyAllWindows()