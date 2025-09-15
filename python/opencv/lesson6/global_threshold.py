import os
import cv2

img = cv2.imread(os.path.join(".", "bear.jpg"))

h, w = img.shape[:2]
scale = 20
w_new, h_new = int(w * scale / 100), int(h * scale / 100)
img = cv2.resize(img, (w_new, h_new))

img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
_, thresh = cv2.threshold(img_gray, 80, 255, cv2.THRESH_BINARY)

thresh = cv2.blur(thresh, (10, 10))
_, thresh = cv2.threshold(thresh, 80, 255, cv2.THRESH_BINARY)

cv2.imshow("img", img)
cv2.imshow("img_binary", thresh)
cv2.waitKey(0)
cv2.destroyAllWindows()