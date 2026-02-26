package vn.info.error404labs.bai10;

import java.util.Scanner;

public class Example {

	static Scanner sc = new Scanner(System.in);
	
	static int nhap(String label, int mau) {
		while(true) {
			try {
				System.out.print(label);
				int n = Integer.parseInt(sc.nextLine());
				
				if(n == 0 && mau == 1) {
					System.out.println("\nMẫu số không thể bằng 0. Vui lòng nhập lại!");
					continue;
				}
				
				return n;
			} catch (Exception e) {
				System.out.println("\nVui lòng nhập đúng định dạng!");
			}
		}
	}
	
	static int UCLN(int a, int b) {
		
		a = a < 0 ? a * -1 : a;
		b = b < 0 ? b * -1 : b;
		
		while(b != 0) {
			int r = a % b;
			a = b;
			b = r;
		}
		
		return a;
		
	}
	
	public static void main(String[] args) {
		int n = nhap("Nhập tử số: ", 0);
		int m = nhap("Nhập mẫu số: ", 1);
		
		int ucln = UCLN(n, m);
		
		n = n / ucln;
		m = m / ucln;
		
		if(m < 0) {
			n = -n;
			m = -m;
		}
		
		System.out.printf("\n%d \\ %d", n, m);
	}

}
