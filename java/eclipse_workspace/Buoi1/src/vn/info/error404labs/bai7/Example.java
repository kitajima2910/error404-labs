package vn.info.error404labs.bai7;

import java.util.Scanner;

public class Example {

    // Scanner dùng chung cho cả class, chỉ tạo 1 lần
    private Scanner sc = new Scanner(System.in);

    /**
     * Hàm nhập số nguyên an toàn
     * - Luôn dùng nextLine() để tránh lỗi trôi lệnh
     * - Nếu nhập sai sẽ yêu cầu nhập lại
     */
    public int inputInt(String label) {
        while (true) { // Lặp cho đến khi người dùng nhập đúng
            try {
                System.out.print(label); // Hiển thị nội dung yêu cầu nhập
                return Integer.valueOf(sc.nextLine()); // Đọc chuỗi và chuyển sang số nguyên
            } catch (Exception e) {
                // Bắt mọi lỗi khi người dùng nhập sai dữ liệu
                System.out.println("Vui lòng nhập số nguyên!");
            }
        }
    }

    public static void main(String[] args) {

        // Tạo đối tượng để gọi các phương thức không static
        Example ex = new Example();

        // Nhập dữ liệu từ bàn phím
        int n = ex.inputInt("Nhập n: ");
        int m = ex.inputInt("Nhập m: ");

        System.out.println("\n======== KẾT QUẢ ========");

        // Tính căn bậc hai của n
        if (n < 0) {
            // Math.sqrt không tính được với số âm
            System.out.printf("Math.sqrt(%d) = Không tính được (số âm)\n", n);
        } else {
            // Nếu n >= 0 thì tính bình thường
            System.out.printf("Math.sqrt(%d) = %.2f\n", n, Math.sqrt(n));
        }

        // Tính lũy thừa n mũ m
        System.out.printf("Math.pow(%d, %d) = %.2f\n", n, m, Math.pow(n, m));

        // Tìm số lớn nhất giữa n và m
        System.out.printf("Math.max(%d, %d) = %d\n", n, m, Math.max(n, m));

        // Tìm số nhỏ nhất giữa n và m
        System.out.printf("Math.min(%d, %d) = %d\n", n, m, Math.min(n, m));
    }
}
