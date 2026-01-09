import{f as c,a as r}from"./1ECRtOeo.js";import"./DCRZB7lX.js";import{s,c as o,n as e,r as d}from"./BlOM0YrC.js";/* empty css        */import{C as i}from"./y0KBGaBm.js";var u=c(`<div class="wrapper"><h1>🎓 Strings in C++ with Examples</h1> <h2>1. Khái niệm về String trong C++</h2> <div class="p">Trong C++, string có <strong>2 cách biểu diễn phổ biến</strong>:</div> <div class="p"><strong>✔ 1. Chuỗi ký tự kiểu C (Character Array – C-Style String)</strong></div> <ul><li>Là mảng ký tự: <span class="code">char arr[] = "Hello";</span></li> <li>Kết thúc bằng ký tự đặc biệt <span class="code">'\\0'</span> (null-terminator).</li> <li>Phải tự quản lý kích thước mảng.</li></ul> <div class="p">2. Chuỗi dùng lớp <span class="code">std::string</span> của C++</div> <ul><li>Thuộc thư viện <span class="code">&lt;string&gt;</span>.</li> <li>Dễ dùng, mạnh mẽ, tự động quản lý bộ nhớ.</li> <li>Có nhiều hàm tiện ích: <span class="code">length()</span>, <span class="code">substr()</span>, <span class="code">find()</span>, <span class="code">append()</span>, ...</li></ul> <h2>2. Ví dụ minh họa – Character Array (C-Style String)</h2> <!> <div class="p"><strong>📌 Ghi nhớ:</strong></div> <ul><li>Chuỗi dạng <span class="code">char[]</span> <strong>cố định kích thước</strong>.</li> <li>Không thể gán trực tiếp kiểu mảng như: <span class="code">name = "Hi";</span> (sai).</li> <li>Dễ bị tràn bộ nhớ nếu không cẩn thận.</li></ul> <h2>3. Ví dụ minh họa – std::string</h2> <!> <div class="p"><strong>📌 Ghi nhớ:</strong></div> <ul><li><span class="code">std::string</span> hỗ trợ <strong>toán tử +</strong> để nối chuỗi.</li> <li>Dùng <span class="code">length()</span>, <span class="code">size()</span> để lấy độ dài.</li> <li>Dễ dùng, an toàn hơn rất nhiều so với mảng char.</li></ul> <h2>4. So sánh nhanh</h2> <!> <h2>5. Khi nào dùng cái nào?</h2> <ul><li>Dùng <span class="code">std::string</span> trong <strong>hầu hết</strong> trường hợp.</li> <li>Dùng <span class="code">char[]</span> khi làm việc với: <ul><li>API cũ, thư viện C</li> <li>Xử lý chuỗi siêu tối ưu trong hệ thống nhúng</li></ul></li></ul></div>`);function k(l){var n=u(),t=s(o(n),16);i(t,{code:`
		#include <iostream>
		using namespace std;

		int main() {
			char name[20] = "Hello C++"; // chuỗi C-style

			cout << "Chuoi: " << name << endl;
			cout << "Ky tu dau: " << name[0] << endl;

			// thay đổi 1 ký tự
			name[6] = 'C';
			name[7] = '+';
			name[8] = '+';

			cout << "Chuoi sau khi sua: " << name << endl;

			return 0;
		}
	`});var a=s(t,8);i(a,{code:`
		#include <iostream>
		#include <string>
		using namespace std;

		int main() {
			string s = "Hello C++";

			cout << "Chuoi: " << s << endl;
			cout << "Do dai: " << s.length() << endl;

			// nối chuỗi
			s += " Programming";

			// lấy chuỗi con
			string sub = s.substr(6, 3); // từ vị trí 6 lấy 3 ký tự

			cout << "Chuoi sau khi noi: " << s << endl;
			cout << "Chuoi con: " << sub << endl;

			return 0;
		}
	`});var h=s(a,8);i(h,{code:`
		| Tiêu chí                 | Character Array 	| std::string         		|
		| ------------------------ | --------------- 	| ------------------- 		|
		| Dễ dùng                  | ❌ Khó          	| ✅ Dễ                		|
		| An toàn bộ nhớ           | ❌ Thấp          	| ✅ Cao                	|
		| thao tác (cắt, nối, tìm) | ❌ Phức tạp      	| ✅ Có sẵn hàm hỗ trợ 		|
		| Quản lý kích thước       | Cố định         	| Tự động              		|
	`}),e(4),d(n),r(l,n)}export{k as default};
