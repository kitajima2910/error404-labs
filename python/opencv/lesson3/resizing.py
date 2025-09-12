import os
import cv2

# resizing
img = cv2.imread(os.path.join('.', 'dog.jpg'))

h, w = img.shape[:2]
scale_percent = 10  # percent of original size
width = int(w * scale_percent / 100)
height = int(h * scale_percent / 100)
resized_img = cv2.resize(img, (width, height))

print("Original Dimensions : ", img.shape)
print("Resized Dimensions : ", resized_img.shape)

cv2.imshow("Original Image", img)
cv2.imshow("Resized Image", resized_img)
cv2.waitKey(0)

cv2.destroyAllWindows()