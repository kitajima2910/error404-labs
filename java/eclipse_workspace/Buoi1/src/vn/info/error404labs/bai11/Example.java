package vn.info.error404labs.bai11;

import java.util.Scanner;

public class Example {

	private Scanner sc = new Scanner(System.in);
	
	public static void main(String[] args) {

		Example ex = new Example();
		
		int a = ex.nhapInt("Nhap a: ");
		int b = ex.nhapInt("Nhap b: ");
		
		ex.tinhPhuongTrinhBacNhat(a, b);
		
	}
	
	public int nhapInt(String label) {
		while(true) {
			try {
				System.out.print(label);
				return Integer.valueOf(sc.nextLine());
			} catch (Exception e) {
				System.out.println("\nVui long nhap dung dinh dang!");
			}
		}
	}
	
	// ax + b = 0
	public void tinhPhuongTrinhBacNhat(int a, int b) {
		if(a == 0) {
			if(b == 0) {
				System.out.println("Phuong trinh vo so nghiem");
			} else {
				System.out.println("Phuong trinh vo nghiem");
			}
		} else {
			float x = -b / (a * 1.0f);
			System.out.printf("x = %.2f", x);
		}
	}

}
