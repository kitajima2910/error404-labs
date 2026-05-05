/**
 * Dữ liệu prompt AI cho 50 Mini Tools Vibe
 * Mỗi prompt hướng dẫn AI tạo ra công cụ mini tương ứng bằng HTML/CSS/JS thuần.
 */
export const VIBE_PROMPTS = [
    {
        id: 1,
        toolName: 'Calculator',
        content: `Hãy tạo một ứng dụng máy tính mini bằng HTML, CSS và JavaScript thuần (không dùng framework).

Yêu cầu giao diện:
- Thiết kế hiện đại, bo góc, màu sắc pastel (tím/xanh dương nhạt)
- Màn hình hiển thị số lớn, rõ ràng
- Các nút bấm có hiệu ứng hover và active mượt mà
- Responsive, hoạt động tốt trên mobile

Yêu cầu chức năng:
- Các phép tính cơ bản: cộng (+), trừ (-), nhân (×), chia (÷)
- Nút xóa (C) và xóa từng ký tự (⌫)
- Hỗ trợ số thập phân
- Hiển thị lịch sử phép tính vừa thực hiện
- Xử lý lỗi chia cho 0

Tất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.`,
    },
    {
        id: 2,
        toolName: 'Random Number',
        content: `Hãy tạo một ứng dụng tạo số ngẫu nhiên bằng HTML, CSS và JavaScript thuần.

Yêu cầu giao diện:
- Thiết kế vui tươi, màu hồng/đỏ pastel
- Số ngẫu nhiên hiển thị to, nổi bật với hiệu ứng animation khi xuất hiện
- Có ô nhập min/max để tùy chỉnh khoảng số
- Nút "Tạo số mới" với hiệu ứng shake/bounce

Yêu cầu chức năng:
- Tạo số ngẫu nhiên trong khoảng [min, max] do người dùng nhập
- Lưu lịch sử 10 số gần nhất
- Nút copy số vừa tạo
- Hiệu ứng confetti nhỏ khi tạo số
- Validate input (min < max, chỉ nhận số nguyên)

Tất cả code trong một file HTML duy nhất.`,
    },
    {
        id: 3,
        toolName: 'Random Emoji',
        content: `Hãy tạo một ứng dụng tạo emoji ngẫu nhiên bằng HTML, CSS và JavaScript thuần.

Yêu cầu giao diện:
- Thiết kế vui nhộn, màu vàng/cam pastel
- Emoji hiển thị cực to (font-size 120px) với animation bounce
- Có các danh mục emoji: Cảm xúc, Động vật, Thức ăn, Du lịch, Hoạt động
- Nút "Shuffle" với hiệu ứng xoay

Yêu cầu chức năng:
- Random 1 emoji từ danh mục đã chọn (hoặc tất cả)
- Hiển thị tên emoji bên dưới
- Nút copy emoji vào clipboard
- Tạo bộ 5 emoji ngẫu nhiên cùng lúc
- Lưu emoji yêu thích (localStorage)

Tất cả code trong một file HTML duy nhất.`,
    },
    {
        id: 4,
        toolName: 'Dark Mode Toggle',
        content: `Hãy tạo một demo chuyển đổi Dark/Light mode bằng HTML, CSS và JavaScript thuần.

Yêu cầu giao diện:
- Toggle switch đẹp với icon mặt trời ☀️ và mặt trăng 🌙
- Transition mượt mà khi chuyển đổi (0.3s ease)
- Demo content đầy đủ: header, cards, text, buttons để thấy rõ sự khác biệt
- Màu sắc dark mode: nền #1a1a2e, text #e0e0e0

Yêu cầu chức năng:
- Lưu trạng thái vào localStorage
- Tự động áp dụng theme đã lưu khi load trang
- CSS variables để quản lý màu sắc
- Hỗ trợ prefers-color-scheme của hệ thống

Tất cả code trong một file HTML duy nhất, có comment giải thích CSS variables.`,
    },
    {
        id: 5,
        toolName: 'Button Sound',
        content: `Hãy tạo một demo nút bấm có âm thanh bằng HTML, CSS và JavaScript thuần (Web Audio API).

Yêu cầu giao diện:
- Nhiều loại nút với thiết kế đẹp: Primary, Success, Warning, Danger
- Hiển thị sóng âm animation khi bấm
- Volume slider để điều chỉnh âm lượng
- Toggle bật/tắt âm thanh

Yêu cầu chức năng:
- Tạo âm thanh bằng Web Audio API (không cần file âm thanh ngoài)
- Mỗi loại nút có âm thanh khác nhau (tần số khác nhau)
- Hiệu ứng ripple khi click
- Âm thanh: click ngắn, success (ascending), error (descending), warning (beep)

Tất cả code trong một file HTML duy nhất, giải thích cách Web Audio API hoạt động.`,
    },
    {
        id: 6,
        toolName: 'Text Preview',
        content: `Hãy tạo một ứng dụng xem trước văn bản real-time bằng HTML, CSS và JavaScript thuần.

Yêu cầu giao diện:
- Layout 2 cột: bên trái là textarea nhập liệu, bên phải là preview
- Thanh công cụ định dạng: Bold, Italic, Underline, màu chữ, cỡ chữ
- Font selector với các font phổ biến
- Nút copy HTML output

Yêu cầu chức năng:
- Preview cập nhật real-time khi gõ (debounce 100ms)
- Hỗ trợ Markdown cơ bản: **bold**, *italic*, # heading, - list
- Đếm số từ và ký tự real-time
- Export preview ra file .txt hoặc .html
- Lưu nội dung vào localStorage tự động

Tất cả code trong một file HTML duy nhất.`,
    },
    {
        id: 7,
        toolName: 'Text Size Slider',
        content: `Hãy tạo một ứng dụng điều chỉnh kích thước văn bản bằng HTML, CSS và JavaScript thuần.

Yêu cầu giao diện:
- Slider đẹp với gradient màu cam/vàng
- Hiển thị kích thước hiện tại (px và rem)
- Vùng preview text lớn, rõ ràng
- Các preset nhanh: Small (12px), Normal (16px), Large (24px), XL (32px), XXL (48px)

Yêu cầu chức năng:
- Slider range từ 8px đến 72px
- Thay đổi font-size real-time
- Điều chỉnh line-height tự động theo font-size
- Hỗ trợ nhiều font family
- Nút reset về mặc định
- Lưu cài đặt vào localStorage

Tất cả code trong một file HTML duy nhất.`,
    },
    {
        id: 8,
        toolName: 'Background Changer',
        content: `Hãy tạo một ứng dụng thay đổi màu nền bằng HTML, CSS và JavaScript thuần.

Yêu cầu giao diện:
- Color picker đẹp với palette màu sẵn có
- Preview toàn màn hình với transition mượt mà
- Gradient generator: chọn 2-3 màu và hướng gradient
- Hiển thị mã màu HEX, RGB, HSL

Yêu cầu chức năng:
- Chọn màu đơn hoặc gradient
- 20+ màu preset đẹp
- Random màu ngẫu nhiên
- Copy mã màu/CSS vào clipboard
- Lưu màu yêu thích (tối đa 10 màu)
- Export CSS gradient code

Tất cả code trong một file HTML duy nhất.`,
    },
    {
        id: 9,
        toolName: 'Click Counter',
        content: `Hãy tạo một ứng dụng đếm số lần click bằng HTML, CSS và JavaScript thuần.

Yêu cầu giao diện:
- Số đếm hiển thị cực to, nổi bật
- Nút click lớn với hiệu ứng ripple và bounce
- Thanh progress bar hiển thị tiến độ đến mục tiêu
- Màu sắc thay đổi theo mốc: xanh → vàng → đỏ

Yêu cầu chức năng:
- Đếm số lần click, double-click, right-click riêng biệt
- Đặt mục tiêu (goal) và thông báo khi đạt
- Tốc độ click (clicks/giây) real-time
- Nút reset với confirm dialog
- Lưu kỷ lục cao nhất vào localStorage
- Chế độ đếm ngược (countdown)

Tất cả code trong một file HTML duy nhất.`,
    },
    {
        id: 10,
        toolName: 'Theme Picker',
        content: `Hãy tạo một ứng dụng chọn theme giao diện bằng HTML, CSS và JavaScript thuần.

Yêu cầu giao diện:
- Grid các theme card với preview màu sắc
- Demo UI đầy đủ: navbar, cards, buttons, form để xem trước theme
- Transition mượt mà khi đổi theme
- Badge "Active" trên theme đang dùng

Yêu cầu chức năng:
- Ít nhất 8 theme: Default, Ocean, Forest, Sunset, Candy, Midnight, Rose, Mint
- Mỗi theme có: primary color, secondary, background, text, accent
- Lưu theme đã chọn vào localStorage
- Tạo theme tùy chỉnh (custom theme builder)
- Export theme dưới dạng CSS variables

Tất cả code trong một file HTML duy nhất, sử dụng CSS custom properties.`,
    },
    {
        id: 11,
        toolName: 'Character Counter',
        content: `Hãy tạo một ứng dụng đếm ký tự văn bản bằng HTML, CSS và JavaScript thuần.

Yêu cầu giao diện:
- Textarea lớn, dễ nhìn với placeholder hướng dẫn
- Dashboard thống kê: tổng ký tự, ký tự không khoảng trắng, từ, câu, đoạn
- Progress bar hiển thị % so với giới hạn
- Màu cảnh báo khi gần đạt giới hạn

Yêu cầu chức năng:
- Đếm real-time: ký tự, từ, câu, đoạn văn
- Đặt giới hạn ký tự tùy chỉnh (Twitter: 280, SMS: 160, v.v.)
- Phân tích tần suất từ (top 10 từ xuất hiện nhiều nhất)
- Ước tính thời gian đọc
- Highlight từ trùng lặp

Tất cả code trong một file HTML duy nhất.`,
    },
    {
        id: 12,
        toolName: 'Word Counter',
        content: `Hãy tạo một ứng dụng đếm từ chuyên nghiệp bằng HTML, CSS và JavaScript thuần.

Yêu cầu giao diện:
- Editor textarea với line numbers
- Sidebar thống kê chi tiết
- Biểu đồ phân bố độ dài từ (bar chart đơn giản bằng CSS)
- Highlight từ khi hover vào thống kê

Yêu cầu chức năng:
- Đếm: từ, ký tự, câu, đoạn, dòng
- Thống kê từ: từ ngắn nhất, dài nhất, trung bình
- Top 10 từ xuất hiện nhiều nhất (loại bỏ stop words)
- Ước tính thời gian đọc (200 từ/phút)
- Ước tính thời gian nói (130 từ/phút)
- Export báo cáo thống kê

Tất cả code trong một file HTML duy nhất.`,
    },
    {
        id: 13,
        toolName: 'Text Case Converter',
        content: `Hãy tạo một ứng dụng chuyển đổi kiểu chữ bằng HTML, CSS và JavaScript thuần.

Yêu cầu giao diện:
- Textarea nhập liệu và output riêng biệt
- Các nút chuyển đổi với icon minh họa
- Preview real-time khi chọn kiểu
- Nút copy output nhanh

Yêu cầu chức năng:
- UPPERCASE: TẤT CẢ CHỮ HOA
- lowercase: tất cả chữ thường
- Title Case: Viết Hoa Đầu Mỗi Từ
- Sentence case: Viết hoa đầu câu
- camelCase: viếtHoaChữĐầuTừSauChữĐầu
- PascalCase: ViếtHoaTấtCảChữĐầuTừ
- snake_case: viết_thường_ngăn_cách_gạch_dưới
- kebab-case: viết-thường-ngăn-cách-gạch-ngang
- Hỗ trợ tiếng Việt có dấu

Tất cả code trong một file HTML duy nhất.`,
    },
    {
        id: 14,
        toolName: 'Text Trimmer',
        content: `Hãy tạo một ứng dụng xử lý khoảng trắng văn bản bằng HTML, CSS và JavaScript thuần.

Yêu cầu giao diện:
- Layout 2 cột: input và output song song
- Highlight các khoảng trắng thừa bằng màu đỏ nhạt trước khi xóa
- Thống kê: số ký tự đã xóa, % giảm
- Các tùy chọn dạng checkbox

Yêu cầu chức năng:
- Xóa khoảng trắng đầu/cuối (trim)
- Xóa khoảng trắng thừa giữa các từ (normalize)
- Xóa dòng trống thừa
- Xóa tab, thay bằng spaces
- Xóa ký tự đặc biệt tùy chọn
- Chuẩn hóa dấu câu (khoảng trắng sau dấu phẩy, chấm)
- Xử lý real-time hoặc theo nút bấm

Tất cả code trong một file HTML duy nhất.`,
    },
    {
        id: 15,
        toolName: 'Text Reverser',
        content: `Hãy tạo một ứng dụng đảo ngược văn bản bằng HTML, CSS và JavaScript thuần.

Yêu cầu giao diện:
- Animation chữ chạy ngược khi đảo
- Layout 2 cột với mũi tên ↔ ở giữa
- Nút swap để hoán đổi input/output
- Hiệu ứng typing animation cho output

Yêu cầu chức năng:
- Đảo ngược toàn bộ chuỗi ký tự
- Đảo ngược thứ tự từ (giữ nguyên từng từ)
- Đảo ngược từng dòng
- Đảo ngược thứ tự câu
- Đảo ngược và giữ nguyên dấu câu ở vị trí gốc
- Hỗ trợ Unicode và emoji
- Copy kết quả nhanh

Tất cả code trong một file HTML duy nhất.`,
    },
    {
        id: 16,
        toolName: 'To-Do List',
        content: `Hãy tạo một ứng dụng To-Do List đẹp bằng HTML, CSS và JavaScript thuần.

Yêu cầu giao diện:
- Thiết kế card-based, màu sắc tươi sáng
- Animation khi thêm/xóa task (slide in/out)
- Checkbox tùy chỉnh với animation tick
- Drag & drop để sắp xếp thứ tự task

Yêu cầu chức năng:
- Thêm, sửa, xóa task
- Đánh dấu hoàn thành với animation gạch ngang
- Phân loại: Tất cả, Đang làm, Hoàn thành
- Đặt độ ưu tiên: Cao, Trung bình, Thấp (màu sắc khác nhau)
- Đặt deadline và cảnh báo quá hạn
- Lưu vào localStorage
- Thống kê: tổng task, hoàn thành, còn lại

Tất cả code trong một file HTML duy nhất.`,
    },
    {
        id: 17,
        toolName: 'Sticky Notes',
        content: `Hãy tạo một ứng dụng ghi chú sticky notes bằng HTML, CSS và JavaScript thuần.

Yêu cầu giao diện:
- Sticky notes màu vàng/xanh/hồng/tím có thể kéo thả tự do
- Hiệu ứng giấy nhăn nhẹ (box-shadow, slight rotation)
- Nút thêm note mới với animation pop-in
- Nút xóa note với animation fade-out

Yêu cầu chức năng:
- Tạo note mới với màu tùy chọn
- Kéo thả note đến vị trí bất kỳ trên màn hình
- Chỉnh sửa nội dung trực tiếp (contenteditable)
- Resize note
- Pin note (ghim cố định)
- Lưu vị trí và nội dung vào localStorage
- Tìm kiếm trong các note

Tất cả code trong một file HTML duy nhất.`,
    },
    {
        id: 18,
        toolName: 'Countdown Timer',
        content: `Hãy tạo một ứng dụng đếm ngược thời gian bằng HTML, CSS và JavaScript thuần.

Yêu cầu giao diện:
- Hiển thị giờ:phút:giây dạng flip clock hoặc digital lớn
- Circular progress bar xung quanh đồng hồ
- Màu sắc thay đổi khi còn ít thời gian (xanh → vàng → đỏ)
- Nút Start/Pause/Reset với icon đẹp

Yêu cầu chức năng:
- Nhập thời gian tùy chỉnh (giờ, phút, giây)
- Preset nhanh: 1 phút, 5 phút, 10 phút, 25 phút, 1 giờ
- Âm thanh cảnh báo khi hết giờ (Web Audio API)
- Thông báo browser notification
- Lặp lại tự động (loop mode)
- Lưu preset tùy chỉnh

Tất cả code trong một file HTML duy nhất.`,
    },
    {
        id: 19,
        toolName: 'Pomodoro Timer',
        content: `Hãy tạo một ứng dụng Pomodoro Timer bằng HTML, CSS và JavaScript thuần.

Yêu cầu giao diện:
- Thiết kế tomato/cà chua đáng yêu 🍅
- Vòng tròn progress lớn, rõ ràng
- Phân biệt rõ 3 chế độ: Work (đỏ), Short Break (xanh), Long Break (xanh dương)
- Danh sách task tích hợp để theo dõi đang làm gì

Yêu cầu chức năng:
- Chu kỳ Pomodoro chuẩn: 25 phút làm việc, 5 phút nghỉ ngắn, 15 phút nghỉ dài
- Tùy chỉnh thời gian từng giai đoạn
- Tự động chuyển giai đoạn
- Đếm số pomodoro đã hoàn thành hôm nay
- Âm thanh chuông khi chuyển giai đoạn
- Thống kê: tổng thời gian tập trung, số pomodoro/ngày
- Lưu dữ liệu vào localStorage

Tất cả code trong một file HTML duy nhất.`,
    },
    {
        id: 20,
        toolName: 'Password Generator',
        content: `Hãy tạo một ứng dụng tạo mật khẩu mạnh bằng HTML, CSS và JavaScript thuần.

Yêu cầu giao diện:
- Hiển thị mật khẩu lớn, rõ ràng với font monospace
- Thanh đánh giá độ mạnh (Weak/Fair/Strong/Very Strong) với màu sắc
- Các checkbox tùy chọn ký tự đẹp
- Nút copy với animation "Copied!"

Yêu cầu chức năng:
- Độ dài từ 4 đến 128 ký tự (slider)
- Tùy chọn: chữ hoa, chữ thường, số, ký tự đặc biệt
- Loại trừ ký tự dễ nhầm: 0, O, l, 1, I
- Tạo nhiều mật khẩu cùng lúc (batch generate)
- Đánh giá độ mạnh theo entropy
- Lịch sử 10 mật khẩu gần nhất (không lưu localStorage vì bảo mật)
- Kiểm tra mật khẩu có trong danh sách phổ biến không

Tất cả code trong một file HTML duy nhất.`,
    },
    {
        id: 21,
        toolName: 'Color Picker',
        content: `Hãy tạo một ứng dụng chọn màu sắc chuyên nghiệp bằng HTML, CSS và JavaScript thuần.

Yêu cầu giao diện:
- Color wheel hoặc gradient picker đẹp
- Preview màu lớn với text mẫu để kiểm tra contrast
- Palette màu đã lưu dạng swatches
- Hiển thị đồng thời HEX, RGB, HSL, HSB

Yêu cầu chức năng:
- Chọn màu bằng color wheel + lightness slider
- Nhập trực tiếp mã HEX/RGB/HSL
- Tự động chuyển đổi giữa các format
- Kiểm tra contrast ratio (WCAG AA/AAA)
- Tạo color palette hài hòa: complementary, triadic, analogous
- Lưu màu yêu thích (localStorage)
- Copy mã màu theo format tùy chọn

Tất cả code trong một file HTML duy nhất.`,
    },
    {
        id: 22,
        toolName: 'Unit Converter',
        content: `Hãy tạo một ứng dụng chuyển đổi đơn vị bằng HTML, CSS và JavaScript thuần.

Yêu cầu giao diện:
- Tabs cho từng loại đơn vị với icon
- Layout 2 cột: nhập vào bên trái, kết quả bên phải
- Kết quả cập nhật real-time khi gõ
- Nút swap để đổi chiều chuyển đổi

Yêu cầu chức năng:
- Độ dài: mm, cm, m, km, inch, feet, yard, mile
- Khối lượng: mg, g, kg, tấn, ounce, pound
- Nhiệt độ: Celsius, Fahrenheit, Kelvin
- Diện tích: cm², m², km², inch², feet², acre, hectare
- Thể tích: ml, l, m³, teaspoon, tablespoon, cup, gallon
- Tốc độ: m/s, km/h, mph, knot
- Hiển thị công thức chuyển đổi

Tất cả code trong một file HTML duy nhất.`,
    },
    {
        id: 23,
        toolName: 'Date & Time',
        content: `Hãy tạo một ứng dụng hiển thị ngày giờ đẹp bằng HTML, CSS và JavaScript thuần.

Yêu cầu giao diện:
- Đồng hồ analog đẹp với kim giờ, phút, giây mượt mà
- Đồng hồ digital lớn bên cạnh
- Hiển thị ngày tháng năm, thứ trong tuần
- Múi giờ của nhiều thành phố lớn

Yêu cầu chức năng:
- Cập nhật real-time mỗi giây
- Hiển thị giờ theo 12h và 24h
- Chuyển đổi múi giờ: Hà Nội, Tokyo, London, New York, Sydney
- Tính số ngày đến sự kiện (countdown đến Tết, sinh nhật...)
- Hiển thị tuần thứ mấy trong năm
- Ngày Julian và Unix timestamp

Tất cả code trong một file HTML duy nhất, sử dụng Intl API.`,
    },
    {
        id: 24,
        toolName: 'Stopwatch',
        content: `Hãy tạo một ứng dụng đồng hồ bấm giờ bằng HTML, CSS và JavaScript thuần.

Yêu cầu giao diện:
- Hiển thị giờ:phút:giây.mili-giây với font monospace lớn
- Nút Start/Stop/Reset/Lap với icon và màu sắc phân biệt
- Danh sách lap times với highlight lap nhanh nhất/chậm nhất
- Animation nhấp nháy khi đang chạy

Yêu cầu chức năng:
- Độ chính xác đến mili-giây (requestAnimationFrame)
- Ghi lại lap time với nút Lap
- So sánh lap: highlight xanh (nhanh nhất), đỏ (chậm nhất)
- Tính thời gian trung bình các lap
- Export danh sách lap ra CSV
- Lưu kết quả vào localStorage

Tất cả code trong một file HTML duy nhất.`,
    },
    {
        id: 25,
        toolName: 'Alarm Clock',
        content: `Hãy tạo một ứng dụng báo thức bằng HTML, CSS và JavaScript thuần.

Yêu cầu giao diện:
- Đồng hồ digital lớn hiển thị giờ hiện tại
- Form đặt báo thức đẹp với time picker
- Danh sách báo thức với toggle bật/tắt
- Animation rung khi báo thức kêu

Yêu cầu chức năng:
- Đặt nhiều báo thức cùng lúc
- Chọn ngày lặp lại: hàng ngày, các ngày trong tuần, cuối tuần
- Âm thanh báo thức bằng Web Audio API (nhiều loại âm thanh)
- Snooze 5/10 phút
- Label cho từng báo thức
- Thông báo browser notification
- Lưu tất cả báo thức vào localStorage

Tất cả code trong một file HTML duy nhất.`,
    },
    {
        id: 26,
        toolName: 'Tip Calculator',
        content: "Hay tao mot ung dung tinh tien tip nha hang bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Thiet ke hien dai, mau xanh la/emerald\n- Nhap so tien hoa don, chon % tip (10/15/18/20/25 hoac tu nhap)\n- Hien thi tien tip va tong tien lon, ro rang\n- Ho tro chia hoa don cho nhieu nguoi\n\nYeu cau chuc nang:\n- Tinh tip theo % hoac so tien co dinh\n- Chia deu cho N nguoi (moi nguoi tra bao nhieu)\n- Lam tron len/xuong tuy chon\n- Luu lich su 5 lan tinh gan nhat\n- Reset nhanh\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 27,
        toolName: 'BMI Calculator',
        content: "Hay tao mot ung dung tinh chi so BMI bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Thiet ke y te, sach se, mau xanh duong/cyan\n- Nhap chieu cao (cm hoac feet/inch) va can nang (kg hoac lbs)\n- Hien thi BMI lon, ro rang voi mau sac theo muc do\n- Thanh gauge/meter truc quan\n\nYeu cau chuc nang:\n- Tinh BMI theo cong thuc chuan\n- Phan loai: Thieu can / Binh thuong / Thua can / Beo phi\n- Ho tro ca don vi metric va imperial\n- Hien thi can nang ly tuong theo chieu cao\n- Luu lich su do\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 28,
        toolName: 'Age Calculator',
        content: "Hay tao mot ung dung tinh tuoi chinh xac bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Thiet ke vui tuoi, mau hong/rose\n- Date picker dep cho ngay sinh\n- Hien thi tuoi theo nam, thang, ngay, gio, phut, giay\n- Dem nguoc den sinh nhat tiep theo\n\nYeu cau chuc nang:\n- Tinh tuoi chinh xac den tung giay\n- Hien thi ngay sinh la thu may trong tuan\n- Tinh so ngay da song\n- Tinh so nhip tim da dap (uoc tinh)\n- So sanh tuoi voi cac su kien lich su\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 29,
        toolName: 'Loan Calculator',
        content: "Hay tao mot ung dung tinh lai suat vay bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Thiet ke chuyen nghiep, mau xam/slate\n- Nhap so tien vay, lai suat/nam, thoi han vay\n- Hien thi ket qua ro rang: tien tra hang thang, tong lai, tong tien tra\n- Bieu do pie chart don gian (CSS)\n\nYeu cau chuc nang:\n- Tinh theo phuong phap giam dan du no\n- Hien thi bang lich tra no chi tiet (amortization table)\n- So sanh 2-3 kich ban vay khac nhau\n- Tinh toan khi tra them hang thang\n- Export bang tinh ra CSV\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 30,
        toolName: 'Currency Converter',
        content: "Hay tao mot ung dung quy doi tien te bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Thiet ke hien dai, mau vang/orange\n- Dropdown chon dong tien voi co quoc gia\n- Nhap so tien, hien thi ket qua real-time\n- Nut swap de doi chieu quy doi\n\nYeu cau chuc nang:\n- Ho tro 20+ dong tien pho bien (USD, EUR, VND, JPY, GBP, CNY...)\n- Su dung ty gia co dinh (hardcode ty gia mau, ghi chu can cap nhat)\n- Quy doi 1 dong tien sang nhieu dong tien cung luc\n- Lich su quy doi\n- Hien thi bien dong ty gia (mock data)\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 31,
        toolName: 'QR Code Generator',
        content: "Hay tao mot ung dung tao ma QR bang HTML, CSS va JavaScript thuan (dung thu vien qrcode.js qua CDN).\n\nYeu cau giao dien:\n- Thiet ke toi gian, mau den/trang\n- Textarea nhap noi dung (text, URL, so dien thoai, email)\n- Hien thi QR code lon, ro net\n- Tuy chon mau sac QR\n\nYeu cau chuc nang:\n- Tao QR tu text, URL, so dien thoai, WiFi, vCard\n- Tuy chinh kich thuoc (100px - 400px)\n- Tuy chinh mau foreground va background\n- Tai QR ve dang PNG\n- Copy QR vao clipboard\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 32,
        toolName: 'Base64 Encoder',
        content: "Hay tao mot ung dung ma hoa Base64 bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Layout 2 cot: input va output song song\n- Nut Encode va Decode ro rang\n- Hien thi kich thuoc truoc/sau ma hoa\n- Highlight loi neu input khong hop le\n\nYeu cau chuc nang:\n- Encode text sang Base64\n- Decode Base64 ve text\n- Ho tro encode/decode file (FileReader API)\n- Encode URL-safe Base64\n- Hien thi hex dump cua du lieu\n- Copy ket qua nhanh\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 33,
        toolName: 'URL Encoder',
        content: "Hay tao mot ung dung encode/decode URL bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Layout 2 cot ro rang\n- Highlight cac ky tu duoc encode bang mau sac\n- Hien thi so ky tu truoc/sau\n- Nut copy nhanh\n\nYeu cau chuc nang:\n- encodeURIComponent va decodeURIComponent\n- encodeURI va decodeURI\n- Phan tich URL thanh cac phan: protocol, host, path, query, hash\n- Xay dung URL tu cac phan\n- Encode/decode query string\n- Hien thi bang ky tu dac biet va ma tuong ung\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 34,
        toolName: 'JSON Formatter',
        content: "Hay tao mot ung dung format JSON bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Editor voi syntax highlighting don gian (mau sac cho key, value, string, number)\n- Nut Format, Minify, Validate\n- Hien thi loi cu the neu JSON khong hop le\n- So dong va highlight dong loi\n\nYeu cau chuc nang:\n- Format JSON dep voi indent tuy chon (2/4 spaces hoac tab)\n- Minify JSON (xoa khoang trang)\n- Validate va hien thi loi chi tiet\n- Chuyen JSON sang cac dinh dang: CSV, XML, YAML (don gian)\n- Sap xep key theo alphabet\n- Copy ket qua\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 35,
        toolName: 'Markdown Preview',
        content: "Hay tao mot ung dung xem truoc Markdown bang HTML, CSS va JavaScript thuan (dung marked.js qua CDN).\n\nYeu cau giao dien:\n- Layout 2 cot: editor ben trai, preview ben phai\n- Toolbar cac nut dinh dang: Bold, Italic, Heading, Link, Image, Code, List\n- Syntax highlighting cho code blocks (dung highlight.js CDN)\n- Toggle xem toan man hinh\n\nYeu cau chuc nang:\n- Preview cap nhat real-time\n- Ho tro day du cu phap Markdown: heading, bold, italic, link, image, code, table, blockquote\n- Export ra file .md hoac .html\n- Dem tu va ky tu\n- Luu noi dung vao localStorage\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 36,
        toolName: 'Regex Tester',
        content: "Hay tao mot ung dung kiem tra bieu thuc chinh quy (Regex) bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- O nhap regex voi cac flag (g, i, m, s)\n- Textarea nhap text de test\n- Highlight tat ca cac match bang mau vang\n- Hien thi danh sach cac match va capture groups\n\nYeu cau chuc nang:\n- Test regex real-time khi go\n- Hien thi so luong match\n- Hien thi capture groups (group 1, 2, 3...)\n- Chuc nang Replace: nhap chuoi thay the, hien thi ket qua\n- Thu vien regex mau: email, so dien thoai, URL, ngay thang...\n- Giai thich regex (mo ta tung phan)\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 37,
        toolName: 'Lorem Generator',
        content: "Hay tao mot ung dung tao van ban Lorem Ipsum bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Thiet ke sach se, mau tim nhat\n- Chon so luong: tu, cau, doan van\n- Nut Generate lon, noi bat\n- Ket qua hien thi dep voi font chu chu\n\nYeu cau chuc nang:\n- Tao Lorem Ipsum theo so tu/cau/doan tuy chon\n- Tao van ban tieng Viet ngau nhien (dung tu vung don gian)\n- Tao ten nguoi Viet ngau nhien\n- Tao dia chi Viet Nam ngau nhien\n- Tao so dien thoai, email ngau nhien (format hop le)\n- Copy ket qua nhanh\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 38,
        toolName: 'Gradient Generator',
        content: "Hay tao mot ung dung tao mau gradient bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Preview gradient toan chieu rong, dep mat\n- Color stops co the them/xoa/keo tha\n- Chon huong: linear (0-360 do) hoac radial\n- Hien thi CSS code real-time\n\nYeu cau chuc nang:\n- Tao linear gradient va radial gradient\n- Them nhieu color stops\n- Keo tha vi tri color stop\n- 20+ gradient preset dep\n- Copy CSS code\n- Export gradient thanh anh PNG\n- Chia se gradient qua URL (encode vao hash)\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 39,
        toolName: 'Box Shadow Generator',
        content: "Hay tao mot ung dung tao hieu ung do bong CSS bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Preview box voi shadow truc tiep\n- Sliders cho: offset-x, offset-y, blur, spread\n- Color picker cho mau bong\n- Toggle inset shadow\n\nYeu cau chuc nang:\n- Dieu chinh tat ca thuoc tinh box-shadow\n- Them nhieu lop shadow (multiple shadows)\n- 20+ shadow preset: soft, hard, neon, neumorphism...\n- Copy CSS code\n- Preview tren nen sang/toi\n- Hien thi code CSS va Tailwind tuong duong\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 40,
        toolName: 'Border Radius Picker',
        content: "Hay tao mot ung dung chon bo goc CSS bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Preview hinh vuong/chu nhat voi bo goc truc tiep\n- 4 slider cho 4 goc rieng biet\n- Toggle dong bo tat ca goc cung luc\n- Hien thi CSS code real-time\n\nYeu cau chuc nang:\n- Dieu chinh tung goc doc lap (top-left, top-right, bottom-right, bottom-left)\n- Ho tro gia tri elliptical (2 gia tri moi goc)\n- 15+ preset: circle, pill, leaf, blob...\n- Tao hinh dang blob ngau nhien\n- Copy CSS va Tailwind class\n- Hien thi don vi px va %\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 41,
        toolName: 'Flexbox Playground',
        content: "Hay tao mot ung dung thuc hanh Flexbox bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Container flex voi cac item co the them/xoa\n- Panel dieu khien tat ca thuoc tinh flex\n- Hien thi CSS code real-time\n- Giai thich tung thuoc tinh bang tieng Viet\n\nYeu cau chuc nang:\n- Dieu chinh: flex-direction, flex-wrap, justify-content, align-items, align-content\n- Dieu chinh tung item: flex-grow, flex-shrink, flex-basis, align-self, order\n- Them/xoa flex items\n- Thay doi kich thuoc container\n- 10+ layout preset pho bien\n- Copy CSS code\n\nTat ca code trong mot file HTML duy nhat, co giai thich ro rang.",
    },
    {
        id: 42,
        toolName: 'Grid Generator',
        content: "Hay tao mot ung dung tao layout CSS Grid bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Visual grid editor truc quan\n- Dieu chinh so cot, so hang, gap\n- Keo tha de merge cells\n- Hien thi CSS code real-time\n\nYeu cau chuc nang:\n- Dinh nghia grid-template-columns va rows (fr, px, auto, minmax)\n- Dat grid-area cho tung item\n- Dieu chinh gap (column-gap, row-gap)\n- 10+ layout preset: Holy Grail, Dashboard, Magazine...\n- Xuat CSS Grid code\n- Giai thich tung thuoc tinh\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 43,
        toolName: 'Aspect Ratio Calc',
        content: "Hay tao mot ung dung tinh ti le khung hinh bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Nhap chieu rong va chieu cao\n- Hien thi ti le duoi dang don gian nhat (16:9, 4:3...)\n- Preview hinh chu nhat theo ti le\n- Cac ti le pho bien de chon nhanh\n\nYeu cau chuc nang:\n- Tinh ti le tu kich thuoc bat ky\n- Tinh kich thuoc moi khi biet 1 chieu va ti le\n- Cac ti le chuan: 16:9, 4:3, 1:1, 21:9, 9:16, 3:2\n- Tinh kich thuoc responsive (% va px)\n- So sanh nhieu ti le cung luc\n- Ung dung thuc te: video, anh, man hinh\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 44,
        toolName: 'Pixel Converter',
        content: "Hay tao mot ung dung chuyen doi don vi CSS bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Nhap gia tri va chon don vi nguon\n- Hien thi ket qua tat ca don vi cung luc\n- Nhap base font-size (mac dinh 16px)\n- Thiet ke sach se, de doc\n\nYeu cau chuc nang:\n- Chuyen doi: px, rem, em, vw, vh, pt, pc, cm, mm, in\n- Tinh theo base font-size tuy chinh\n- Tinh theo viewport size tuy chinh\n- Hien thi ket qua real-time\n- Copy gia tri tung don vi\n- Giai thich khi nao dung don vi nao\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 45,
        toolName: 'Contrast Checker',
        content: "Hay tao mot ung dung kiem tra do tuong phan mau sac bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- 2 color picker: mau chu va mau nen\n- Preview text tren nen truc tiep\n- Hien thi ti le tuong phan lon, ro rang\n- Badge WCAG AA/AAA Pass/Fail\n\nYeu cau chuc nang:\n- Tinh contrast ratio theo WCAG 2.1\n- Kiem tra AA (4.5:1 normal, 3:1 large) va AAA (7:1 normal, 4.5:1 large)\n- Goi y mau sac de dat chuan\n- Preview voi nhieu co chu khac nhau\n- Kiem tra ca mau text tren nen va nguoc lai\n- Hien thi mau HEX, RGB, HSL\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 46,
        toolName: 'Typing Speed Test',
        content: "Hay tao mot ung dung kiem tra toc do go phim bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Hien thi doan van can go, highlight tung tu\n- Mau xanh cho tu dung, do cho tu sai\n- Hien thi WPM va accuracy real-time\n- Dem nguoc thoi gian (30s, 60s, 120s)\n\nYeu cau chuc nang:\n- Do WPM (words per minute) va CPM (characters per minute)\n- Tinh do chinh xac (%)\n- Nhieu doan van mau (tieng Anh va tieng Viet)\n- Cac che do: 30 giay, 1 phut, 2 phut\n- Hien thi ket qua chi tiet sau khi ket thuc\n- Luu ky luc cao nhat\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 47,
        toolName: 'Flashcard Maker',
        content: "Hay tao mot ung dung tao the ghi nho bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- The flashcard dep voi hieu ung lat (flip animation 3D)\n- Mat truoc: cau hoi/tu vung, mat sau: dap an/nghia\n- Nut Next/Previous de chuyen the\n- Progress bar hien thi tien do\n\nYeu cau chuc nang:\n- Tao, sua, xoa flashcard\n- Nhom the theo chu de\n- Che do hoc: hien thi ngau nhien hoac theo thu tu\n- Danh dau the da thuoc/chua thuoc\n- Thong ke: so the da hoc, ty le nho\n- Luu vao localStorage\n- Import/export danh sach the (CSV)\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 48,
        toolName: 'Quiz Generator',
        content: "Hay tao mot ung dung tao cau hoi trac nghiem bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Form tao cau hoi dep voi 4 lua chon\n- Hien thi quiz voi animation chuyen cau\n- Highlight dap an dung/sai sau khi chon\n- Ket qua cuoi voi diem so va nhan xet\n\nYeu cau chuc nang:\n- Tao cau hoi trac nghiem (4 lua chon, 1 dap an dung)\n- Them nhieu cau hoi, tao bo de\n- Xao tron thu tu cau hoi va dap an\n- Tinh diem va hien thi ket qua\n- Xem lai cac cau sai\n- Luu bo de vao localStorage\n- Export de thi ra JSON\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 49,
        toolName: 'Habit Tracker',
        content: "Hay tao mot ung dung theo doi thoi quen bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Danh sach thoi quen voi checkbox hang ngay\n- Streak counter (so ngay lien tuc) noi bat\n- Calendar view hien thi lich su 30 ngay\n- Mau sac khac nhau cho tung thoi quen\n\nYeu cau chuc nang:\n- Them, sua, xoa thoi quen\n- Danh dau hoan thanh moi ngay\n- Tinh streak (so ngay lien tuc hoan thanh)\n- Thong ke: ty le hoan thanh, streak dai nhat\n- Nhac nho (browser notification)\n- Luu du lieu vao localStorage\n- Xuat bao cao hang tuan\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 50,
        toolName: 'Focus Music',
        content: "Hay tao mot ung dung am thanh tap trung bang HTML, CSS va JavaScript thuan (Web Audio API).\n\nYeu cau giao dien:\n- Thiet ke toi gian, thu gian, mau xanh duong/tim\n- Cac nut chon loai am thanh voi icon dep\n- Volume slider va visualizer song am don gian\n- Ket hop voi Pomodoro timer nho\n\nYeu cau chuc nang:\n- Tao am thanh bang Web Audio API (khong can file ngoai):\n  + White noise (tap am trang)\n  + Brown noise (am trau)\n  + Rain sound (tieng mua)\n  + Cafe ambience (tieng quan ca phe)\n  + Binaural beats (nhip dieu chinh nao)\n- Dieu chinh am luong tung loai\n- Hen gio tu dong tat\n- Luu cai dat yeu thich\n\nTat ca code trong mot file HTML duy nhat, giai thich Web Audio API.",
    },
]

