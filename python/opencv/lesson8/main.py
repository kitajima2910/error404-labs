import os
import cv2

img = cv2.imread(os.path.join(".", "whiteboard.jpg"))

# line
cv2.line(img, (98, 229), (182, 390), (119, 98, 178), 2)

# rectangle
cv2.rectangle(img, (388, 329), (502, 442), (255, 0, 0), -1)

# circle
cv2.circle(img, (675, 568), 100, (0, 255, 0), 2)

# text
cv2.putText(img, "kitajima2910", (226, 238), cv2.FONT_HERSHEY_SIMPLEX, 3, (255, 255, 25), 2)

cv2.imshow("Whiet board", img)
cv2.waitKey(0)
cv2.destroyAllWindows()