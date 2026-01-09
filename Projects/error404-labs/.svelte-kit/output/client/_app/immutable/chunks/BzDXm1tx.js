import{f as v,a as b}from"./1ECRtOeo.js";import"./DCRZB7lX.js";import{s as n,c as u,r as l}from"./BlOM0YrC.js";/* empty css        */import{C as i}from"./y0KBGaBm.js";var y=v(`<div class="wrapper"><h1>🧩 Arrays trong C++</h1> <h2>🎯 Mục tiêu bài học</h2> <div class="p">Sau bài học này, học viên sẽ:</div> <ul><li>Hiểu <strong>mảng (array)</strong> là gì trong C++.</li> <li>Biết <strong>khai báo – khởi tạo – truy cập – duyệt mảng</strong>.</li> <li>Biết dùng mảng với <strong>vòng lặp for</strong>.</li> <li>Áp dụng được vào ví dụ thực tế.</li></ul> <h2>1️⃣ Arrays là gì?</h2> <div class="p"><strong>Array (mảng)</strong> là một tập hợp nhiều phần tử <strong>cùng kiểu dữ liệu</strong>,
		được lưu trong các ô nhớ liên tiếp và truy cập bằng <strong>chỉ số (index)</strong>.</div> <ul><li>Index bắt đầu từ <strong>0 → n-1</strong>.</li></ul> <div class="p">Ví dụ: mảng <span class="code">int a[5]</span> có 5 phần tử → index 0 → 4.</div> <h2>2️⃣ Khai báo mảng</h2> <!> <div class="p">Điều này tạo ra mảng gồm 5 số nguyên.</div> <h2>3️⃣ Khởi tạo mảng</h2> <div class="p"><strong>Cách 1: Khởi tạo khi khai báo</strong></div> <!> <div class="p"><strong>Cách 2: Khởi tạo một phần</strong></div> <!> <h2>4️⃣ Truy cập phần tử</h2> <div class="p">Dùng index:</div> <!> <h2>5️⃣ Duyệt mảng bằng vòng lặp</h2> <!> <h2>6️⃣ Ví dụ đầy đủ</h2> <!> <div class="p"><strong>📌 Kết quả:</strong></div> <!> <h2>7️⃣ Bài tập nhanh</h2> <div class="p">Cho mảng:</div> <!> <div class="p">❓ Hãy viết chương trình in ra tổng của tất cả phần tử trong mảng.</div> <details><summary>Xem Code</summary> <!></details></div>`);function B(m){var t=y(),r=n(u(t),18);i(r,{code:"int numbers[5];"});var o=n(r,8);i(o,{code:`
        int numbers[5] = {1, 2, 3, 4, 5};
    `});var s=n(o,4);i(s,{code:`
        int a[5] = {10, 20};   // các phần tử còn lại = 0
    `});var a=n(s,6);i(a,{code:`
        cout << numbers[0];   // in phần tử đầu tiên
        numbers[2] = 50;      // gán phần tử thứ 3 thành 50
    `});var d=n(a,4);i(d,{code:`
        for (int i = 0; i < 5; i++) {
            cout << numbers[i] << " ";
        }
    `});var c=n(d,4);i(c,{code:`
        #include <iostream>
        using namespace std;

        int main() {
            int a[5] = {1, 3, 5, 7, 9};

            cout << "Cac phan tu trong mang: ";
            for (int i = 0; i < 5; i++) {
                cout << a[i] << " ";
            }

            return 0;
        }
    `});var g=n(c,4);i(g,{code:"Cac phan tu trong mang: 1 3 5 7 9"});var h=n(g,6);i(h,{code:`
        int b[4] = {10, 20, 30, 40};
    `});var e=n(h,4),p=n(u(e),2);i(p,{code:`
            using namespace std;
            #include <iostream>

            int main() {
                
                int b[4] = {10, 20, 30, 40};
                
                int sum = 0;
                
                for (int i = 0; i < 4; i++) {
                    sum += b[i];
                }
                
                cout << "Sum = " << sum << endl;
                
                return 0;
            }
        `}),l(e),l(t),b(m,t)}export{B as default};
