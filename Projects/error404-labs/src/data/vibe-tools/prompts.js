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
]
