import cv2

from util import get_limits
from PIL import Image

green =  [0, 255, 0]
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()

    hsv_image = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    lower_limit, upper_limit = get_limits(color=green)

    mask = cv2.inRange(hsv_image, lower_limit, upper_limit)

    mask_ = Image.fromarray(mask)

    bbox = mask_.getbbox()

    # print(bbox)

    if bbox:
        x1, y1, x2, y2 = bbox
        frame = cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

    cv2.imshow("frame", frame)

    if cv2.waitKey(40) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()