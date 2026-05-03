/**
 * Dữ liệu prompt AI cho 100 Game HTML5
 * Mỗi prompt hướng dẫn AI tạo ra game tương ứng bằng HTML/CSS/JS thuần.
 */
export const GAME_PROMPTS = [
    {
        id: 1,
        name: "Bay Lên+",
        content: "Hãy tạo game \"Bay Lên+\": Một quả bóng bay lên, người chơi phải né các gai nhọn và thu thập các viên năng lượng. Khi thu thập đủ năng lượng, phím Space sẽ kích hoạt hiệu ứng slow-motion trong 3 giây.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 2,
        name: "Bắt Quả+",
        content: "Hãy tạo game \"Bắt Quả+\": Hứng trái cây rơi. Có hệ thống Combo Multiplier (bắt liên tiếp tăng điểm nhanh) và thi thoảng có trái cây hiếm (màu vàng) spawn ngẫu nhiên với điểm số cực cao.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 3,
        name: "Bập Hộp+",
        content: "Hãy tạo game \"Bập Hộp+\": Click để mở các hộp quà. Có hệ thống Loot Box Rarity: Hộp có màu sắc đại diện cho độ hiếm từ Common (xám) đến Legendary (vàng rực rực rỡ).\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 4,
        name: "Xếp Gạch+",
        content: "Hãy tạo game \"Xếp Gạch+\": Xếp các khối chồng lên nhau. Thêm cơ chế \"Perfect Placement Bonus\": Nếu đặt trùng khít hoàn toàn với khối dưới, điểm số sẽ nhân đôi và khối phát sáng.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 5,
        name: "Bắn Vịt+",
        content: "Hãy tạo game \"Bắn Vịt+\": Bắn vịt bay trên màn hình. Xuất hiện các con \"Vịt Fake\" (Decoy) - nếu bắn trúng chúng người chơi sẽ bị trừ điểm hoặc bị choáng.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 6,
        name: "Cân Bằng+",
        content: "Hãy tạo game \"Cân Bằng+\": Giữ thăng bằng cho một vật thể trên đỉnh một khối gỗ. Sẽ có gió ngẫu nhiên thổi từ hai phía và trọng lượng vật thể thay đổi liên tục.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 7,
        name: "Đua Ốc+",
        content: "Hãy tạo game \"Đua Ốc+\": Click liên tục để ốc sên bò. Có cơ chế \"Skill Boost Timing\": Một thanh chạy hiện ra, click đúng vùng xanh để nhận được cú hích tốc độ (mini skill check).\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 8,
        name: "Xoay Vòng+",
        content: "Hãy tạo game \"Xoay Vòng+\": Một mũi tên quay quanh vòng tròn, click khi nó chỉ vào mục tiêu. Nhịp quay tăng dần và thi thoảng đảo chiều bất ngờ để gây khó dễ.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 9,
        name: "Vẽ Đường+",
        content: "Hãy tạo game \"Vẽ Đường+\": Vẽ đường cho nhân vật đi về đích. Giới hạn lượng mực vẽ, buộc người chơi phải tính toán tối ưu đường đi ngắn nhất.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 10,
        name: "Nổ Bóng+",
        content: "Hãy tạo game \"Nổ Bóng+\": Click nổ bong bóng. Có hiệu ứng Chain Reaction (Phản ứng dây chuyền) - bong bóng nổ sẽ tạo sóng xung kích làm nổ các quả lân cận.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 11,
        name: "Chém Quái+",
        content: "Hãy tạo game \"Chém Quái+\": Quái vật xuất hiện nhanh, yêu cầu người chơi chém với Critical Timing (chém đúng lúc quái vừa hiện) để nhân đôi sát thương.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 12,
        name: "Bảo Vệ Tháp+",
        content: "Hãy tạo game \"Bảo Vệ Tháp+\": Chống lại làn sóng kẻ thù. Enemy chia làm nhiều loại có Armor (giáp dày) hoặc Speed (chạy cực nhanh) khác nhau.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 13,
        name: "Gõ Nhịp+",
        content: "Hãy tạo game \"Gõ Nhịp+\": Theo phong cách Rhythm game. Có cơ chế \"Beat Drop\" (nhịp nhanh bất ngờ) và \"Skill Zone\" chỉ xuất hiện trong thời gian ngắn.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 14,
        name: "Nạp Đạn+",
        content: "Hãy tạo game \"Nạp Đạn+\": Nhấp phím để nạp đạn nhanh. Có hệ thống Overheat: Nếu tap quá nhanh liên tục sẽ bị kẹt đạn (Fail).\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 15,
        name: "Tập Trung+",
        content: "Hãy tạo game \"Tập Trung+\": Theo dõi một vật thể giữa đám đông. Camera sẽ tự động Zoom In/Out liên tục để gây nhiễu thị giác người chơi.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 16,
        name: "Bắn Tỉa+",
        content: "Hãy tạo game \"Bắn Tỉa+\": Bắn hạ mục tiêu từ xa. Có yếu tố gió (Wind) làm lệch đạn và độ trễ do đạn bay (Bullet travel delay).\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 17,
        name: "Dập Lửa+",
        content: "Hãy tạo game \"Dập Lửa+\": Ngăn chặn đám cháy lan rộng. AI đám cháy (Fire Spread AI) sẽ lan theo hướng gió và các vật liệu dễ cháy xung quanh.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 18,
        name: "Bắt Bóng+",
        content: "Hãy tạo game \"Bắt Bóng+\": Hứng bóng. Có Fake Ball màu khác để đánh lừa, và tốc độ bóng rơi tăng theo hàm mũ (Exponential).\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 19,
        name: "Cắt Dây+",
        content: "Hãy tạo game \"Cắt Dây+\": Sử dụng vật lý thực tế (Rope Swing physics). Cắt dây đúng lúc để vật thể rơi trúng mục tiêu.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 20,
        name: "Bấm Hộp+",
        content: "Hãy tạo game \"Bấm Hộp+\": Chuỗi QTE (Quick Time Event) liên tục, người chơi phải bấm đúng phím hiện ra trên hộp trong chưa đầy 1 giây.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 21,
        name: "Đua Xe+",
        content: "Hãy tạo game \"Đua Xe+\": Tránh xe trên đường cao tốc. Thêm Traffic AI (xe địch biết chuyển làn) và cơ chế Drift giúp tích năng lượng boost.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 22,
        name: "Chạy Ống+",
        content: "Hãy tạo game \"Chạy Ống+\": Chạy trong đường hầm vô tận. Bản đồ được tạo ngẫu nhiên (Procedural generation) không bao giờ lặp lại.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 23,
        name: "Lướt Sóng+",
        content: "Hãy tạo game \"Lướt Sóng+\": Lướt trên mặt biển. Có hệ thống Wave Physics (sóng động) làm thay đổi cao độ và độ nảy của ván lướt.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 24,
        name: "Bay Trọng Lực+",
        content: "Hãy tạo game \"Bay Trọng Lực+\": Click để đảo ngược trọng lực. Có thời gian hồi chiêu (Cooldown) cho mỗi lần Flip để tránh spam.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 25,
        name: "Rắn Trốn+",
        content: "Hãy tạo game \"Rắn Trốn+\": Điều khiển rắn ăn mồi nhưng đồng thời bị các \"Enemy AI\" săn đuổi và bao vây.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 26,
        name: "ZigZag+",
        content: "Hãy tạo game \"ZigZag+\": Di chuyển theo đường chéo. Các viên gạch (Tiles) sẽ biến mất ngay phía sau nhân vật, buộc phải đi liên tục.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 27,
        name: "Tàu Vũ Trụ+",
        content: "Hãy tạo game \"Tàu Vũ Trụ+\": Bay trong không gian. Né tránh mưa thiên thạch theo phong cách \"Bullet Hell\" nhẹ.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 28,
        name: "Mê Cung+",
        content: "Hãy tạo game \"Mê Cung+\": Tìm lối thoát trong sương mù (Fog of War) che khuất tầm nhìn, chỉ có một khoảng sáng nhỏ quanh nhân vật.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 29,
        name: "Trượt Tuyết+",
        content: "Hãy tạo game \"Trượt Tuyết+\": Vừa trượt vừa thực hiện Trick System (nhảy và xoay trên không) để lấy điểm combo.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 30,
        name: "Chạy Nước Rút+",
        content: "Hãy tạo game \"Chạy Nước Rút+\": Chạy vượt rào với hệ thống Stamina (thể lực). Nếu chạy nhanh quá lâu sẽ bị kiệt sức và đi chậm lại.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 31,
        name: "Thu Hoạch+",
        content: "Hãy tạo game \"Thu Hoạch+\": Thu thập nông sản. Có hệ thống Upgrade Tool: Dùng tiền kiếm được để mua liềm/máy cắt giúp thu hoạch nhanh hơn.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 32,
        name: "Thợ Mỏ+",
        content: "Hãy tạo game \"Thợ Mỏ+\": Đào sâu xuống đất. Bản đồ chia theo Layer (tầng), tầng càng sâu thì khoáng sản càng hiếm và giá trị cao.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 33,
        name: "Kho Báu+",
        content: "Hãy tạo game \"Kho Báu+\": Lặn xuống biển tìm vàng. Có giới hạn lượng Oxygen (Oxy) - phải lên mặt nước nạp khí trước khi hết giờ.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 34,
        name: "Dọn Rác+",
        content: "Hãy tạo game \"Dọn Rác+\": Thu lượm rác thải trong thành phố. Làm sạch liên tục sẽ kích hoạt Combo nhân điểm và hiệu ứng ánh sáng rực rỡ.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 35,
        name: "Bắt Bướm+",
        content: "Hãy tạo game \"Bắt Bướm+\": Dùng vợt bắt bướm. Mỗi loại bướm có AI bay khác nhau (zic-zac, vòng tròn, bay nhanh) thử thách tay nghề.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 36,
        name: "Nhặt Sao+",
        content: "Hãy tạo game \"Nhặt Sao+\": Di chuyển trong môi trường đô thị with phong cách Parkour nhẹ để lấy các ngôi sao trên cao.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 37,
        name: "Câu Cá+",
        content: "Hãy tạo game \"Câu Cá+\": Thả câu với thanh Timing Bar. Cần giữ cá trong vùng xanh để kéo lên, thi thoảng spawn cá hiếm.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 38,
        name: "Sưu Tầm+",
        content: "Hãy tạo game: Thu thập các mảnh thẻ bài. Có hệ thống Gacha (mở gói ngẫu nhiên) để hoàn thiện bộ sưu tập các sinh vật huyền thoại.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 39,
        name: "Robot+",
        content: "Hãy tạo game \"Robot+\": Điều khiển robot nhặt linh kiện. Có hệ thống Inventory và Crafting cơ bản: Kết hợp linh kiện để chế tạo công cụ mới.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 40,
        name: "Hút Bụi+",
        content: "Hãy tạo game \"Hút Bụi+\": Dọn dẹp các căn phòng với bản đồ ngẫu nhiên (Random Map layout) mỗi lần chơi mới.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 41,
        name: "Tank+",
        content: "Hãy tạo game \"Tank+\": Bắn xe tăng địch. Đạn có khả năng Ricochet (nảy bật tường) giúp người chơi bắn trúng kẻ địch sau vật cản.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 42,
        name: "Shooter ngang+",
        content: "Hãy tạo game bắn máy bay ngang: Có kỹ năng Dash Evade (lướt nhanh) để né tránh các luồng đạn dày đặc của địch.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 43,
        name: "Tower Defense+",
        content: "Hãy tạo game \"Tower Defense+\": Đặt tháp thủ cửa, thêm hệ thống Skill Active (người chơi chủ động nhấn phím để tung chiêu mạnh).\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 44,
        name: "Phi Công+",
        content: "Hãy tạo game \"Phi Công+\": Đối đầu với Boss máy bay khổng lồ có nhiều giai đoạn tấn công (Boss Pattern) phức tạp.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 45,
        name: "Cung Tên+",
        content: "Hãy tạo game \"Cung Tên+\": Kéo để lấy đạn. Có cơ chế Charge Shot: Giữ càng lâu mũi tên bay càng mạnh và xuyên thấu.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 46,
        name: "Zombie+",
        content: "Hãy tạo game \"Zombie+\": Chống lại Wave Zombie liên tục. Sau mỗi 10 đợt sẽ có một con Boss khổng lồ xuất hiện.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 47,
        name: "Bubble+",
        content: "Hãy tạo game \"Bubble Shooter+\": Bắn bóng cùng màu. Khi tạo ra Combo lớn sẽ có hiệu ứng nổ lan rộng (Explosion).\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 48,
        name: "Defense+",
        content: "Hãy tạo game \"Defense+\": Bảo vệ căn cứ. Có hệ thống Upgrade Turret (nâng cấp trụ) theo nhiều hướng: Tốc độ, sát thương hoặc băng giá.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 49,
        name: "Pháo Hoa+",
        content: "Hãy tạo game \"Pháo Hoa+\": Bắn các điểm trên bầu trời để tạo ra các mô hình pháo hoa theo đố vui (Pattern Puzzle).\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 50,
        name: "Tàu Ngầm+",
        content: "Hãy tạo game \"Tàu Ngầm+\": Dùng cơ chế Sonar (radar âm thanh) để phát hiện và bắn ngư lôi vào tàu địch trong bóng tối.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 51,
        name: "Nhảy Mây+",
        content: "Hãy tạo game \"Nhảy Mây+\": Nhảy qua các đám mây di động. Các nền tảng mây di chuyển theo nhịp điệu (Sync) đồng bộ.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 52,
        name: "Hang Động+",
        content: "Hãy tạo game: Leo trong hang động. Phải canh thời gian né các bẫy gai (Trap Timing) nhô ra từ sàn và trần.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 53,
        name: "Nhảy Dây+",
        content: "Hãy tạo game \"Nhảy Dây+\": Theo phong cách nhảy nhịp điệu (Rhythm jump). Nhịp dây quay đổi tốc độ liên tục theo nhạc.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 54,
        name: "Spider+",
        content: "Hãy tạo game \"Spider+\": Đu dây trong thành phố. Sử dụng vật lý xoay (Swing physics) chân thực để di chuyển.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 55,
        name: "Tháp+",
        content: "Hãy tạo game \"Tháp+\": Leo tháp vô tận (Endless climb) with các bậc thang biến mất dần từ bên dưới.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 56,
        name: "Ninja+",
        content: "Hãy tạo game \"Ninja+\": Vượt địa hình. Có cơ chế Wall Jump Combo: Nhảy liên tục giữa 2 bức tường để leo lên nhanh chóng.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 57,
        name: "Vực+",
        content: "Hãy tạo game platform: Nhảy qua vực sâu. Nhân vật có Momentum Jump: Chạy lấy đà càng nhanh nhảy càng xa.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 58,
        name: "Lò Xo+",
        content: "Hãy tạo game \"Lò Xo+\": Sử dụng các lò xo để bật cao. Có cơ chế Chain Bounce: Bật liên tiếp không chạm đất sẽ nhận điểm thưởng lớn.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 59,
        name: "Obstacle+",
        content: "Hãy tạo game platformer với bản đồ Speedrun: Người chơi phải hoàn thành các thử thách vượt chướng ngại vật trong thời gian ngắn nhất.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 60,
        name: "Rescue+",
        content: "Hãy tạo game \"Rescue+\": Một sự kết hợp giữa giải đố và platform. Di chuyển các khối vật thể để tạo đường cứu nhân vật khác.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 61,
        name: "Ống Nước+",
        content: "Hãy tạo game: Sắp xếp các đoạn ống nước để kết nối nguồn với đầu ra trong giới hạn thời gian (Time limit).\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 62,
        name: "Sokoban+",
        content: "Hãy tạo game đẩy thùng: Có nút Undo (hoàn tác) và số bước di chuyển bị giới hạn (Limited moves) cho mỗi màn.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 63,
        name: "Match Pair+",
        content: "Hãy tạo game lật thẻ bài giống nhau (Memory). Có hệ thống đếm ngược (Timer) tăng thêm sự kịch tính.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 64,
        name: "Tangram+",
        content: "Hãy tạo game xếp hình gỗ. Có thể tắt \"Shadow Guide\" (hình bóng gợi ý) để tăng độ khó lên mức tối đa.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 65,
        name: "Mê Cung+",
        content: "Hãy tạo game mê cung: Các bức tường sẽ thay đổi vị trí thường xuyên (Moving walls) buộc người chơi phải quan sát kỹ.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 66,
        name: "Nối Điểm+",
        content: "Hãy tạo game: Nối các điểm cùng màu mà không được để các đường nối cắt nhau (Flow style).\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 67,
        name: "Spot Diff+",
        content: "Hãy tạo game tìm điểm khác biệt giữa 2 bức ảnh. Thêm các hiệu ứng Animation gây nhiễu để làm người chơi phân tâm.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 68,
        name: "2048+",
        content: "Hãy tạo game 2048: Thêm các ô đặc biệt \"Power Tile\" có chức năng xóa một hàng khi được gộp vào.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 69,
        name: "Cắt Hình+",
        content: "Hãy tạo game giải đố vật lý: Cắt các khối vật thể sao cho phần bị cắt rơi xuống đúng vị trí yêu cầu.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 70,
        name: "Cầu Treo+",
        content: "Hãy tạo game: Xây dựng cầu bằng các thanh nối. Có hệ thống tính toán trọng lực (Weight balance) để cầu không bị sập.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 71,
        name: "Hide & Seek+",
        content: "Hãy tạo game trốn tìm: AI sẽ học theo thói quen của người chơi (Learning pattern) để tìm ra nơi ẩn nấp nhanh hơn.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 72,
        name: "Race Bot+",
        content: "Hãy tạo game đua xe: AI đối thủ có Adaptive Difficulty (độ khó tự điều chỉnh), sẽ chạy nhanh hơn nếu người chơi đang dẫn xa.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 73,
        name: "Cờ+",
        content: "Hãy tạo game Cờ vây/Cờ caro: AI sử dụng thuật toán Heuristic nhẹ để tính toán nước đi thông minh nhất.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 74,
        name: "Territory+",
        content: "Hãy tạo game chiếm lãnh thổ: Các AI đối thủ sẽ tự động mở rộng (Expand) và tấn công vùng đất của nhau.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 75,
        name: "Pet+",
        content: "Hãy tạo game nuôi thú ảo: Chú thú AI có hệ thống cảm xúc (Emotion system) - vui buồn đói dựa trên cách bạn tương tác.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 76,
        name: "Enemy+",
        content: "Hãy tạo game: Kẻ địch AI sử dụng thuật toán dẫn đường (Pathfinding) thông minh để không bao giờ bị kẹt trong ngõ cụt.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 77,
        name: "Escort+",
        content: "Hãy tạo game bảo vệ NPC: AI của NPC sẽ tự động đi theo và tìm vị trí an toàn (Follow logic) khi có giao tranh.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 78,
        name: "Fishing AI+",
        content: "Hãy tạo game câu cá: Cá AI có hành vi (Behavior) chân thực, biết nhấp nhử mồi trước khi cắn câu.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 79,
        name: "Chat Bot+",
        content: "Hãy tạo hệ thống đối thoại game: Sử dụng Dialogue Tree để tạo ra các cuộc trò chuyện rẽ nhánh với NPC AI.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 80,
        name: "Catch+",
        content: "Hãy tạo game: AI có khả năng dự đoán hướng di chuyển của người chơi (Predict player) để chặn đầu bắt gọn.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 81,
        name: "Tower Defense+",
        content: "Hãy tạo game thủ thành chuyên nghiệp: Bao gồm hệ thống Skill Tree phân nhánh sâu để nâng cấp trụ phòng thủ.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 82,
        name: "RPG+",
        content: "Hãy tạo hệ thống nhập vai cơ bản: Bao gồm túi đồ (Inventory) và các chỉ số nhân vật (Stat system) thay đổi khi lên cấp.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 83,
        name: "Farm+",
        content: "Hãy tạo game nông trại: Có hệ thống chu kỳ thời gian (Time Cycle) ngày và đêm ảnh hưởng đến sự phát triển của cây trồng.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 84,
        name: "Racing+",
        content: "Hãy tạo game đua xe chuyên sâu: Cho phép người chơi thay đổi các bộ phận (Upgrade part) như động cơ, lốp để tối ưu tốc độ.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 85,
        name: "City Builder+",
        content: "Hãy tạo game xây dựng thành phố: Phải quản lý vòng lặp tài nguyên (Resource loop) về điện, nước và ngân sách thành phố.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 86,
        name: "Survival+",
        content: "Hãy tạo game sinh tồn: Có các thanh chỉ số \"Hunger\" (đói) và hệ thống \"Crafting\" chế tạo từ các tài nguyên nhặt được.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 87,
        name: "Turn-based+",
        content: "Hãy tạo game chiến thuật theo lượt: Cho phép người chơi kết hợp các chiêu thức khác nhau (Skill combo) để tạo sát thương lớn.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 88,
        name: "Business+",
        content: "Hãy tạo game kinh doanh nhà hàng: Có hệ thống cung-cầu (Supply-demand) - giá nguyên liệu sẽ thay đổi theo thị trường.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 89,
        name: "Story Puzzle+",
        content: "Hãy tạo game giải đố cốt truyện: Mỗi hành động và lựa chọn của bạn (Choice system) sẽ dẫn đến một kết thúc khác nhau.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 90,
        name: "Card Game+",
        content: "Hãy tạo khung sườn game thẻ bài chiến thuật: Có hệ thống xây dựng bộ bài (Deck build) và các quy tắc đấu thẻ phức tạp.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 91,
        name: "Metroidvania+",
        content: "Hãy tạo bản mẫu game Metroidvania: Bản đồ rộng lớn, đòi hỏi người chơi phải mở khóa kỹ năng mới (Ability unlock) mới có thể đi tiếp.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 92,
        name: "Action RPG+",
        content: "Hãy tạo game hành động: Bao gồm hệ thống Combo đánh đấm phức tạp kết hợp cùng Skill Tree phân nhánh đa dạng.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 93,
        name: "Kingdom+",
        content: "Hãy tạo game quản lý vương quốc: Kết hợp giữa quản lý vĩ mô (Macro - xây dựng) và điều khiển vi mô (Micro - dàn trận chiến đấu).\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 94,
        name: "Kart+",
        content: "Hãy tạo game đua xe bắn súng: Có hệ thống đồng bộ người chơi (Multiplayer Sync) để nhiều xe cùng thi đấu trên đường đua.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 95,
        name: "RTS+",
        content: "Hãy tạo game chiến thuật thời gian thực: Điều khiển các nhóm lính (Unit AI) đi khai thác và tấn công căn cứ kẻ thù.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 96,
        name: "Life Sim+",
        content: "Hãy tạo game mô phỏng cuộc sống: Có hệ thống thời gian biểu (Schedule system) - các NPC sẽ làm việc khác nhau tùy theo đồng hồ.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 97,
        name: "Roguelike+",
        content: "Hãy tạo game Roguelike: Sử dụng cơ chế Random Build - mỗi lần bắt đầu chơi sẽ có một bộ kỹ năng và bản đồ hoàn toàn mới.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 98,
        name: "Fighting+",
        content: "Hãy tạo game đối kháng chuyên sâu: Hệ thống Frame Data nhẹ (quy định độ trễ của chiêu thức) để tạo sự cân bằng khi chiến đấu.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 99,
        name: "FPS+",
        content: "Hãy tạo khung sườn game bắn súng góc nhìn thứ nhất: Có hệ thống Aiming (ngắm), Recoil (độ giật súng) và nạp đạn chân thực.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    },
    {
        id: 100,
        name: "Sandbox+",
        content: "Hãy tạo game thế giới mở: Một hệ thống thế giới (World system) tự vận hành với các quy luật vật lý và AI tương tác tự do.\n\nYêu cầu giao diện:\n- Thiết kế hiện đại, màu sắc tươi sáng, bo góc mềm mại\n- Responsive, hoạt động tốt trên cả desktop và mobile\n- Hiệu ứng hover, animation mượt mà cho các phần tử tương tác\n- HUD rõ ràng: điểm số, mạng sống, cấp độ hiển thị nổi bật\n\nYêu cầu chức năng:\n- Điều khiển bằng bàn phím (WASD / mũi tên) và chuột / cảm ứng\n- Hệ thống điểm số với high score lưu vào localStorage\n- Màn hình Game Over và Restart không cần reload trang\n- Tốc độ và độ khó tăng dần theo thời gian\n\nYêu cầu logic game:\n- Xử lý va chạm (collision detection) chính xác\n- Vòng lặp game (game loop) ổn định bằng requestAnimationFrame\n- Quản lý trạng thái: menu, playing, paused, game over\n\nTất cả code trong một file HTML duy nhất, có comment giải thích rõ ràng.",
    }
]
