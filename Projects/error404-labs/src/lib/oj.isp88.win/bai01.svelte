<script lang="ts">
	import CodeBlock from '../../components/CodeBlock.svelte';
	import './../huong-dan-hoc.css';

	const code: string = `
        #include <stdio.h>

        long long demSoDoiXung(int n) {
            if (n == 1) {
                return 9;
            }
            
            int motNua = (n + 1) / 2;
            long long ketQua = 9;
            int i;
            for (i = 1; i < motNua; i++) {
                ketQua *= 10;
            } 
            
            return ketQua;
        }

        int main() {
            
            int n;
            while(scanf("%d", &n) == 1) {
                printf("%lld\\n", demSoDoiXung(n));
            }
            
            return 0;
        }
    `;
</script>

<div class="wrapper">
	<h1>MC12 - Số đối xứng</h1>
	<a
		href="https://oj.isp88.win/p/MC12"
		target="_blank"
		style="margin-bottom: 1rem; display: inline-block">MC12 - So doi xung</a
	>
	<details>
		<summary>Xem Code</summary>
		<CodeBlock {code} />
	</details>
	<h2>🎯 Bài toán yêu cầu gì?</h2>
	<div class="p">Bạn cần đếm xem có bao nhiêu số đối xứng (palindrome) có n chữ số</div>
	<div class="p">(n nằm trong khoảng 1 đến 15).</div>
	<div class="p">Số đối xứng nghĩa là viết xuôi hay ngược đều như nhau.</div>
	<div class="p">Ví dụ:</div>
	<ul>
		<li>1, 2, 3, …, 9 → đều đối xứng</li>
		<li>11, 22, 33 → đối xứng</li>
		<li>121, 232, 999 → đối xứng</li>
		<li>12321 → đối xứng</li>
	</ul>
	<h2>✔️ Cách đếm nhanh — Tư duy</h2>
	<div class="p"><strong>👀 1. Số n chữ số: chữ số đầu tiên không thể là 0</strong></div>
	<div class="p">Ví dụ n = 3 → _ _ _</div>
	<ul>
		<li>Chữ đầu tiên phải từ 1 → 9 (9 cách).</li>
		<li>Các chữ còn lại có thể từ 0 → 9.</li>
	</ul>
	<div class="p">Nhưng vì là đối xứng, ta chỉ cần chọn nửa số bên trái, bên phải tự đối xứng.</div>
	<h2>🔍 Chia trường hợp</h2>
	<div class="p"><strong>✔️ Nếu n là số lẻ</strong></div>
	<div class="p">Ví dụ n = 5:</div>
	<CodeBlock
		code={`
        _ _ _ _ _
        | | | | |
        1 2 3 2 1 ← tự đối xứng
    `}
	/>
	<div class="p">Ta chỉ cần chọn 3 số đầu tiên (lấy lên đến giữa):</div>
	<ul>
		<li>Chỗ 1: 1 → 9 (9 cách)</li>
		<li>Chỗ 2: 0 → 9 (10 cách)</li>
		<li>Chỗ 3: 0 → 9 (10 cách)</li>
	</ul>
	<div class="p">→ Tổng = 9 x 10<sup>(n-1)/2</sup></div>
	<div class="p"><strong>✔️ Nếu n là số chẵn</strong></div>
	<div class="p">Ví dụ n = 4:</div>
	<CodeBlock
		code={`
        _ _ _ _
        | | | |
        1 2 2 1
    `}
	/>
	<div class="p">Ta chỉ cần chọn 2 số đầu tiên:</div>
	<ul>
		<li>Chỗ 1: 1 → 9 (9 cách)</li>
		<li>Chỗ 2: 0 → 9 (10 cách)</li>
	</ul>
	<div class="p">→ Tổng = 9 x 10<sup>(n/2-1)</sup> = 9 x 10<sup>(n-1)/2</sup></div>
	<h2>⭐ Rút gọn cho cả 2 trường hợp:</h2>
	<div class="p">Số palindrome có n chữ số = 9 x 10<sup>(n-1)/2</sup></div>
	<h2>📌 Ví dụ dễ hiểu</h2>
	<CodeBlock
		code={`
        ####################################
        n = 1

        Chỉ có 1 chữ số → 1,2,3,...,9 → 9 số
        Công thức:
        9 × 10^0 = 9
        
        ####################################
        n = 2

        Các dạng:
        11, 22, 33, ..., 99 → 9 số
        Công thức:
        9 × 10^0 = 9

        ####################################
        n = 3

        Các dạng:
        101, 111, 121, ..., 999 → 90 số
        Công thức:
        9 × 10^1 = 90
    `}
	/>
</div>
