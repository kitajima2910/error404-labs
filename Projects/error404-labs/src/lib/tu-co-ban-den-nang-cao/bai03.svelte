<script lang="ts">
	import './../huong-dan-hoc.css';
	import CodeBlock from '../../components/CodeBlock.svelte';
</script>

<div class="wrapper">
	<h1>
		Data Types trong C++ <span>Kiểu Dữ Liệu: Nguyên Thủy, Người Dùng Định Nghĩa, và Dẫn Xuất</span>
	</h1>
	<h2>1. Kiểu Dữ Liệu Nguyên Thủy (Primitive Data Types)</h2>
	<div class="p">Kiểu dữ liệu nguyên thủy là những kiểu cơ bản được hỗ trợ trực tiếp bởi C++:</div>
	<div class="p"><strong>Các Kiểu Số Nguyên (Integer Types)</strong></div>
	<ul>
		<li><strong>int:</strong> Số nguyên thông thường (thường 4 bytes)</li>
		<li><strong>short:</strong> Số nguyên nhỏ (2 bytes)</li>
		<li><strong>long:</strong> Số nguyên lớn (4 hoặc 8 bytes)</li>
		<li><strong>long long:</strong> Số nguyên rất lớn (8 bytes)</li>
	</ul>
	<div class="p"><strong>Các Kiểu Số Thực (Floating Point Types)</strong></div>
	<ul>
		<li><strong>float:</strong> Số thực chính xác đơn (4 bytes)</li>
		<li><strong>double:</strong> Số thực chính xác kép (8 bytes)</li>
		<li><strong>long double:</strong> Số thực chính xác cao (thường 16 bytes)</li>
	</ul>
	<div class="p"><strong>Các Kiểu Khác</strong></div>
	<ul>
		<li><strong>char:</strong> Ký tự đơn (1 byte)</li>
		<li><strong>bool:</strong> Giá trị logic (true/false)</li>
		<li><strong>void:</strong> Không có kiểu (dùng cho hàm không trả về giá trị)</li>
	</ul>
	<div class="p"><strong>Ví dụ:</strong></div>
	<CodeBlock
		code={`
		int age = 25;
		double price = 19.99;
		char grade = 'A';
		bool isActive = true;
	`}
	/>
	<h2>2. Kiểu Dữ Liệu Người Dùng Định Nghĩa (User-Defined Data Types)</h2>
	<div class="p">
		Là những kiểu dữ liệu được tạo bởi lập trình viên để tổ chức dữ liệu theo cách riêng.
	</div>
	<div class="p"><strong>Struct (Cấu Trúc)</strong></div>
	<div class="p">Tập hợp các biến khác nhau cùng một tên, mặc định truy cập công khai:</div>
	<CodeBlock
		code={`
		struct Student {
			int id;
			string name;
			float gpa;
		};

		Student s1;
		s1.id = 101;
		s1.name = "Nguyen Van A";
		s1.gpa = 3.5;
	`}
	/>
	<div class="p"><strong>Class (Lớp)</strong></div>
	<div class="p">
		Tương tự struct nhưng mặc định truy cập riêng tư, hỗ trợ tính kế thừa và đóng gói:
	</div>
	<CodeBlock
		code={`
		class Employee {
			private:
				int salary;
			public:
				string name;
				void setSalary(int s) { salary = s; }
		};
	`}
	/>
	<div class="p"><strong>Union (Liên Hợp)</strong></div>
	<div class="p">
		Chia sẻ cùng một vùng bộ nhớ, chỉ một thành viên có giá trị tại một thời điểm:
	</div>
	<CodeBlock
		code={`
		union Data {
			int x;
			float y;
		};
		// x và y chia sẻ cùng bộ nhớ
	`}
	/>
	<div class="p"><strong>Enum (Liệt Kê)</strong></div>
	<div class="p">Định nghĩa một tập hợp các hằng số nguyên có tên:</div>
	<CodeBlock
		code={`
		enum Color { RED = 0, GREEN = 1, BLUE = 2 };
		Color myColor = RED;
	`}
	/>
	<h2>3. Kiểu Dữ Liệu Dẫn Xuất (Derived Data Types)</h2>
	<div class="p">
		Những kiểu được xây dựng từ kiểu dữ liệu nguyên thủy hoặc người dùng định nghĩa.
	</div>
	<div class="p"><strong>Pointer (Con Trỏ)</strong></div>
	<div class="p">Biến chứa địa chỉ bộ nhớ của một biến khác:</div>
	<CodeBlock
		code={`
		int x = 10;
		int* ptr = &x;      // Lấy địa chỉ của x
		cout << *ptr;       // In giá trị: 10
		cout << ptr;        // In địa chỉ
	`}
	/>
	<div class="p"><strong>Array (Mảng)</strong></div>
	<div class="p">Tập hợp các phần tử cùng kiểu dữ liệu liên tiếp trong bộ nhớ:</div>
	<CodeBlock
		code={`
		int arr[5] = {10, 20, 30, 40, 50};
		cout << arr[0];     // Truy cập phần tử đầu tiên
	`}
	/>
	<div class="p"><strong>Reference (Tham Chiếu)</strong></div>
	<div class="p">Bí danh cho một biến khác:</div>
	<CodeBlock
		code={`
		int x = 10;
		int& ref = x;       // ref là tham chiếu của x
		ref = 20;           // x cũng thay đổi thành 20
	`}
	/>
	<div class="p"><strong>Function Pointer (Con Trỏ Hàm)</strong></div>
	<div class="p">Con trỏ trỏ đến một hàm:</div>
	<CodeBlock
		code={`
		int add(int a, int b) { return a + b; }
		int (*funcPtr)(int, int) = &add;
		int result = funcPtr(5, 3);  // Gọi hàm qua con trỏ
	`}
	/>
	<h2>4. Bảng So Sánh Tóm Tắt</h2>
	<table>
		<thead>
			<tr>
				<th align="left">Phân Loại</th>
				<th align="left">Kiểu</th>
				<th align="left">Tính Chất</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th align="left">Nguyên Thủy</th>
				<td>int, float, char, bool</td>
				<td>Cơ bản, hỗ trợ sẵn</td>
			</tr>
			<tr>
				<th align="left">Người Dùng Định Nghĩa</th>
				<td>struct, class, union, enum</td>
				<td>Tạo bởi lập trình viên</td>
			</tr>
			<tr>
				<th align="left">Dẫn Xuất</th>
				<td>pointer, array, reference</td>
				<td>Xây dựng từ các kiểu khác</td>
			</tr>
		</tbody>
	</table>
	<h2>5. Lưu Ý Quan Trọng</h2>
	<ul>
		<li>Kiểu dữ liệu xác định kích thước bộ nhớ và phạm vi giá trị</li>
		<li>
			Dùng <span style="color: #e36209">sizeof()</span> để kiểm tra kích thước:
			<span style="color: #e36209">cout &lt;&lt; sizeof(int);</span>
		</li>
		<li>Lựa chọn kiểu dữ liệu phù hợp giúp tối ưu bộ nhớ</li>
		<li>User-defined types giúp code tổ chức, dễ bảo trì hơn</li>
		<li>Derived types cấp độ cao hơn cho phép quản lý bộ nhớ động</li>
	</ul>
</div>
