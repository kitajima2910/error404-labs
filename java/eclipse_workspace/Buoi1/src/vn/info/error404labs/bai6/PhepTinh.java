package vn.info.error404labs.bai6;

import java.util.Scanner;

public class PhepTinh {
	
	@SuppressWarnings("resource")
	public int nhapSo() {
		Scanner sc = new Scanner(System.in);
		return Integer.valueOf(sc.nextLine());
	}
	
	@SuppressWarnings("resource")
	public char nhapPhepTinh() {
		Scanner sc = new Scanner(System.in);
		return sc.nextLine().charAt(0);
	}
	
	public void tinhToan(int a, int b, char opt) {
		switch(opt) {
			case '+':
				System.out.printf("%d %c %d = %d", a, opt, b, a + b);
				break;
			case '-':
				System.out.printf("%d %c %d = %d", a, opt, b, a - b);
				break;
			case '*':
				System.out.printf("%d %c %d = %d", a, opt, b, a * b);
				break;
			case '/':
				if (b == 0) {
					System.out.println("Khong duoc chia cho 0");
				} else {
					System.out.printf("%d %c %d = %.2f", a, opt, b, 1.0 * a / b);
				}
				break;
		}
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		PhepTinh pt = new PhepTinh();
		
		System.out.print("Nhap a: ");
		int a = pt.nhapSo();
		
		System.out.print("Nhap b: ");
		int b = pt.nhapSo();
		
		System.out.print("Nhap phep tinh: ");
		char opt = pt.nhapPhepTinh();
		
		pt.tinhToan(a, b, opt);
		
	}

}
