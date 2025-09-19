import cv2
import os
import mediapipe as mp
import argparse

def process_img(img, face_detection):

    H, W, _ = img.shape
    # scale = 50
    # width = int(W * scale / 100)
    # height = int(H * scale / 100)
    # img = cv2.resize(img, (width, height))
    # img = cv2.imshow("original", img)

    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = face_detection.process(img_rgb)

    if results.detections is not None:
        for detection in results.detections:
            location_data = detection.location_data
            bbox = location_data.relative_bounding_box

            x1, y1, w, h = bbox.xmin, bbox.ymin, bbox.width, bbox.height

            x1, y1 = int(x1 * W), int(y1 * H)
            w, h = int(w * W), int(h * H)

            # blur faces
            # img[y1:y1 + h, x1:x1 + w, :] = cv2.blur(img[y1:y1 + h, x1:x1 + w, :], (30, 30))

            try:
                img[y1:y1 + h, x1:x1 + w, :] = cv2.blur(img[y1:y1 + h, x1:x1 + w, :], (30, 30))
                cv2.rectangle(img, (x1, y1), (x1 + w, y1 + h), (0, 255, 0), 1)
            except:
                pass
    return img

args = argparse.ArgumentParser()
args.add_argument("--mode", default="video")
args.add_argument("--filePath", default="./testVideo.mp4")
# args.add_argument("--mode", default="image")
# args.add_argument("--filePath", default="./testImage.jpg")
# args.add_argument("--mode", default="webcam")
# args.add_argument("--filePath", default=None)

args = args.parse_args()

# detect faces
mp_face_detection = mp.solutions.face_detection

# read image
# img = cv2.imread(os.path.join(".", args.filePath))

with mp_face_detection.FaceDetection(model_selection=0, min_detection_confidence=0.5) as face_detection:
    if args.mode == "image":

        img = cv2.imread(os.path.join(".", args.filePath))
        img = process_img(img, face_detection)

        # save image
        cv2.imwrite(os.path.join(".", "output.png"), img)
    elif args.mode == "video":

        cap = cv2.VideoCapture(args.filePath)
        ret, frame = cap.read()

        output_video = cv2.VideoWriter(os.path.join(".", "output.mp4"), cv2.VideoWriter_fourcc(*'mp4v'), 25.0, (frame.shape[1], frame.shape[0]))

        while ret:

            frame = process_img(frame, face_detection)

            output_video.write(frame)

            ret, frame = cap.read()

            

        cap.release()
        output_video.release()
    elif args.mode == "webcam":
        cap = cv2.VideoCapture(0)
        ret, frame = cap.read()

        while True:
            
            frame = process_img(frame, face_detection)

            cv2.imshow("Webcam", frame)

            

            if cv2.waitKey(25) & 0xFF == ord('q'):
                break

            ret, frame = cap.read()

            

        cap.release()
        cv2.destroyAllWindows()
pass