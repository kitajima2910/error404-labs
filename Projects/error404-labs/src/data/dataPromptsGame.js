export const categories = [
    {
        title: '1. BASIC GAMES (EASIEST → ADD HOOK)',
        icon: '🎮',
        color: 'bg-[#335A92]',
        items: [
            {
                id: 1,
                text: 'Bay Lên+: Né gai + thu năng lượng → bật slow-motion',
                prompt_extends:
                    'Hãy tạo game "Bay Lên+": Một quả bóng bay lên, người chơi phải né các gai nhọn và thu thập các viên năng lượng. Khi thu thập đủ năng lượng, phím Space sẽ kích hoạt hiệu ứng slow-motion trong 3 giây.',
            },
            {
                id: 2,
                text: 'Bắt Quả+: Combo multiplier + trái hiếm spawn ngẫu nhiên',
                prompt_extends:
                    'Hãy tạo game "Bắt Quả+": Hứng trái cây rơi. Có hệ thống Combo Multiplier (bắt liên tiếp tăng điểm nhanh) và thi thoảng có trái cây hiếm (màu vàng) spawn ngẫu nhiên với điểm số cực cao.',
            },
            {
                id: 3,
                text: 'Bập Hộp+: Loot box có rarity (common → legendary)',
                prompt_extends:
                    'Hãy tạo game "Bập Hộp+": Click để mở các hộp quà. Có hệ thống Loot Box Rarity: Hộp có màu sắc đại diện cho độ hiếm từ Common (xám) đến Legendary (vàng rực rực rỡ).',
            },
            {
                id: 4,
                text: 'Xếp Gạch+: Thêm “perfect placement bonus”',
                prompt_extends:
                    'Hãy tạo game "Xếp Gạch+": Xếp các khối chồng lên nhau. Thêm cơ chế "Perfect Placement Bonus": Nếu đặt trùng khít hoàn toàn với khối dưới, điểm số sẽ nhân đôi và khối phát sáng.',
            },
            {
                id: 5,
                text: 'Bắn Vịt+: Vịt fake (decoy) đánh lừa người chơi',
                prompt_extends:
                    'Hãy tạo game "Bắn Vịt+": Bắn vịt bay trên màn hình. Xuất hiện các con "Vịt Fake" (Decoy) - nếu bắn trúng chúng người chơi sẽ bị trừ điểm hoặc bị choáng.',
            },
            {
                id: 6,
                text: 'Cân Bằng+: Gió ngẫu nhiên + vật thay đổi trọng lượng',
                prompt_extends:
                    'Hãy tạo game "Cân Bằng+": Giữ thăng bằng cho một vật thể trên đỉnh một khối gỗ. Sẽ có gió ngẫu nhiên thổi từ hai phía và trọng lượng vật thể thay đổi liên tục.',
            },
            {
                id: 7,
                text: 'Đua Ốc+: Skill boost timing (mini skill check)',
                prompt_extends:
                    'Hãy tạo game "Đua Ốc+": Click liên tục để ốc sên bò. Có cơ chế "Skill Boost Timing": Một thanh chạy hiện ra, click đúng vùng xanh để nhận được cú hích tốc độ (mini skill check).',
            },
            {
                id: 8,
                text: 'Xoay Vòng+: Nhịp tăng dần + đảo chiều bất ngờ',
                prompt_extends:
                    'Hãy tạo game "Xoay Vòng+": Một mũi tên quay quanh vòng tròn, click khi nó chỉ vào mục tiêu. Nhịp quay tăng dần và thi thoảng đảo chiều bất ngờ để gây khó dễ.',
            },
            {
                id: 9,
                text: 'Vẽ Đường+: Giới hạn mực vẽ → tối ưu đường đi',
                prompt_extends:
                    'Hãy tạo game "Vẽ Đường+": Vẽ đường cho nhân vật đi về đích. Giới hạn lượng mực vẽ, buộc người chơi phải tính toán tối ưu đường đi ngắn nhất.',
            },
            {
                id: 10,
                text: 'Nổ Bóng+: Chain reaction + hiệu ứng lan',
                prompt_extends:
                    'Hãy tạo game "Nổ Bóng+": Click nổ bong bóng. Có hiệu ứng Chain Reaction (Phản ứng dây chuyền) - bong bóng nổ sẽ tạo sóng xung kích làm nổ các quả lân cận.',
            },
        ],
    },
    {
        title: '2. REFLEX GAMES (FAST + SKILL)',
        icon: '⚡',
        color: 'bg-[#29909B]',
        items: [
            {
                id: 11,
                text: 'Chém Quái+: Combo + critical timing',
                prompt_extends:
                    'Hãy tạo game "Chém Quái+": Quái vật xuất hiện nhanh, yêu cầu người chơi chém với Critical Timing (chém đúng lúc quái vừa hiện) để nhân đôi sát thương.',
            },
            {
                id: 12,
                text: 'Bảo Vệ Tháp+: Enemy có armor / speed khác nhau',
                prompt_extends:
                    'Hãy tạo game "Bảo Vệ Tháp+": Chống lại làn sóng kẻ thù. Enemy chia làm nhiều loại có Armor (giáp dày) hoặc Speed (chạy cực nhanh) khác nhau.',
            },
            {
                id: 13,
                text: 'Gõ Nhịp+: Beat drop + skill zone (perfect hit)',
                prompt_extends:
                    'Hãy tạo game "Gõ Nhịp+": Theo phong cách Rhythm game. Có cơ chế "Beat Drop" (nhịp nhanh bất ngờ) và "Skill Zone" chỉ xuất hiện trong thời gian ngắn.',
            },
            {
                id: 14,
                text: 'Nạp Đạn+: Overheat system (tap quá nhanh = fail)',
                prompt_extends:
                    'Hãy tạo game "Nạp Đạn+": Nhấp phím để nạp đạn nhanh. Có hệ thống Overheat: Nếu tap quá nhanh liên tục sẽ bị kẹt đạn (Fail).',
            },
            {
                id: 15,
                text: 'Tập Trung+: Camera zoom in/out gây nhiễu',
                prompt_extends:
                    'Hãy tạo game "Tập Trung+": Theo dõi một vật thể giữa đám đông. Camera sẽ tự động Zoom In/Out liên tục để gây nhiễu thị giác người chơi.',
            },
            {
                id: 16,
                text: 'Bắn Tỉa+: Wind + bullet travel delay',
                prompt_extends:
                    'Hãy tạo game "Bắn Tỉa+": Bắn hạ mục tiêu từ xa. Có yếu tố gió (Wind) làm lệch đạn và độ trễ do đạn bay (Bullet travel delay).',
            },
            {
                id: 17,
                text: 'Dập Lửa+: Fire spread AI',
                prompt_extends:
                    'Hãy tạo game "Dập Lửa+": Ngăn chặn đám cháy lan rộng. AI đám cháy (Fire Spread AI) sẽ lan theo hướng gió và các vật liệu dễ cháy xung quanh.',
            },
            {
                id: 18,
                text: 'Bắt Bóng+: Fake ball + tốc độ tăng exponential',
                prompt_extends:
                    'Hãy tạo game "Bắt Bóng+": Hứng bóng. Có Fake Ball màu khác để đánh lừa, và tốc độ bóng rơi tăng theo hàm mũ (Exponential).',
            },
            {
                id: 19,
                text: 'Cắt Dây+: Physics thật (rope swing)',
                prompt_extends:
                    'Hãy tạo game "Cắt Dây+": Sử dụng vật lý thực tế (Rope Swing physics). Cắt dây đúng lúc để vật thể rơi trúng mục tiêu.',
            },
            {
                id: 20,
                text: 'Bấm Hộp+: QTE liên tục',
                prompt_extends:
                    'Hãy tạo game "Bấm Hộp+": Chuỗi QTE (Quick Time Event) liên tục, người chơi phải bấm đúng phím hiện ra trên hộp trong chưa đầy 1 giây.',
            },
        ],
    },
    {
        title: '3. OBSTACLE (ENDLESS + CHAOS)',
        icon: '🚧',
        color: 'bg-[#008D6B]',
        items: [
            {
                id: 21,
                text: 'Đua Xe+: Traffic AI + drift mechanic',
                prompt_extends:
                    'Hãy tạo game "Đua Xe+": Tránh xe trên đường cao tốc. Thêm Traffic AI (xe địch biết chuyển làn) và cơ chế Drift giúp tích năng lượng boost.',
            },
            {
                id: 22,
                text: 'Chạy Ống+: Map procedural',
                prompt_extends:
                    'Hãy tạo game "Chạy Ống+": Chạy trong đường hầm vô tận. Bản đồ được tạo ngẫu nhiên (Procedural generation) không bao giờ lặp lại.',
            },
            {
                id: 23,
                text: 'Lướt Sóng+: Sóng động (wave physics nhẹ)',
                prompt_extends:
                    'Hãy tạo game "Lướt Sóng+": Lướt trên mặt biển. Có hệ thống Wave Physics (sóng động) làm thay đổi cao độ và độ nảy của ván lướt.',
            },
            {
                id: 24,
                text: 'Bay Trọng Lực+: Gravity flip cooldown',
                prompt_extends:
                    'Hãy tạo game "Bay Trọng Lực+": Click để đảo ngược trọng lực. Có thời gian hồi chiêu (Cooldown) cho mỗi lần Flip để tránh spam.',
            },
            {
                id: 25,
                text: 'Rắn Trốn+: Enemy AI săn bạn',
                prompt_extends:
                    'Hãy tạo game "Rắn Trốn+": Điều khiển rắn ăn mồi nhưng đồng thời bị các "Enemy AI" săn đuổi và bao vây.',
            },
            {
                id: 26,
                text: 'ZigZag+: Tile biến mất phía sau',
                prompt_extends:
                    'Hãy tạo game "ZigZag+": Di chuyển theo đường chéo. Các viên gạch (Tiles) sẽ biến mất ngay phía sau nhân vật, buộc phải đi liên tục.',
            },
            {
                id: 27,
                text: 'Tàu Vũ Trụ+: Bullet hell nhẹ',
                prompt_extends:
                    'Hãy tạo game "Tàu Vũ Trụ+": Bay trong không gian. Né tránh mưa thiên thạch theo phong cách "Bullet Hell" nhẹ.',
            },
            {
                id: 28,
                text: 'Mê Cung+: Fog of war',
                prompt_extends:
                    'Hãy tạo game "Mê Cung+": Tìm lối thoát trong sương mù (Fog of War) che khuất tầm nhìn, chỉ có một khoảng sáng nhỏ quanh nhân vật.',
            },
            {
                id: 29,
                text: 'Trượt Tuyết+: Trick system (nhảy + xoay)',
                prompt_extends:
                    'Hãy tạo game "Trượt Tuyết+": Vừa trượt vừa thực hiện Trick System (nhảy và xoay trên không) để lấy điểm combo.',
            },
            {
                id: 30,
                text: 'Chạy Nước Rút+: Stamina system',
                prompt_extends:
                    'Hãy tạo game "Chạy Nước Rút+": Chạy vượt rào với hệ thống Stamina (thể lực). Nếu chạy nhanh quá lâu sẽ bị kiệt sức và đi chậm lại.',
            },
        ],
    },
    {
        title: '4. COLLECT (PROGRESSION LOOP)',
        icon: '🎁',
        color: 'bg-[#D97706]',
        items: [
            {
                id: 31,
                text: 'Thu Hoạch+: Upgrade tool → tăng tốc độ',
                prompt_extends:
                    'Hãy tạo game "Thu Hoạch+": Thu thập nông sản. Có hệ thống Upgrade Tool: Dùng tiền kiếm được để mua liềm/máy cắt giúp thu hoạch nhanh hơn.',
            },
            {
                id: 32,
                text: 'Thợ Mỏ+: Layer map (càng sâu càng hiếm)',
                prompt_extends:
                    'Hãy tạo game "Thợ Mỏ+": Đào sâu xuống đất. Bản đồ chia theo Layer (tầng), tầng càng sâu thì khoáng sản càng hiếm và giá trị cao.',
            },
            {
                id: 33,
                text: 'Kho Báu+: Oxygen limit',
                prompt_extends:
                    'Hãy tạo game "Kho Báu+": Lặn xuống biển tìm vàng. Có giới hạn lượng Oxygen (Oxy) - phải lên mặt nước nạp khí trước khi hết giờ.',
            },
            {
                id: 34,
                text: 'Dọn Rác+: Combo sạch liên tục',
                prompt_extends:
                    'Hãy tạo game "Dọn Rác+": Thu lượm rác thải trong thành phố. Làm sạch liên tục sẽ kích hoạt Combo nhân điểm và hiệu ứng ánh sáng rực rỡ.',
            },
            {
                id: 35,
                text: 'Bắt Bướm+: AI bay khác nhau',
                prompt_extends:
                    'Hãy tạo game "Bắt Bướm+": Dùng vợt bắt bướm. Mỗi loại bướm có AI bay khác nhau (zic-zac, vòng tròn, bay nhanh) thử thách tay nghề.',
            },
            {
                id: 36,
                text: 'Nhặt Sao+: Parkour nhẹ',
                prompt_extends:
                    'Hãy tạo game "Nhặt Sao+": Di chuyển trong môi trường đô thị with phong cách Parkour nhẹ để lấy các ngôi sao trên cao.',
            },
            {
                id: 37,
                text: 'Câu Cá+: Timing bar + cá hiếm',
                prompt_extends:
                    'Hãy tạo game "Câu Cá+": Thả câu với thanh Timing Bar. Cần giữ cá trong vùng xanh để kéo lên, thi thoảng spawn cá hiếm.',
            },
            {
                id: 38,
                text: 'Sưu Tầm+: Gacha system',
                prompt_extends:
                    'Hãy tạo game: Thu thập các mảnh thẻ bài. Có hệ thống Gacha (mở gói ngẫu nhiên) để hoàn thiện bộ sưu tập các sinh vật huyền thoại.',
            },
            {
                id: 39,
                text: 'Robot+: Inventory + crafting',
                prompt_extends:
                    'Hãy tạo game "Robot+": Điều khiển robot nhặt linh kiện. Có hệ thống Inventory và Crafting cơ bản: Kết hợp linh kiện để chế tạo công cụ mới.',
            },
            {
                id: 40,
                text: 'Hút Bụi+: Map random',
                prompt_extends:
                    'Hãy tạo game "Hút Bụi+": Dọn dẹp các căn phòng với bản đồ ngẫu nhiên (Random Map layout) mỗi lần chơi mới.',
            },
        ],
    },
    {
        title: '5. 2D SHOOTING (ACTION CORE)',
        icon: '🔫',
        color: 'bg-[#6D28D9]',
        items: [
            {
                id: 41,
                text: 'Tank+: Ricochet bullet',
                prompt_extends:
                    'Hãy tạo game "Tank+": Bắn xe tăng địch. Đạn có khả năng Ricochet (nảy bật tường) giúp người chơi bắn trúng kẻ địch sau vật cản.',
            },
            {
                id: 42,
                text: 'Shooter ngang+: Dash evade',
                prompt_extends:
                    'Hãy tạo game bắn máy bay ngang: Có kỹ năng Dash Evade (lướt nhanh) để né tránh các luồng đạn dày đặc của địch.',
            },
            {
                id: 43,
                text: 'Tower Defense+: Skill active',
                prompt_extends:
                    'Hãy tạo game "Tower Defense+": Đặt tháp thủ cửa, thêm hệ thống Skill Active (người chơi chủ động nhấn phím để tung chiêu mạnh).',
            },
            {
                id: 44,
                text: 'Phi Công+: Boss pattern',
                prompt_extends:
                    'Hãy tạo game "Phi Công+": Đối đầu với Boss máy bay khổng lồ có nhiều giai đoạn tấn công (Boss Pattern) phức tạp.',
            },
            {
                id: 45,
                text: 'Cung Tên+: Charge shot',
                prompt_extends:
                    'Hãy tạo game "Cung Tên+": Kéo để lấy đạn. Có cơ chế Charge Shot: Giữ càng lâu mũi tên bay càng mạnh và xuyên thấu.',
            },
            {
                id: 46,
                text: 'Zombie+: Wave + boss',
                prompt_extends:
                    'Hãy tạo game "Zombie+": Chống lại Wave Zombie liên tục. Sau mỗi 10 đợt sẽ có một con Boss khổng lồ xuất hiện.',
            },
            {
                id: 47,
                text: 'Bubble+: Combo explosion',
                prompt_extends:
                    'Hãy tạo game "Bubble Shooter+": Bắn bóng cùng màu. Khi tạo ra Combo lớn sẽ có hiệu ứng nổ lan rộng (Explosion).',
            },
            {
                id: 48,
                text: 'Defense+: Upgrade turret',
                prompt_extends:
                    'Hãy tạo game "Defense+": Bảo vệ căn cứ. Có hệ thống Upgrade Turret (nâng cấp trụ) theo nhiều hướng: Tốc độ, sát thương hoặc băng giá.',
            },
            {
                id: 49,
                text: 'Pháo Hoa+: Pattern puzzle',
                prompt_extends:
                    'Hãy tạo game "Pháo Hoa+": Bắn các điểm trên bầu trời để tạo ra các mô hình pháo hoa theo đố vui (Pattern Puzzle).',
            },
            {
                id: 50,
                text: 'Tàu Ngầm+: Sonar mechanic',
                prompt_extends:
                    'Hãy tạo game "Tàu Ngầm+": Dùng cơ chế Sonar (radar âm thanh) để phát hiện và bắn ngư lôi vào tàu địch trong bóng tối.',
            },
        ],
    },
    {
        title: '6. PLATFORM (SKILL EXPRESSION)',
        icon: '🕹',
        color: 'bg-[#0284C7]',
        items: [
            {
                id: 51,
                text: 'Nhảy Mây+: Moving platform sync',
                prompt_extends:
                    'Hãy tạo game "Nhảy Mây+": Nhảy qua các đám mây di động. Các nền tảng mây di chuyển theo nhịp điệu (Sync) đồng bộ.',
            },
            {
                id: 52,
                text: 'Hang Động+: Trap timing',
                prompt_extends:
                    'Hãy tạo game: Leo trong hang động. Phải canh thời gian né các bẫy gai (Trap Timing) nhô ra từ sàn và trần.',
            },
            {
                id: 53,
                text: 'Nhảy Dây+: Rhythm jump',
                prompt_extends:
                    'Hãy tạo game "Nhảy Dây+": Theo phong cách nhảy nhịp điệu (Rhythm jump). Nhịp dây quay đổi tốc độ liên tục theo nhạc.',
            },
            {
                id: 54,
                text: 'Spider+: Swing physics',
                prompt_extends:
                    'Hãy tạo game "Spider+": Đu dây trong thành phố. Sử dụng vật lý xoay (Swing physics) chân thực để di chuyển.',
            },
            {
                id: 55,
                text: 'Tháp+: Endless climb',
                prompt_extends:
                    'Hãy tạo game "Tháp+": Leo tháp vô tận (Endless climb) with các bậc thang biến mất dần từ bên dưới.',
            },
            {
                id: 56,
                text: 'Ninja+: Wall jump combo',
                prompt_extends:
                    'Hãy tạo game "Ninja+": Vượt địa hình. Có cơ chế Wall Jump Combo: Nhảy liên tục giữa 2 bức tường để leo lên nhanh chóng.',
            },
            {
                id: 57,
                text: 'Vực+: Momentum jump',
                prompt_extends:
                    'Hãy tạo game platform: Nhảy qua vực sâu. Nhân vật có Momentum Jump: Chạy lấy đà càng nhanh nhảy càng xa.',
            },
            {
                id: 58,
                text: 'Lò Xo+: Chain bounce',
                prompt_extends:
                    'Hãy tạo game "Lò Xo+": Sử dụng các lò xo để bật cao. Có cơ chế Chain Bounce: Bật liên tiếp không chạm đất sẽ nhận điểm thưởng lớn.',
            },
            {
                id: 59,
                text: 'Obstacle+: Speedrun map',
                prompt_extends:
                    'Hãy tạo game platformer với bản đồ Speedrun: Người chơi phải hoàn thành các thử thách vượt chướng ngại vật trong thời gian ngắn nhất.',
            },
            {
                id: 60,
                text: 'Rescue+: Puzzle + platform mix',
                prompt_extends:
                    'Hãy tạo game "Rescue+": Một sự kết hợp giữa giải đố và platform. Di chuyển các khối vật thể để tạo đường cứu nhân vật khác.',
            },
        ],
    },
    {
        title: '7. PUZZLE (BRAIN HOOK)',
        icon: '🧠',
        color: 'bg-[#03856D]',
        items: [
            {
                id: 61,
                text: 'Ống Nước+: Time limit',
                prompt_extends:
                    'Hãy tạo game: Sắp xếp các đoạn ống nước để kết nối nguồn với đầu ra trong giới hạn thời gian (Time limit).',
            },
            {
                id: 62,
                text: 'Sokoban+: Undo + limited moves',
                prompt_extends:
                    'Hãy tạo game đẩy thùng: Có nút Undo (hoàn tác) và số bước di chuyển bị giới hạn (Limited moves) cho mỗi màn.',
            },
            {
                id: 63,
                text: 'Match Pair+: Memory + timer',
                prompt_extends:
                    'Hãy tạo game lật thẻ bài giống nhau (Memory). Có hệ thống đếm ngược (Timer) tăng thêm sự kịch tính.',
            },
            {
                id: 64,
                text: 'Tangram+: Shadow guide off',
                prompt_extends:
                    'Hãy tạo game xếp hình gỗ. Có thể tắt "Shadow Guide" (hình bóng gợi ý) để tăng độ khó lên mức tối đa.',
            },
            {
                id: 65,
                text: 'Mê Cung+: Moving walls',
                prompt_extends:
                    'Hãy tạo game mê cung: Các bức tường sẽ thay đổi vị trí thường xuyên (Moving walls) buộc người chơi phải quan sát kỹ.',
            },
            {
                id: 66,
                text: 'Nối Điểm+: Không được cắt đường',
                prompt_extends:
                    'Hãy tạo game: Nối các điểm cùng màu mà không được để các đường nối cắt nhau (Flow style).',
            },
            {
                id: 67,
                text: 'Spot Diff+: Animation gây nhiễu',
                prompt_extends:
                    'Hãy tạo game tìm điểm khác biệt giữa 2 bức ảnh. Thêm các hiệu ứng Animation gây nhiễu để làm người chơi phân tâm.',
            },
            {
                id: 68,
                text: '2048+: Power tile',
                prompt_extends:
                    'Hãy tạo game 2048: Thêm các ô đặc biệt "Power Tile" có chức năng xóa một hàng khi được gộp vào.',
            },
            {
                id: 69,
                text: 'Cắt Hình+: Physics cut',
                prompt_extends:
                    'Hãy tạo game giải đố vật lý: Cắt các khối vật thể sao cho phần bị cắt rơi xuống đúng vị trí yêu cầu.',
            },
            {
                id: 70,
                text: 'Cầu Treo+: Weight balance',
                prompt_extends:
                    'Hãy tạo game: Xây dựng cầu bằng các thanh nối. Có hệ thống tính toán trọng lực (Weight balance) để cầu không bị sập.',
            },
        ],
    },
    {
        title: '8. SIMPLE AI (SMART FEEL)',
        icon: '🤖',
        color: 'bg-[#BE123C]',
        items: [
            {
                id: 71,
                text: 'Hide & Seek+: AI learning pattern',
                prompt_extends:
                    'Hãy tạo game trốn tìm: AI sẽ học theo thói quen của người chơi (Learning pattern) để tìm ra nơi ẩn nấp nhanh hơn.',
            },
            {
                id: 72,
                text: 'Race Bot+: Adaptive difficulty',
                prompt_extends:
                    'Hãy tạo game đua xe: AI đối thủ có Adaptive Difficulty (độ khó tự điều chỉnh), sẽ chạy nhanh hơn nếu người chơi đang dẫn xa.',
            },
            {
                id: 73,
                text: 'Cờ+: AI heuristic nhẹ',
                prompt_extends:
                    'Hãy tạo game Cờ vây/Cờ caro: AI sử dụng thuật toán Heuristic nhẹ để tính toán nước đi thông minh nhất.',
            },
            {
                id: 74,
                text: 'Territory+: AI expand',
                prompt_extends:
                    'Hãy tạo game chiếm lãnh thổ: Các AI đối thủ sẽ tự động mở rộng (Expand) và tấn công vùng đất của nhau.',
            },
            {
                id: 75,
                text: 'Pet+: Emotion system',
                prompt_extends:
                    'Hãy tạo game nuôi thú ảo: Chú thú AI có hệ thống cảm xúc (Emotion system) - vui buồn đói dựa trên cách bạn tương tác.',
            },
            {
                id: 76,
                text: 'Enemy+: Pathfinding',
                prompt_extends:
                    'Hãy tạo game: Kẻ địch AI sử dụng thuật toán dẫn đường (Pathfinding) thông minh để không bao giờ bị kẹt trong ngõ cụt.',
            },
            {
                id: 77,
                text: 'Escort+: AI follow logic',
                prompt_extends:
                    'Hãy tạo game bảo vệ NPC: AI của NPC sẽ tự động đi theo và tìm vị trí an toàn (Follow logic) khi có giao tranh.',
            },
            {
                id: 78,
                text: 'Fishing AI+: Behavior cá',
                prompt_extends:
                    'Hãy tạo game câu cá: Cá AI có hành vi (Behavior) chân thực, biết nhấp nhử mồi trước khi cắn câu.',
            },
            {
                id: 79,
                text: 'Chat Bot+: Dialogue tree',
                prompt_extends:
                    'Hãy tạo hệ thống đối thoại game: Sử dụng Dialogue Tree để tạo ra các cuộc trò chuyện rẽ nhánh với NPC AI.',
            },
            {
                id: 80,
                text: 'Catch+: Predict player',
                prompt_extends:
                    'Hãy tạo game: AI có khả năng dự đoán hướng di chuyển của người chơi (Predict player) để chặn đầu bắt gọn.',
            },
        ],
    },
    {
        title: '9. ADVANCED (SYSTEM DESIGN)',
        icon: '⚙️',
        color: 'bg-[#A16207]',
        items: [
            {
                id: 81,
                text: 'Tower Defense+: Skill tree',
                prompt_extends:
                    'Hãy tạo game thủ thành chuyên nghiệp: Bao gồm hệ thống Skill Tree phân nhánh sâu để nâng cấp trụ phòng thủ.',
            },
            {
                id: 82,
                text: 'RPG+: Inventory + stat',
                prompt_extends:
                    'Hãy tạo hệ thống nhập vai cơ bản: Bao gồm túi đồ (Inventory) và các chỉ số nhân vật (Stat system) thay đổi khi lên cấp.',
            },
            {
                id: 83,
                text: 'Farm+: Time cycle',
                prompt_extends:
                    'Hãy tạo game nông trại: Có hệ thống chu kỳ thời gian (Time Cycle) ngày và đêm ảnh hưởng đến sự phát triển của cây trồng.',
            },
            {
                id: 84,
                text: 'Racing+: Upgrade part',
                prompt_extends:
                    'Hãy tạo game đua xe chuyên sâu: Cho phép người chơi thay đổi các bộ phận (Upgrade part) như động cơ, lốp để tối ưu tốc độ.',
            },
            {
                id: 85,
                text: 'City Builder+: Resource loop',
                prompt_extends:
                    'Hãy tạo game xây dựng thành phố: Phải quản lý vòng lặp tài nguyên (Resource loop) về điện, nước và ngân sách thành phố.',
            },
            {
                id: 86,
                text: 'Survival+: Hunger + crafting',
                prompt_extends:
                    'Hãy tạo game sinh tồn: Có các thanh chỉ số "Hunger" (đói) và hệ thống "Crafting" chế tạo từ các tài nguyên nhặt được.',
            },
            {
                id: 87,
                text: 'Turn-based+: Skill combo',
                prompt_extends:
                    'Hãy tạo game chiến thuật theo lượt: Cho phép người chơi kết hợp các chiêu thức khác nhau (Skill combo) để tạo sát thương lớn.',
            },
            {
                id: 88,
                text: 'Business+: Supply-demand',
                prompt_extends:
                    'Hãy tạo game kinh doanh nhà hàng: Có hệ thống cung-cầu (Supply-demand) - giá nguyên liệu sẽ thay đổi theo thị trường.',
            },
            {
                id: 89,
                text: 'Story Puzzle+: Choice system',
                prompt_extends:
                    'Hãy tạo game giải đố cốt truyện: Mỗi hành động và lựa chọn của bạn (Choice system) sẽ dẫn đến một kết thúc khác nhau.',
            },
            {
                id: 90,
                text: 'Card Game+: Deck build',
                prompt_extends:
                    'Hãy tạo khung sườn game thẻ bài chiến thuật: Có hệ thống xây dựng bộ bài (Deck build) và các quy tắc đấu thẻ phức tạp.',
            },
        ],
    },
    {
        title: '10. PRO LEVEL (GẦN GAME THẬT)',
        icon: '👑',
        color: 'bg-[#1E293B]',
        items: [
            {
                id: 91,
                text: 'Metroidvania+: Ability unlock map',
                prompt_extends:
                    'Hãy tạo bản mẫu game Metroidvania: Bản đồ rộng lớn, đòi hỏi người chơi phải mở khóa kỹ năng mới (Ability unlock) mới có thể đi tiếp.',
            },
            {
                id: 92,
                text: 'Action RPG+: Combo + skill tree',
                prompt_extends:
                    'Hãy tạo game hành động: Bao gồm hệ thống Combo đánh đấm phức tạp kết hợp cùng Skill Tree phân nhánh đa dạng.',
            },
            {
                id: 93,
                text: 'Kingdom+: Macro + micro',
                prompt_extends:
                    'Hãy tạo game quản lý vương quốc: Kết hợp giữa quản lý vĩ mô (Macro - xây dựng) và điều khiển vi mô (Micro - dàn trận chiến đấu).',
            },
            {
                id: 94,
                text: 'Kart+: Multiplayer sync',
                prompt_extends:
                    'Hãy tạo game đua xe bắn súng: Có hệ thống đồng bộ người chơi (Multiplayer Sync) để nhiều xe cùng thi đấu trên đường đua.',
            },
            {
                id: 95,
                text: 'RTS+: Unit AI',
                prompt_extends:
                    'Hãy tạo game chiến thuật thời gian thực: Điều khiển các nhóm lính (Unit AI) đi khai thác và tấn công căn cứ kẻ thù.',
            },
            {
                id: 96,
                text: 'Life Sim+: Schedule system',
                prompt_extends:
                    'Hãy tạo game mô phỏng cuộc sống: Có hệ thống thời gian biểu (Schedule system) - các NPC sẽ làm việc khác nhau tùy theo đồng hồ.',
            },
            {
                id: 97,
                text: 'Roguelike+: Random build',
                prompt_extends:
                    'Hãy tạo game Roguelike: Sử dụng cơ chế Random Build - mỗi lần bắt đầu chơi sẽ có một bộ kỹ năng và bản đồ hoàn toàn mới.',
            },
            {
                id: 98,
                text: 'Fighting+: Frame data nhẹ',
                prompt_extends:
                    'Hãy tạo game đối kháng chuyên sâu: Hệ thống Frame Data nhẹ (quy định độ trễ của chiêu thức) để tạo sự cân bằng khi chiến đấu.',
            },
            {
                id: 99,
                text: 'FPS+: Aim + recoil',
                prompt_extends:
                    'Hãy tạo khung sườn game bắn súng góc nhìn thứ nhất: Có hệ thống Aiming (ngắm), Recoil (độ giật súng) và nạp đạn chân thực.',
            },
            {
                id: 100,
                text: 'Sandbox+: World system',
                prompt_extends:
                    'Hãy tạo game thế giới mở: Một hệ thống thế giới (World system) tự vận hành với các quy luật vật lý và AI tương tác tự do.',
            },
        ],
    },
    {
        title: 'HỆ THỐNG',
        icon: '🔒',
        color: 'bg-[#DC2626]',
        items: [
            {
                id: 'game_roadmap',
                text: 'Quyền xem Lộ trình Game AI',
            },
        ],
    },
    {
        title: 'LỘ TRÌNH HỌC (TỔNG QUAN)',
        icon: '📅',
        color: 'bg-[#7C3AED]',
        items: [
            { id: 'roadmap_overview', text: 'Quyền xem Tổng quan Lộ trình' },
        ],
    },
    {
        title: 'LỘ TRÌNH HỌC (THÁNG 1-4)',
        icon: '📅',
        color: 'bg-[#7C3AED]',
        items: [
            { id: 'roadmap_m1_w1', text: 'Quyền xem Tháng 1 Tuần 1' },
            { id: 'roadmap_m1_w2', text: 'Quyền xem Tháng 1 Tuần 2' },
            { id: 'roadmap_m1_w3', text: 'Quyền xem Tháng 1 Tuần 3' },
            { id: 'roadmap_m1_w4', text: 'Quyền xem Tháng 1 Tuần 4' },
            { id: 'roadmap_m2_w1', text: 'Quyền xem Tháng 2 Tuần 1' },
            { id: 'roadmap_m2_w2', text: 'Quyền xem Tháng 2 Tuần 2' },
            { id: 'roadmap_m2_w3', text: 'Quyền xem Tháng 2 Tuần 3' },
            { id: 'roadmap_m2_w4', text: 'Quyền xem Tháng 2 Tuần 4' },
            { id: 'roadmap_m3_w1', text: 'Quyền xem Tháng 3 Tuần 1' },
            { id: 'roadmap_m3_w2', text: 'Quyền xem Tháng 3 Tuần 2' },
            { id: 'roadmap_m3_w3', text: 'Quyền xem Tháng 3 Tuần 3' },
            { id: 'roadmap_m3_w4', text: 'Quyền xem Tháng 3 Tuần 4' },
            { id: 'roadmap_m4_w1', text: 'Quyền xem Tháng 4 Tuần 1' },
            { id: 'roadmap_m4_w2', text: 'Quyền xem Tháng 4 Tuần 2' },
            { id: 'roadmap_m4_w3', text: 'Quyền xem Tháng 4 Tuần 3' },
            { id: 'roadmap_m4_w4', text: 'Quyền xem Tháng 4 Tuần 4' },
        ],
    },
    {
        title: 'LỘ TRÌNH HỌC (THÁNG 5-8)',
        icon: '📅',
        color: 'bg-[#7C3AED]',
        items: [
            { id: 'roadmap_m5_w1', text: 'Quyền xem Tháng 5 Tuần 1' },
            { id: 'roadmap_m5_w2', text: 'Quyền xem Tháng 5 Tuần 2' },
            { id: 'roadmap_m5_w3', text: 'Quyền xem Tháng 5 Tuần 3' },
            { id: 'roadmap_m5_w4', text: 'Quyền xem Tháng 5 Tuần 4' },
            { id: 'roadmap_m6_w1', text: 'Quyền xem Tháng 6 Tuần 1' },
            { id: 'roadmap_m6_w2', text: 'Quyền xem Tháng 6 Tuần 2' },
            { id: 'roadmap_m6_w3', text: 'Quyền xem Tháng 6 Tuần 3' },
            { id: 'roadmap_m6_w4', text: 'Quyền xem Tháng 6 Tuần 4' },
            { id: 'roadmap_m7_w1', text: 'Quyền xem Tháng 7 Tuần 1' },
            { id: 'roadmap_m7_w2', text: 'Quyền xem Tháng 7 Tuần 2' },
            { id: 'roadmap_m7_w3', text: 'Quyền xem Tháng 7 Tuần 3' },
            { id: 'roadmap_m7_w4', text: 'Quyền xem Tháng 7 Tuần 4' },
            { id: 'roadmap_m8_w1', text: 'Quyền xem Tháng 8 Tuần 1' },
            { id: 'roadmap_m8_w2', text: 'Quyền xem Tháng 8 Tuần 2' },
            { id: 'roadmap_m8_w3', text: 'Quyền xem Tháng 8 Tuần 3' },
            { id: 'roadmap_m8_w4', text: 'Quyền xem Tháng 8 Tuần 4' },
        ],
    },
    {
        title: 'LỘ TRÌNH HỌC (THÁNG 9-12)',
        icon: '📅',
        color: 'bg-[#7C3AED]',
        items: [
            { id: 'roadmap_m9_w1', text: 'Quyền xem Tháng 9 Tuần 1' },
            { id: 'roadmap_m9_w2', text: 'Quyền xem Tháng 9 Tuần 2' },
            { id: 'roadmap_m9_w3', text: 'Quyền xem Tháng 9 Tuần 3' },
            { id: 'roadmap_m9_w4', text: 'Quyền xem Tháng 9 Tuần 4' },
            { id: 'roadmap_m10_w1', text: 'Quyền xem Tháng 10 Tuần 1' },
            { id: 'roadmap_m10_w2', text: 'Quyền xem Tháng 10 Tuần 2' },
            { id: 'roadmap_m10_w3', text: 'Quyền xem Tháng 10 Tuần 3' },
            { id: 'roadmap_m10_w4', text: 'Quyền xem Tháng 10 Tuần 4' },
            { id: 'roadmap_m11_w1', text: 'Quyền xem Tháng 11 Tuần 1' },
            { id: 'roadmap_m11_w2', text: 'Quyền xem Tháng 11 Tuần 2' },
            { id: 'roadmap_m11_w3', text: 'Quyền xem Tháng 11 Tuần 3' },
            { id: 'roadmap_m11_w4', text: 'Quyền xem Tháng 11 Tuần 4' },
            { id: 'roadmap_m12_w1', text: 'Quyền xem Tháng 12 Tuần 1' },
            { id: 'roadmap_m12_w2', text: 'Quyền xem Tháng 12 Tuần 2' },
            { id: 'roadmap_m12_w3', text: 'Quyền xem Tháng 12 Tuần 3' },
            { id: 'roadmap_m12_w4', text: 'Quyền xem Tháng 12 Tuần 4' },
        ],
    },
]
