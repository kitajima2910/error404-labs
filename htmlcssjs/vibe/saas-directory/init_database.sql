-- Bảng danh sách các sản phẩm SaaS
CREATE TABLE app3.tools (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    url TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bảng quản lý Domain được phép kết nối (CORS) như yêu cầu trong SKILLS.md
CREATE TABLE app3.allowed_origins (
    id SERIAL PRIMARY KEY,
    domain TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true
);

-- Tối ưu hóa Database (Indexes) để tìm kiếm nhanh
CREATE INDEX idx_tools_name ON app3.tools USING gin (name gin_trgm_ops); 
CREATE INDEX idx_tools_description ON app3.tools USING gin (description gin_trgm_ops);
CREATE INDEX idx_tools_category ON app3.tools(category);

-- Dữ liệu mẫu (Seed Data)
INSERT INTO app3.tools (name, description, category, url, image_url) VALUES 
('Vercel', 'Nền tảng Cloud cho các Frontend Frameworks và Static Sites', 'Serverless', 'https://vercel.com', 'https://assets.vercel.com/image/upload/q_auto/front/favicon/vercel/180x180.png'),
('Neon', 'Database Postgres Serverless có tính năng branching', 'Database', 'https://neon.tech', 'https://neon.tech/favicon/favicon-32x32.png'),
('DaisyUI', 'Thư viện Component nổi tiếng dành cho Tailwind CSS', 'Frontend', 'https://daisyui.com', 'https://img.daisyui.com/images/daisyui-logo/daisyui-logomark.svg'),
('OpenAI', 'Công ty nghiên cứu & phát triển trí tuệ nhân tạo đứng sau ChatGPT.', 'AI', 'https://openai.com', 'https://openai.com/favicon.ico'),
('Stripe', 'Cổng thanh toán điện tử cho các doanh nghiệp xây dựng phần mềm SAAS.', 'Payment', 'https://stripe.com', 'https://images.ctfassets.net/fzn2n1nzq965/3S1FpLqTqA2qUuB4pI0o6e/c3d100d892d1134ed72ffba5ea14b621/favicon.svg'),
('Supabase', 'Công cụ mã nguồn mở thay thế Firebase mạnh mẽ với Postgres Database.', 'Database', 'https://supabase.com', 'https://supabase.com/favicon/favicon-32x32.png'),
('Midjourney', 'Tạo ra những hình ảnh tuyệt đẹp từ mô tả văn bản (Generative AI).', 'AI', 'https://midjourney.com', 'https://storage.googleapis.com/midjourney-landing/assets/favicon/apple-touch-icon.png');

INSERT INTO app3.allowed_origins (domain) VALUES 
('http://localhost:3000'),
('http://127.0.0.1:3000');
