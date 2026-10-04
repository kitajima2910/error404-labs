// Dữ liệu trang /tools.
// TOOLS_DATA: công cụ có thể "xem nhanh" ngay trong khung trình duyệt (iframe) của trang /tools.
// Giữ nguyên các trường cũ (name, description, link, image, icon); các trường còn lại chỉ bổ sung cho giao diện hub.
export const TOOLS_DATA = [
    {
        name: 'SliceSprite',
        description: 'Công cụ cắt sprite sheet chuyên nghiệp cho người làm game.',
        link: '/tools/slicesprite-error404labs-kitajima2910/distclone/index.html',
        image: '/tools/slicesprite-error404labs-kitajima2910/distclone/slicesprite-error404labs-kitajima2910.avif',
        icon: 'fa-scissors',
        // ── Trường bổ sung cho hub ──
        tagline: 'Cắt sprite sheet cho game 2D',
        topic: 'Game 2D',
        summary:
            'Cắt sprite sheet thành từng frame theo Lưới, Kích cỡ hoặc Tự động, xem trước ảnh động rồi tải về file ZIP (PNG/WebP) hoặc GIF.',
        steps: [
            'Kéo & thả ảnh sprite sheet vào ô “Tải ảnh lên”.',
            'Chọn cách cắt: Lưới, Kích cỡ hoặc Tự động.',
            'Xem trước, chỉnh sửa frame rồi tải về ZIP hoặc GIF.',
        ],
    },
]

// HUB_TOOLS: các công cụ khác của Error404 Labs, mở bằng đường dẫn riêng (không xem nhanh trong iframe).
// access: 'public' = ai cũng dùng được; 'member' = cần đăng nhập tài khoản thành viên.
// icon: key trong bảng icon của trang /tools. accent: lớp gradient Tailwind cho ô icon.
// {count} trong tagline/description được trang /tools thay bằng số lượng thật (tính từ dữ liệu prompt).
export const HUB_TOOLS = [
    {
        key: 'html5-editor',
        name: 'HTML5 Editor',
        link: '/html5-editor',
        access: 'public',
        topic: 'Web',
        icon: 'code',
        accent: 'from-blue-500 to-indigo-600',
        tagline: 'Viết code web, xem kết quả ngay',
        description:
            'Trình soạn thảo HTML/CSS/JS trực tuyến với xem trước trực tiếp: viết code trong 3 file index.html, style.css, script.js rồi bấm ▶ Chạy để xem kết quả.',
    },
    {
        key: 'vibe-tools',
        name: 'Vibe Tools',
        link: '/vibe-tools',
        access: 'member',
        topic: 'Prompt AI',
        icon: 'sparkles',
        accent: 'from-violet-500 to-fuchsia-500',
        tagline: '{count} công cụ mini cùng prompt AI',
        description:
            '{count} công cụ mini giúp học tập, làm việc và sáng tạo mỗi ngày — mỗi công cụ kèm prompt AI để tự tạo phiên bản của riêng mình.',
    },
    {
        key: 'prompts-game',
        name: 'Prompts Game H5',
        link: '/cau-lenh-prompts-game',
        access: 'member',
        topic: 'Game HTML5',
        icon: 'gamepad',
        accent: 'from-amber-400 to-orange-500',
        tagline: '{count} prompt AI tạo game HTML5',
        description:
            '{count} prompt AI chi tiết để tạo game HTML5 từ dễ đến khó. Sao chép và dán vào ChatGPT, Claude để tạo game ngay.',
    },
    {
        key: 'game-roadmap',
        name: 'Tư duy Sáng tạo H5',
        link: '/game-roadmap',
        access: 'member',
        topic: 'Lộ trình',
        icon: 'map',
        accent: 'from-emerald-500 to-teal-600',
        tagline: 'Học làm game với AI theo lộ trình',
        description: 'Tư duy sáng tạo học làm game với AI: mỗi cấp độ 4 tuần, mỗi tuần có prompt mẫu để thực hành.',
    },
]
