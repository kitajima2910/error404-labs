import cv2
import dlib

# đọc ảnh
img = cv2.imread("dien_thi_co_sao.png")
img.astype('uint8')

# chuyển ảnh sang grayscale (3D -> 2D)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# dlib: để nhận diện khuôn mặt
face_detector = dlib.get_frontal_face_detector()

# load mô hình nhan diện khuôn mặt
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")

# sử dụng để detect khuôn mặt
faces = face_detector(gray)
print(f"Faces detected: {len(faces)}")

for face in faces:
    x1 = face.left()
    y1 = face.top()
    x2 = face.right()
    y2 = face.bottom()

    # vẽ hình vuông lên khuôn mặt
    # cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 1)
    
    face_features = predictor(gray, face)
    
    # vẽ 68 điểm trên khuôn mặt
    for n in range(0, 68):
        x = face_features.part(n).x
        y = face_features.part(n).y
        
        # vẽ chấm tròn nhỏ
        cv2.circle(img, (x, y), 2, (255, 0, 0), -1)

# hiển thị ảnh
cv2.imshow("Face Recognition App", img)

# chờ nhấn nút để đóng lại
cv2.waitKey(0)

# đóng tất cả cửa sổ
cv2.destroyAllWindows()
