// Thông tin hiển thị cho từng danh mục bài viết (tên thân thiện, mô tả, màu, biểu tượng).
// Key = giá trị `category` trong frontmatter. URL danh mục vẫn dùng slugify(key) như cũ.

const categoryMeta = {
    KH_WEB_CB_2026_01: {
        label: 'Web cơ bản',
        description: 'Tự tay xây giao diện website bằng HTML & CSS qua từng bài thực hành.',
        icon: '🎨',
        chip: 'bg-pink-50 text-pink-700 border-pink-200',
        gradient: 'from-pink-500 to-rose-500',
    },
    KH_DSA_C_2026_01: {
        label: 'CTDL & Giải thuật',
        description: 'Mảng, dãy số, ngăn xếp — cấu trúc dữ liệu và giải thuật với ngôn ngữ C.',
        icon: '🧱',
        chip: 'bg-violet-50 text-violet-700 border-violet-200',
        gradient: 'from-violet-500 to-indigo-500',
    },
    KH_OOP_C_SHARP_2026_01: {
        label: 'OOP với C#',
        description: 'Lập trình hướng đối tượng với C#: lớp, đối tượng, đóng gói, kế thừa.',
        icon: '🧩',
        chip: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        gradient: 'from-emerald-500 to-teal-500',
    },
    KH_TT_CB_2026_01: {
        label: 'Thuật toán cơ bản',
        description: 'Số nguyên tố, ước số và cách rèn tư duy thuật toán từ những bài toán quen thuộc.',
        icon: '🧮',
        chip: 'bg-amber-50 text-amber-700 border-amber-200',
        gradient: 'from-amber-500 to-orange-500',
    },
    Java: {
        label: 'Java',
        description: 'Nhập xuất, mảng, chuỗi và các bài toán số học kinh điển với Java.',
        icon: '☕',
        chip: 'bg-orange-50 text-orange-700 border-orange-200',
        gradient: 'from-orange-500 to-red-500',
    },
    C: {
        label: 'Lập trình C',
        description: 'Nền tảng lập trình với C: chuỗi, struct, dãy số và bài tập thực hành.',
        icon: '🔧',
        chip: 'bg-sky-50 text-sky-700 border-sky-200',
        gradient: 'from-sky-500 to-blue-600',
    },
    HTML: {
        label: 'HTML',
        description: 'Cấu trúc trang web và các thẻ HTML phổ biến cho người mới bắt đầu.',
        icon: '🌐',
        chip: 'bg-cyan-50 text-cyan-700 border-cyan-200',
        gradient: 'from-cyan-500 to-sky-500',
    },
}

const fallback = {
    description: 'Bài viết lập trình dễ hiểu, có ví dụ minh họa.',
    icon: '📘',
    chip: 'bg-blue-50 text-blue-700 border-blue-200',
    gradient: 'from-blue-500 to-indigo-600',
}

/** Lấy thông tin hiển thị của một danh mục (luôn trả về object hợp lệ). */
export const getCategoryMeta = (name) => {
    const meta = categoryMeta[name]
    return meta ? { key: name, ...meta } : { key: name, label: name, ...fallback }
}

export default categoryMeta
