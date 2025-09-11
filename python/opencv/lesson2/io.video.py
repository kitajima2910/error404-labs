import os
import cv2

# read video
video_path = os.path.join(".", "data", "bird.mp4")
video = cv2.VideoCapture(video_path)

# visulize video
ret = True
while ret:
    ret, frame = video.read()

    if ret:
        desired_width = 600
        h, w = frame.shape[:2]
        aspect_ratio = w / h
        new_height = int(desired_width / aspect_ratio)
        frame_resized = cv2.resize(frame, (desired_width, new_height))
        cv2.imshow("video", frame_resized)
        if cv2.waitKey(40) != -1: # 25 fps
            break

video.release()
cv2.destroyAllWindows()
