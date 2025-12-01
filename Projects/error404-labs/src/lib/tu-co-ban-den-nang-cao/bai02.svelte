<script lang="ts">
	import CodeBlock from '../../components/CodeBlock.svelte';

	const code: string = `
        using namespace std;
        #include <iostream>

        class Sample {
            
            private:
                int a, b;
            
            public:
            
                Sample() {
                    a = 10;
                    b = 5;
                    cout << "Constructor mac dinh\\n";
                    showData();
                }
                
                Sample(int x, int y) {
                    a = x;
                    b = y;
                    cout << "Constructor co tham so\\n";
                    showData();
                }
                
                ~Sample() {
                    cout << "Destructor\\n";
                }
            
                void getData() {
                    cout << "Nhap so dau tien: ";
                    cin >> a;
                    
                    cout << "Nhap so thu hai: ";
                    cin >> b;
                }
            
                void showData() {
                    cout << "Gia tri a = " << a << endl;
                    cout << "Gia tri b = " << b << endl;
                }
            
        };

        int main() {
            

            // Vi du 1: getData, showData
            /*
            Sample s1;
            s1.getData();
            s1.showData();
            */
            
            // Vi du 2: showData trong constructor mac dinh
            Sample s2;
            
            // Vi du 3: showData trong constructor co tham so
            Sample s3(7, 8);

            return 0;

        }
    `;
</script>

<div class="wrapper">
	<h1>Lập Trình Hướng Đối Tượng Trong C++</h1>
	<details>
		<summary>Xem Code</summary>
		<div class="full-code">
			<CodeBlock {code} />
		</div>
	</details>
	<h2>1. CLASS (Lớp) và OBJECT (Đối tượng)</h2>
	<div class="p">
		<strong>Class</strong> là khuôn mẫu định nghĩa thuộc tính và hành vi của đối tượng.
	</div>
	<div class="p">
		<strong>Object</strong> là thực thể cụ thể được tạo ra từ class.
	</div>
	<CodeBlock
		code={`
        class Sample {  // Định nghĩa class
            // Nội dung class
        };

        Sample s1;  // Tạo object s1 từ class Sample
        `}
	/>
	<h2>2. DATA MEMBERS (Thuộc tính)</h2>
	<div class="p">Là các biến được khai báo bên trong class để lưu trữ dữ liệu:</div>
	<CodeBlock
		code={`
        private:
            int a, b;  // Data members (thuộc tính riêng tư)
        `}
	/>
	<div class="p">
		<strong>Private:</strong> Chỉ truy cập được từ bên trong class, bảo vệ dữ liệu.
	</div>
	<h2>3. MEMBER FUNCTIONS (Phương thức)</h2>
	<div class="p">Là các hàm được định nghĩa trong class để thao tác với dữ liệu:</div>
	<CodeBlock
		code={`
        public:
            void getData() { ... }    // Nhập dữ liệu
            void showData() { ... }   // Hiển thị dữ liệu
        `}
	/>
	<div class="p">
		<strong>Public:</strong> Có thể truy cập từ bên ngoài class.
	</div>
	<h2>4. CONSTRUCTOR (Hàm khởi tạo)</h2>
	<div class="p">
		Hàm đặc biệt được gọi <strong>tự động</strong> khi tạo object, dùng để khởi tạo giá trị ban đầu.
	</div>
	<div class="p">
		<strong>Constructor mặc định (không tham số):</strong>
	</div>
	<CodeBlock
		code={`
        Sample() {
            a = 10;
            b = 5;
            cout << "Constructor mac dinh\\n";
        }
        `}
	/>
	<ul>
		<li>Được gọi khi: <code style="color: #d73a49;">Sample s2;</code></li>
		<li>Khởi tạo a=10, b=5</li>
	</ul>
	<div class="p">
		<strong>Constructor có tham số:</strong>
	</div>
	<CodeBlock
		code={`
        Sample(int x, int y) {
            a = x;
            b = y;
            cout << "Constructor co tham so\\n";
        }
        `}
	/>
	<ul>
		<li>Được gọi khi: <code style="color: #d73a49;">Sample s3(7, 8);</code></li>
		<li>Khởi tạo a=7, b=8</li>
	</ul>
	<div class="p"><strong>Đặc điểm Constructor:</strong></div>
	<ul>
		<li>Tên trùng với tên class</li>
		<li>Không có kiểu trả về</li>
		<li>Có thể overload (nhiều constructor khác nhau)</li>
	</ul>
	<h2>5. DESTRUCTOR (Hàm hủy)</h2>
	<div class="p">
		Hàm đặc biệt được gọi <strong>tự động</strong> khi object bị hủy (kết thúc chương trình hoặc ra khỏi
		phạm vi):
	</div>
	<CodeBlock
		code={`
        ~Sample() {
            cout << "Destructor\\n";
        }
        `}
	/>
	<div class="p"><strong>Đặc điểm Destructor:</strong></div>
	<ul>
		<li>Tên là ~TênClass</li>
		<li>Không có tham số, không có kiểu trả về</li>
		<li>Chỉ có 1 destructor duy nhất</li>
		<li>Dùng để giải phóng tài nguyên</li>
	</ul>
	<h2>6. PHÂN TÍCH LUỒNG CHẠY CHƯƠNG TRÌNH</h2>
	<div class="p">Khi chạy code với main() hiện tại:</div>
	<CodeBlock
		code={`
        Bước 1: Sample s2;
        → Gọi constructor mặc định
        → In: "Constructor mac dinh"
        → a=10, b=5
        → In giá trị a, b

        Bước 2: Sample s3(7, 8);
        → Gọi constructor có tham số
        → In: "Constructor co tham so"
        → a=7, b=8
        → In giá trị a, b

        Bước 3: Kết thúc main()
        → Hủy s3: In "Destructor"
        → Hủy s2: In "Destructor"
        `}
	/>
	<h2>7. KẾT LUẬN</h2>
	<div class="p"><strong>Sơ đồ quan hệ:</strong></div>
	<CodeBlock
		code={`
        Class Sample
        ├── Data Members: a, b (private)
        ├── Constructors: khởi tạo object
        ├── Destructor: dọn dẹp khi kết thúc
        └── Member Functions: getData(), showData() (public)
        `}
	/>
	<div class="p"><strong>Lợi ích OOP:</strong></div>
	<ul>
		<li>Đóng gói dữ liệu (encapsulation): private/public</li>
		<li>Tự động khởi tạo và hủy object</li>
		<li>Code có cấu trúc, dễ bảo trì</li>
	</ul>
</div>

<style>
	.wrapper {
		position: relative;
		font-size: large;

		.p {
			font-size: medium;
		}

		h1 {
			font-weight: bolder;
			font-size: xx-large;
			position: sticky;
			top: 0;
			background: linear-gradient(45deg, rgb(190, 129, 129), rgb(84, 146, 84), rgb(117, 117, 194));
			border-radius: 10px;
			text-align: center;
			padding-top: 6px;
			z-index: 888;
			color: floralwhite;
		}

		div {
			a {
				background-color: #35b219;
				color: #000;
				padding: 0 15px;
				border-radius: 10px;

				&:hover {
					text-decoration: none;
				}
			}

			code {
				display: block;
				text-align: center;
				margin: 15px 0;
				color: #35b219;
			}
		}

		h2 {
			font-weight: bolder;
			font-size: large;
			width: fit-content;
			margin: 15px 0;
		}

		ul {
			li {
				font-size: medium;
			}
		}
	}
</style>
