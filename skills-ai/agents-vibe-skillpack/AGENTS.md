# AGENTS

Đây là file vào cửa duy nhất.

## Trình tự bắt buộc
1. Đọc .aiignore
2. Đọc STATUS.md
3. Đọc PROJECT.md
4. Chỉ đọc skill/workflow liên quan trong .agent/
5. Chỉ làm đúng phạm vi TASK
6. Cập nhật STATUS.md sau khi xong
7. Nếu thay đổi kiến trúc hoặc quyết định lớn, cập nhật PROJECT.md
8. Luôn giải thích bằng tiếng Việt

## Luật cứng
- Patch nhỏ nhất có thể
- Không redesign nếu không được yêu cầu
- Không đổi tên biến/hàm/class/file nếu không cần
- Không thêm feature ngoài task
- Không đụng code không liên quan
- Không mở file nặng nếu không cần
- Luôn ưu tiên token thấp, context gọn

## Output sau task
- Đã làm gì
- File nào đã đổi
- Vì sao đổi
- Ảnh hưởng hệ thống
- Lưu ý còn lại
- Commit message ngắn
