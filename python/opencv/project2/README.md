# 🕶️ Face Anonymizer

Ẩn danh khuôn mặt trong ảnh/video bằng **OpenCV** + **Mediapipe**.  
Ứng dụng này giúp bạn nhận diện và làm mờ (blur) hoặc che (pixelate) khuôn mặt để bảo mật thông tin cá nhân.

---

## 📦 Yêu cầu

- Python 3.10 – 3.12 (khuyến nghị dùng Python 3.11)
- Các thư viện cần thiết:

```bash
opencv-python==4.10.0.84
mediapipe==0.10.21
numpy==1.26.4
```

## ⚙️ Cài đặt

Clone repo và cài đặt thư viện:

```bash
download: https://github.com/kitajima2910/error404-labs/tree/master/python/opencv/project2
```

### Gỡ các package cũ trước khi cài

```bash
pip uninstall -r requirements.txt -y
```

#### Cài lại môi trường

```bash
pip install -r requirements.txt
```

## 🚀 Cách sử dụng

##### 🔧 Cấu hình `mode` + `filePath`

| Mode     | filePath (mặc định) | Mô tả                                     |
| -------- | ------------------- | ----------------------------------------- |
| `video`  | `./testVideo.mp4`   | Chạy ẩn danh khuôn mặt trên video có sẵn. |
| `image`  | `./testImage.jpg`   | Chạy ẩn danh khuôn mặt trên ảnh tĩnh.     |
| `webcam` | `None`              | Chạy realtime từ webcam.                  |

## 👨‍💻 Tác giả

Phạm Xuân Hoài – R&D Programmer
