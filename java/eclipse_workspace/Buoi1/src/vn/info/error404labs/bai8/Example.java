package vn.info.error404labs.bai8;

import java.util.Scanner;

public class Example {

	private Scanner sc = new Scanner(System.in);

	// Hàm nhập số nguyên (cho phép số âm)
	public int nhapInt(String label) {
		while (true) {
			try {
				System.out.print(label);
				return Integer.parseInt(sc.nextLine());
			} catch (Exception e) {
				System.out.println("\nVui long nhap dung dinh dang so nguyen!");
			}
		}
	}

	// Hàm tìm USCLN (xử lý cả số âm)
	public int USCLN(int a, int b) {
		a = Math.abs(a);
		b = Math.abs(b);

		// Trường hợp đặc biệt
		if (a == 0 && b == 0) {
			return 0; // không xác định, quy ước trả 0
		}

		while (b != 0) {
			int r = a % b;
			a = b;
			b = r;
		}
		return a; // luôn >= 0
	}

	// Hàm tìm BSCNN (dựa trên USCLN)
	public long BSCNN(int a, int b) {
		if (a == 0 || b == 0) {
			return 0;
		}
		return Math.abs((long) a * b) / USCLN(a, b);
	}

	public static void main(String[] args) {
		Example ex = new Example();

		int a = ex.nhapInt("Nhap a: ");
		int b = ex.nhapInt("Nhap b: ");

		int uscln = ex.USCLN(a, b);
		long bscnn = ex.BSCNN(a, b);

		System.out.println();
		System.out.println("USCLN: " + uscln);
		System.out.println("BSCNN: " + bscnn);
	}
}
