import os
import cv2
import argparse
import numpy as np
from datetime import datetime
from pathlib import Path

def ensure_dir(p: Path) -> Path:
    p.mkdir(parents=True, exist_ok=True)
    return p

def save(outdir: Path, name: str, img):
    path = outdir / name
    cv2.imwrite(str(path), img)
    print(f"[+] Saved: {path}")

def unsharp_mask(img_gray, amount=1.6, sigma=1.0):
    # img_gray: uint8
    blur = cv2.GaussianBlur(img_gray, (0, 0), sigma)
    out = cv2.addWeighted(img_gray, amount, blur, -(amount - 1.0), 0)
    return out

def laplacian_sharpen(img_gray, ksize=3, weight=0.6):
    lap = cv2.Laplacian(img_gray, cv2.CV_16S, ksize=ksize)
    lap_abs = cv2.convertScaleAbs(lap)
    out = cv2.addWeighted(img_gray, 1.0, lap_abs, weight, 0)
    return out

def main(args):
    # ==== paths ====
    inp_path = Path(args.input)
    if not inp_path.exists():
        raise FileNotFoundError(f"Không tìm thấy ảnh: {inp_path}")

    stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    outdir = ensure_dir(Path("outputs") / (inp_path.stem + "_" + stamp))

    # ==== 0) Read & optional resize ====
    img = cv2.imread(str(inp_path), cv2.IMREAD_COLOR)
    if args.scale != 1.0:
        img = cv2.resize(
            img,
            (int(img.shape[1] * args.scale), int(img.shape[0] * args.scale)),
            interpolation=cv2.INTER_AREA,
        )
    save(outdir, "00_original.jpg", img)

    # ==== 1) Grayscale ====
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    save(outdir, "01_grayscale.png", gray)

    # ==== 2) CLAHE (tăng tương phản cục bộ) ====
    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8)).apply(gray)
    save(outdir, "02_CLAHE.png", clahe)

    # ==== 3) Denoising ====
    # 3a) Median filter (k=3 hoặc 5)
    median = cv2.medianBlur(clahe, 3)
    save(outdir, "03a_median_k3.png", median)

    # 3b) Non-Local Means (giữ cạnh tốt)
    nlm = cv2.fastNlMeansDenoising(median, h=10, templateWindowSize=7, searchWindowSize=21)
    save(outdir, "03b_nonlocalmeans.png", nlm)

    # ==== 4) Morphology ====
    # Chữ khắc thường tối hơn nền -> dùng black-hat để làm nổi chữ tối mảnh.
    kernel_bh = cv2.getStructuringElement(cv2.MORPH_RECT, (17, 17))  # chỉnh 13–21 tùy ảnh
    blackhat = cv2.morphologyEx(nlm, cv2.MORPH_BLACKHAT, kernel_bh)
    save(outdir, "04a_blackhat.png", blackhat)

    # Trộn black-hat vào ảnh đã khử nhiễu để tăng nổi chữ
    enhanced = cv2.addWeighted(nlm, 1.0, blackhat, 1.2, 0)
    save(outdir, "04b_enhanced_add_blackhat.png", enhanced)

    # Loại đốm nhỏ (opening)
    kernel_small = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    opened = cv2.morphologyEx(enhanced, cv2.MORPH_OPEN, kernel_small, iterations=1)
    save(outdir, "04c_opening.png", opened)

    # ==== 5) Sharpen ====
    unsharp = unsharp_mask(opened, amount=1.6, sigma=1.0)
    save(outdir, "05a_unsharp.png", unsharp)

    lap_sharp = laplacian_sharpen(opened, ksize=3, weight=0.6)
    save(outdir, "05b_laplacian.png", lap_sharp)

    # ==== 6) Binarization (Adaptive threshold) ====
    # Dùng ảnh đã unsharp để nhị phân hoá chuẩn bị cho OCR
    th = cv2.adaptiveThreshold(
        unsharp,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        35,   # blockSize (số lẻ 31–41 thường ổn)
        15    # C (10–18 tuỳ ảnh; tăng lên để giảm nền)
    )
    save(outdir, "06_adaptive_threshold.png", th)

    # Nối nét sau threshold (closing)
    kernel_close = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    th_closed = cv2.morphologyEx(th, cv2.MORPH_CLOSE, kernel_close, iterations=1)
    save(outdir, "07_threshold_closed.png", th_closed)

    # ==== 7) Ảnh gợi ý đưa vào OCR ====
    save(outdir, "FINAL_for_OCR_grayscale.png", unsharp)
    save(outdir, "FINAL_for_OCR_binary.png", th_closed)

    print("\n✅ Hoàn tất. Ảnh xuất tại thư mục:", outdir.resolve())

    if args.show:
        # Xem nhanh các bước (bấm phím bất kỳ để qua ảnh kế)
        steps = [
            ("00 Original", img),
            ("01 Grayscale", gray),
            ("02 CLAHE", clahe),
            ("03a Median", median),
            ("03b NLM", nlm),
            ("04a Black-hat", blackhat),
            ("04b Enhanced", enhanced),
            ("04c Opening", opened),
            ("05a Unsharp", unsharp),
            ("05b Laplacian", lap_sharp),
            ("06 Adaptive Threshold", th),
            ("07 Closing", th_closed),
        ]
        for title, picture in steps:
            cv2.imshow(title, picture)
            cv2.waitKey(0)
            cv2.destroyAllWindows()


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--input", "-i", default="MySon_img.jpg",
                    help="Đường dẫn ảnh đầu vào (mặc định: MySon_img.jpg)")
    ap.add_argument("--scale", type=float, default=1.0,
                    help="Tỉ lệ resize trước khi xử lý (mặc định 1.0)")
    ap.add_argument("--show", action="store_true",
                    help="Hiển thị từng bước bằng cửa sổ OpenCV")
    args = ap.parse_args()
    main(args)
