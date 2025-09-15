import os
import cv2

img = cv2.imread(os.path.join(".", "anh-xam-me.png"))

h, w = img.shape[:2]
scale = 100
w_new, h_new = int(w * scale / 100), int(h * scale / 100)
img = cv2.resize(img, (w_new, h_new))

k_size = 7
img_blur = cv2.blur(img, (k_size, k_size))

img_gaussian_blur = cv2.GaussianBlur(img, (k_size, k_size), 3)

img_median_blur = cv2.medianBlur(img, k_size)

cv2.imshow("img", img)
cv2.imshow("img_blur", img_blur)
cv2.imshow("img_gaussian_blur", img_gaussian_blur)
cv2.imshow("img_median_blur", img_median_blur)
cv2.waitKey(0)
cv2.destroyAllWindows()