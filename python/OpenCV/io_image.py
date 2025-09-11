import os
import cv2

# read image
image_path = os.path.join(".", "data", "bird.jpg")
img = cv2.imread(image_path)

# write image
cv2.imwrite(os.path.join(".", "data", "bird_out.jpg"), img)

# visulize image with = 600, height = auto
desired_width = 600
h, w = img.shape[:2]
aspect_ratio = h / w
new_height = int(desired_width * aspect_ratio)
img = cv2.resize(img, (desired_width, new_height))

cv2.imshow("image", img)
cv2.waitKey(0)

cv2.destroyAllWindows()