# AGENTS

Đây là file luật chính. Chỉ cần đọc file này trước khi làm việc.

## Quy Tắc Khởi Động Bắt Buộc

Trước khi thực hiện bất kỳ yêu cầu nào:

1. Đọc AGENTS.md
2. Đọc .aiignore
3. Đọc STATUS.md
4. Áp dụng toàn bộ quy tắc trong AGENTS.md

Quy tắc này áp dụng cho:

* Session mới
* Workspace mở lại
* Hội thoại bị reset
* Lệnh `/new`
* Mọi task trong tương lai

Không được bắt đầu bất kỳ công việc nào cho đến khi AGENTS.md đã được đọc và áp dụng đầy đủ.

## Trình tự bắt buộc

1. Đọc .aiignore
2. Đọc STATUS.md
3. Chỉ đọc file source liên quan trực tiếp tới task
4. Làm đúng phạm vi task
5. Cập nhật STATUS.md sau khi xong
6. Trả lời bằng tiếng Việt

## Luật cốt lõi

* Patch nhỏ nhất có thể
* Không redesign nếu không được yêu cầu
* Không đổi tên biến / hàm / class / file nếu không cần
* Không đụng code không liên quan
* Không mở file nặng, build output, logs, assets lớn nếu không cần
* Ưu tiên token thấp, context gọn, tốc độ cao
* Nếu STATUS.md chưa tồn tại thì tự tạo
* Nếu STATUS.md quá dài thì tự rút gọn, chỉ giữ thông tin còn hữu ích

## Khi xong task

Báo ngắn gọn:

* Đã làm gì
* File nào đã sửa
* Vì sao sửa
* Ảnh hưởng hệ thống
* Bước tiếp theo
* Commit message ngắn
