<script lang="ts">
	import './../huong-dan-hoc.css';
	import CodeBlock from '../../components/CodeBlock.svelte';

	const codeArr1And2D: string = `
        #include <iostream>
        using namespace std;

        int main() {
            // Mảng 1 chiều
            int arr[5] = {10, 20, 30, 40, 50};
            cout << "Mang 1 chieu: ";
            for (int i = 0; i < 5; i++) {
                cout << arr[i] << " ";
            }

            cout << "\\n\\nMang 2 chieu:\\n";
            int matrix[2][3] = { {1,2,3}, {4,5,6} };

            for (int i = 0; i < 2; i++) {
                for (int j = 0; j < 3; j++) {
                    cout << matrix[i][j] << " ";
                }
                cout << endl;
            }

            return 0;
        }
    `;
</script>

<div class="wrapper">
	<h1>📘 Single & Multidimensional Arrays trong C++</h1>
	<h2>1. 👉 Array là gì?</h2>
	<div class="p">
		Array (mảng) là <strong>tập hợp nhiều phần tử cùng kiểu dữ liệu</strong>, được lưu
		<strong>liên tiếp trên bộ nhớ</strong>. Mỗi phần tử được truy cập thông qua
		<strong>chỉ số (index)</strong>
		bắt đầu từ <strong>0</strong>.
	</div>
	<h2>2. 📌 One Dimensional Array (Mảng 1 chiều)</h2>
	<div class="p"><strong>✔️ Khai báo:</strong></div>
	<CodeBlock
		code={`
        int a[5];          // mảng 5 phần tử, chưa gán giá trị
        int b[5] = {1,2,3,4,5}; 
    `}
	/>
	<div class="p"><strong>✔️ Truy cập & gán giá trị:</strong></div>
	<CodeBlock
		code={`
        a[0] = 10;
        cout << a[0];
    `}
	/>
	<div class="p"><strong>✔️ Duyệt mảng:</strong></div>
	<CodeBlock
		code={`
        for (int i = 0; i < 5; i++) {
            cout << b[i] << " ";
        }
    `}
	/>
	<div class="p"><strong>🎯 Ứng dụng:</strong></div>
	<ul>
		<li>Lưu danh sách điểm</li>
		<li>Lưu danh sách ID</li>
		<li>Xử lý chuỗi dạng ký tự (char array)</li>
	</ul>
	<h2>3. 📌 Two Dimensional Array (Mảng 2 chiều)</h2>
	<div class="p">Mảng 2 chiều giống như <strong>bảng / ma trận</strong> có hàng và cột.</div>
	<div class="p"><strong>✔️ Khai báo:</strong></div>
	<CodeBlock
		code={`
        int m[3][4];              // ma trận 3 hàng 4 cột
        int n[2][3] = { {1,2,3},
                        {4,5,6} };
    `}
	/>
	<div class="p"><strong>✔️ Truy cập:</strong></div>
	<CodeBlock
		code={`
        cout << n[1][2];   // hàng 1, cột 2 → 6
    `}
	/>
	<div class="p"><strong>✔️ Duyệt ma trận:</strong></div>
	<CodeBlock
		code={`
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 3; j++) {
                cout << n[i][j] << " ";
            }
            cout << endl;
        }
    `}
	/>
	<div class="p"><strong>🎯 Ứng dụng:</strong></div>
	<ul>
		<li>Lưu bảng điểm</li>
		<li>Lưu ma trận trong toán học</li>
		<li>Bản đồ game 2D (tile map)</li>
	</ul>
	<h2>4. 📘 Ví dụ hoàn chỉnh (One + Two Dimensional Array)</h2>
	<CodeBlock code={codeArr1And2D} />
	<div class="p"><strong>✔️ Kết luận</strong></div>
	<ul>
		<li>Mảng 1 chiều: lưu danh sách tuyến tính</li>
		<li>Mảng 2 chiều: lưu dạng bảng, ma trận</li>
		<li>Truy cập bằng chỉ số, size cố định</li>
		<li>Duyệt bằng vòng lặp</li>
	</ul>
</div>
