// Menu chính của site. `icon` là key trong bảng icon của Nav.astro.
// `match`: các đường dẫn con cũng đánh dấu mục này là đang xem.
// `highlight`: tô nổi bật mục này (dùng cho tính năng đang muốn giới thiệu).
const navData = [
    {
        name: 'Khóa học',
        path: '/khoa-hoc',
        icon: 'cap',
    },
    {
        name: 'Học Python',
        path: '/hoc-python',
        icon: 'python',
        highlight: true,
    },
    {
        name: 'Bài viết',
        path: '/bai-viet',
        icon: 'book',
        match: [
            '/danh-muc',
            '/tac-gia',
        ],
    },
    {
        name: 'Công cụ',
        path: '/tools',
        icon: 'wrench',
        match: [
            '/thu-nghiem',
            '/vibe-tools',
            '/cau-lenh-prompts-game',
            '/game-roadmap',
        ],
    },
    {
        name: 'HTML5 Editor',
        path: '/html5-editor',
        icon: 'code',
    },
    {
        name: 'Giới thiệu',
        path: '/gioi-thieu-v2',
        icon: 'user',
    },
]

export default navData
