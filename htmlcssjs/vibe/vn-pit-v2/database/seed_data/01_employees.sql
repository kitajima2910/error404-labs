-- ============================================
-- SEED DATA: 150 NHÂN VIÊN
-- ============================================
-- Xóa dữ liệu cũ (nếu có) - Chạy theo thứ tự để tránh lỗi khóa ngoại
TRUNCATE TABLE tax_records CASCADE;
TRUNCATE TABLE dependents CASCADE;
TRUNCATE TABLE employees CASCADE;

-- Phòng Kế toán (20 NV)
INSERT INTO employees (ma_nv, ho_ten, don_vi, ma_so_thue, so_cccd, da_nghi_viec) VALUES
('NV001', N'Nguyễn Thị Ánh', N'Phòng Kế toán', '1234567890', '001099000001', false),
('NV002', N'Trần Văn Bình', N'Phòng Kế toán', '1234567891', '001099000002', false),
('NV003', N'Lê Thị Cẩm', N'Phòng Kế toán', '1234567892', '001099000003', false),
('NV004', N'Phạm Văn Dũng', N'Phòng Kế toán', '1234567893', '001099000004', false),
('NV005', N'Hoàng Thị Em', N'Phòng Kế toán', '1234567894', '001099000005', false),
('NV006', N'Ngô Văn Phong', N'Phòng Kế toán', '1234567895', '001099000006', false),
('NV007', N'Đỗ Thị Giang', N'Phòng Kế toán', '1234567896', '001099000007', false),
('NV008', N'Vũ Văn Hải', N'Phòng Kế toán', '1234567897', '001099000008', false),
('NV009', N'Bùi Thị Hoa', N'Phòng Kế toán', '1234567898', '001099000009', false),
('NV010', N'Đặng Văn Khánh', N'Phòng Kế toán', '1234567899', '001099000010', false),
('NV011', N'Nguyễn Thị Lan', N'Phòng Kế toán', null, '001099000011', false),
('NV012', N'Trần Văn Minh', N'Phòng Kế toán', null, '001099000012', false),
('NV013', N'Lê Thị Ngọc', N'Phòng Kế toán', null, null, false),
('NV014', N'Phạm Văn Phúc', N'Phòng Kế toán', null, null, false),
('NV015', N'Hoàng Thị Quỳnh', N'Phòng Kế toán', '1234567900', '001099000015', false),
('NV016', N'Ngô Văn Sơn', N'Phòng Kế toán', '1234567901', '001099000016', false),
('NV017', N'Đỗ Thị Tuyết', N'Phòng Kế toán', '1234567902', '001099000017', false),
('NV018', N'Vũ Văn Uy', N'Phòng Kế toán', '1234567903', '001099000018', false),
('NV019', N'Bùi Thị Vân', N'Phòng Kế toán', null, '001099000019', true),
('NV020', N'Đặng Văn Xuân', N'Phòng Kế toán', null, '001099000020', true);

-- Phòng Nhân sự (18 NV)
INSERT INTO employees (ma_nv, ho_ten, don_vi, ma_so_thue, so_cccd, da_nghi_viec) VALUES
('NV021', N'Nguyễn Thị Yến', N'Phòng Nhân sự', '2345678901', '002099000001', false),
('NV022', N'Trần Văn Anh', N'Phòng Nhân sự', '2345678902', '002099000002', false),
('NV023', N'Lê Thị Bảo', N'Phòng Nhân sự', '2345678903', '002099000003', false),
('NV024', N'Phạm Văn Châu', N'Phòng Nhân sự', '2345678904', '002099000004', false),
('NV025', N'Hoàng Thị Dung', N'Phòng Nhân sự', '2345678905', '002099000005', false),
('NV026', N'Ngô Văn Đức', N'Phòng Nhân sự', '2345678906', '002099000006', false),
('NV027', N'Đỗ Thị Hà', N'Phòng Nhân sự', '2345678907', '002099000007', false),
('NV028', N'Vũ Văn Hiếu', N'Phòng Nhân sự', '2345678908', '002099000008', false),
('NV029', N'Bùi Thị Hương', N'Phòng Nhân sự', '2345678909', '002099000009', false),
('NV030', N'Đặng Văn Khang', N'Phòng Nhân sự', '2345678910', '002099000010', false),
('NV031', N'Nguyễn Thị Linh', N'Phòng Nhân sự', null, '002099000011', false),
('NV032', N'Trần Văn Long', N'Phòng Nhân sự', null, '002099000012', false),
('NV033', N'Lê Thị Mai', N'Phòng Nhân sự', null, null, false),
('NV034', N'Phạm Văn Nam', N'Phòng Nhân sự', null, null, false),
('NV035', N'Hoàng Thị Nga', N'Phòng Nhân sự', '2345678911', '002099000015', false),
('NV036', N'Ngô Văn Phát', N'Phòng Nhân sự', '2345678912', '002099000016', false),
('NV037', N'Đỗ Thị Quyên', N'Phòng Nhân sự', '2345678913', '002099000017', false),
('NV038', N'Vũ Văn Sang', N'Phòng Nhân sự', '2345678914', '002099000018', false);

-- Phòng IT (25 NV)
INSERT INTO employees (ma_nv, ho_ten, don_vi, ma_so_thue, so_cccd, da_nghi_viec) VALUES
('NV039', N'Nguyễn Văn Tài', N'Phòng IT', '3456789012', '003099000001', false),
('NV040', N'Trần Thị Thảo', N'Phòng IT', '3456789013', '003099000002', false),
('NV041', N'Lê Văn Thịnh', N'Phòng IT', '3456789014', '003099000003', false),
('NV042', N'Phạm Thị Thu', N'Phòng IT', '3456789015', '003099000004', false),
('NV043', N'Hoàng Văn Tiến', N'Phòng IT', '3456789016', '003099000005', false),
('NV044', N'Ngô Thị Trang', N'Phòng IT', '3456789017', '003099000006', false),
('NV045', N'Đỗ Văn Trung', N'Phòng IT', '3456789018', '003099000007', false),
('NV046', N'Vũ Thị Tú', N'Phòng IT', '3456789019', '003099000008', false),
('NV047', N'Bùi Văn Tùng', N'Phòng IT', '3456789020', '003099000009', false),
('NV048', N'Đặng Thị Vân', N'Phòng IT', '3456789021', '003099000010', false),
('NV049', N'Nguyễn Văn Việt', N'Phòng IT', null, '003099000011', false),
('NV050', N'Trần Thị Vy', N'Phòng IT', null, '003099000012', false),
('NV051', N'Lê Văn An', N'Phòng IT', null, null, false),
('NV052', N'Phạm Thị Ánh', N'Phòng IT', null, null, false),
('NV053', N'Hoàng Văn Bằng', N'Phòng IT', '3456789022', '003099000015', false),
('NV054', N'Ngô Thị Châu', N'Phòng IT', '3456789023', '003099000016', false),
('NV055', N'Đỗ Văn Chiến', N'Phòng IT', '3456789024', '003099000017', false),
('NV056', N'Vũ Thị Cúc', N'Phòng IT', '3456789025', '003099000018', false),
('NV057', N'Bùi Văn Cường', N'Phòng IT', '3456789026', '003099000019', false),
('NV058', N'Đặng Thị Duyên', N'Phòng IT', '3456789027', '003099000020', false),
('NV059', N'Nguyễn Văn Đạt', N'Phòng IT', null, '003099000021', false),
('NV060', N'Trần Thị Điệp', N'Phòng IT', null, '003099000022', false),
('NV061', N'Lê Văn Đông', N'Phòng IT', null, null, false),
('NV062', N'Phạm Thị Đào', N'Phòng IT', null, null, false),
('NV063', N'Hoàng Văn Dương', N'Phòng IT', '3456789028', '003099000025', true);

-- Phòng Kinh doanh (22 NV)
INSERT INTO employees (ma_nv, ho_ten, don_vi, ma_so_thue, so_cccd, da_nghi_viec) VALUES
('NV064', N'Ngô Thị Hạnh', N'Phòng Kinh doanh', '4567890123', '004099000001', false),
('NV065', N'Đỗ Văn Hiển', N'Phòng Kinh doanh', '4567890124', '004099000002', false),
('NV066', N'Vũ Thị Hiệp', N'Phòng Kinh doanh', '4567890125', '004099000003', false),
('NV067', N'Bùi Văn Hòa', N'Phòng Kinh doanh', '4567890126', '004099000004', false),
('NV068', N'Đặng Thị Huệ', N'Phòng Kinh doanh', '4567890127', '004099000005', false),
('NV069', N'Nguyễn Văn Hùng', N'Phòng Kinh doanh', '4567890128', '004099000006', false),
('NV070', N'Trần Thị Huyền', N'Phòng Kinh doanh', '4567890129', '004099000007', false),
('NV071', N'Lê Văn Khang', N'Phòng Kinh doanh', '4567890130', '004099000008', false),
('NV072', N'Phạm Thị Khánh', N'Phòng Kinh doanh', '4567890131', '004099000009', false),
('NV073', N'Hoàng Văn Khoa', N'Phòng Kinh doanh', '4567890132', '004099000010', false),
('NV074', N'Ngô Thị Lan', N'Phòng Kinh doanh', null, '004099000011', false),
('NV075', N'Đỗ Văn Linh', N'Phòng Kinh doanh', null, '004099000012', false),
('NV076', N'Vũ Thị Loan', N'Phòng Kinh doanh', null, null, false),
('NV077', N'Bùi Văn Lộc', N'Phòng Kinh doanh', null, null, false),
('NV078', N'Đặng Thị Ly', N'Phòng Kinh doanh', '4567890133', '004099000015', false),
('NV079', N'Nguyễn Văn Minh', N'Phòng Kinh doanh', '4567890134', '004099000016', false),
('NV080', N'Trần Thị My', N'Phòng Kinh doanh', '4567890135', '004099000017', false),
('NV081', N'Lê Văn Nam', N'Phòng Kinh doanh', '4567890136', '004099000018', false),
('NV082', N'Phạm Thị Nga', N'Phòng Kinh doanh', '4567890137', '004099000019', false),
('NV083', N'Hoàng Văn Ngọc', N'Phòng Kinh doanh', '4567890138', '004099000020', false),
('NV084', N'Ngô Thị Nguyệt', N'Phòng Kinh doanh', null, '004099000021', false),
('NV085', N'Đỗ Văn Nhân', N'Phòng Kinh doanh', null, '004099000022', true);

-- Phòng Kỹ thuật (20 NV)
INSERT INTO employees (ma_nv, ho_ten, don_vi, ma_so_thue, so_cccd, da_nghi_viec) VALUES
('NV086', N'Vũ Thị Oanh', N'Phòng Kỹ thuật', '5678901234', '005099000001', false),
('NV087', N'Bùi Văn Phong', N'Phòng Kỹ thuật', '5678901235', '005099000002', false),
('NV088', N'Đặng Thị Phúc', N'Phòng Kỹ thuật', '5678901236', '005099000003', false),
('NV089', N'Nguyễn Văn Phương', N'Phòng Kỹ thuật', '5678901237', '005099000004', false),
('NV090', N'Trần Thị Quyên', N'Phòng Kỹ thuật', '5678901238', '005099000005', false),
('NV091', N'Lê Văn Sang', N'Phòng Kỹ thuật', '5678901239', '005099000006', false),
('NV092', N'Phạm Thị Sen', N'Phòng Kỹ thuật', '5678901240', '005099000007', false),
('NV093', N'Hoàng Văn Sơn', N'Phòng Kỹ thuật', '5678901241', '005099000008', false),
('NV094', N'Ngô Thị Tâm', N'Phòng Kỹ thuật', '5678901242', '005099000009', false),
('NV095', N'Đỗ Văn Tân', N'Phòng Kỹ thuật', '5678901243', '005099000010', false),
('NV096', N'Vũ Thị Thanh', N'Phòng Kỹ thuật', null, '005099000011', false),
('NV097', N'Bùi Văn Thành', N'Phòng Kỹ thuật', null, '005099000012', false),
('NV098', N'Đặng Thị Thảo', N'Phòng Kỹ thuật', null, null, false),
('NV099', N'Nguyễn Văn Thiện', N'Phòng Kỹ thuật', null, null, false),
('NV100', N'Trần Thị Thu', N'Phòng Kỹ thuật', '5678901244', '005099000015', false),
('NV101', N'Lê Văn Thuận', N'Phòng Kỹ thuật', '5678901245', '005099000016', false),
('NV102', N'Phạm Thị Thủy', N'Phòng Kỹ thuật', '5678901246', '005099000017', false),
('NV103', N'Hoàng Văn Tiến', N'Phòng Kỹ thuật', '5678901247', '005099000018', false),
('NV104', N'Ngô Thị Tiên', N'Phòng Kỹ thuật', '5678901248', '005099000019', false),
('NV105', N'Đỗ Văn Tín', N'Phòng Kỹ thuật', '5678901249', '005099000020', false);

-- Phòng Hành chính (15 NV)
INSERT INTO employees (ma_nv, ho_ten, don_vi, ma_so_thue, so_cccd, da_nghi_viec) VALUES
('NV106', N'Vũ Thị Trà', N'Phòng Hành chính', '6789012345', '006099000001', false),
('NV107', N'Bùi Văn Trác', N'Phòng Hành chính', '6789012346', '006099000002', false),
('NV108', N'Đặng Thị Trang', N'Phòng Hành chính', '6789012347', '006099000003', false),
('NV109', N'Nguyễn Văn Trung', N'Phòng Hành chính', '6789012348', '006099000004', false),
('NV110', N'Trần Thị Tú', N'Phòng Hành chính', '6789012349', '006099000005', false),
('NV111', N'Lê Văn Tùng', N'Phòng Hành chính', '6789012350', '006099000006', false),
('NV112', N'Phạm Thị Tuyết', N'Phòng Hành chính', null, '006099000007', false),
('NV113', N'Hoàng Văn Tuyên', N'Phòng Hành chính', null, '006099000008', false),
('NV114', N'Ngô Thị Uyên', N'Phòng Hành chính', null, null, false),
('NV115', N'Đỗ Văn Văn', N'Phòng Hành chính', null, null, false),
('NV116', N'Vũ Thị Vi', N'Phòng Hành chính', '6789012351', '006099000011', false),
('NV117', N'Bùi Văn Việt', N'Phòng Hành chính', '6789012352', '006099000012', false),
('NV118', N'Đặng Thị Vinh', N'Phòng Hành chính', '6789012353', '006099000013', false),
('NV119', N'Nguyễn Văn Vũ', N'Phòng Hành chính', '6789012354', '006099000014', false),
('NV120', N'Trần Thị Vy', N'Phòng Hành chính', '6789012355', '006099000015', false);

-- Phòng Marketing (15 NV)
INSERT INTO employees (ma_nv, ho_ten, don_vi, ma_so_thue, so_cccd, da_nghi_viec) VALUES
('NV121', N'Lê Văn Xuân', N'Phòng Marketing', '7890123456', '007099000001', false),
('NV122', N'Phạm Thị Xuyến', N'Phòng Marketing', '7890123457', '007099000002', false),
('NV123', N'Hoàng Văn Ý', N'Phòng Marketing', '7890123458', '007099000003', false),
('NV124', N'Ngô Thị Yến', N'Phòng Marketing', '7890123459', '007099000004', false),
('NV125', N'Đỗ Văn An', N'Phòng Marketing', '7890123460', '007099000005', false),
('NV126', N'Vũ Thị Ánh', N'Phòng Marketing', null, '007099000006', false),
('NV127', N'Bùi Văn Ân', N'Phòng Marketing', null, '007099000007', false),
('NV128', N'Đặng Thị Bích', N'Phòng Marketing', null, null, false),
('NV129', N'Nguyễn Văn Cảnh', N'Phòng Marketing', null, null, false),
('NV130', N'Trần Thị Cơ', N'Phòng Marketing', '7890123461', '007099000010', false),
('NV131', N'Lê Văn Cương', N'Phòng Marketing', '7890123462', '007099000011', false),
('NV132', N'Phạm Thị Dạ', N'Phòng Marketing', '7890123463', '007099000012', false),
('NV133', N'Hoàng Văn Doanh', N'Phòng Marketing', '7890123464', '007099000013', false),
('NV134', N'Ngô Thị Du', N'Phòng Marketing', '7890123465', '007099000014', false),
('NV135', N'Đỗ Văn Dũng', N'Phòng Marketing', '7890123466', '007099000015', true);

-- Phòng Sản xuất (15 NV)
INSERT INTO employees (ma_nv, ho_ten, don_vi, ma_so_thue, so_cccd, da_nghi_viec) VALUES
('NV136', N'Vũ Thị Giang', N'Phòng Sản xuất', '8901234567', '008099000001', false),
('NV137', N'Bùi Văn Giáp', N'Phòng Sản xuất', '8901234568', '008099000002', false),
('NV138', N'Đặng Thị Hà', N'Phòng Sản xuất', '8901234569', '008099000003', false),
('NV139', N'Nguyễn Văn Hải', N'Phòng Sản xuất', '8901234570', '008099000004', false),
('NV140', N'Trần Thị Hảo', N'Phòng Sản xuất', '8901234571', '008099000005', false),
('NV141', N'Lê Văn Hiệp', N'Phòng Sản xuất', null, '008099000006', false),
('NV142', N'Phạm Thị Hiền', N'Phòng Sản xuất', null, '008099000007', false),
('NV143', N'Hoàng Văn Hùng', N'Phòng Sản xuất', null, null, false),
('NV144', N'Ngô Thị Huy', N'Phòng Sản xuất', null, null, false),
('NV145', N'Đỗ Văn Kha', N'Phòng Sản xuất', '8901234572', '008099000010', false),
('NV146', N'Vũ Thị Khiết', N'Phòng Sản xuất', '8901234573', '008099000011', false),
('NV147', N'Bùi Văn Khôi', N'Phòng Sản xuất', '8901234574', '008099000012', false),
('NV148', N'Đặng Thị Lai', N'Phòng Sản xuất', '8901234575', '008099000013', false),
('NV149', N'Nguyễn Văn Lâm', N'Phòng Sản xuất', '8901234576', '008099000014', false),
('NV150', N'Trần Thị Lan', N'Phòng Sản xuất', '8901234577', '008099000015', false);
