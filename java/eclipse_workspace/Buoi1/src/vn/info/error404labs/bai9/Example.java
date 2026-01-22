package vn.info.error404labs.bai9;

import java.util.Scanner;

public class Example {

	private Scanner sc = new Scanner(System.in);
	
	public static void main(String[] args) {
		
		Example ex = new Example();
		
		int n = ex.nhapInt("Nhap n: ");
		
		ex.lietKeSoNguyenToBeHonN(n);
		
	}
	
	public int nhapInt(String label) {
		while(true) {
			try {
				System.out.print(label);
				int n = Integer.valueOf(sc.nextLine());
				
				if(n <= 0) {
					System.out.println("\nVui long nhap so nguyen duong (> 0)!");
				} else {
					return n;
				}
			} catch (Exception e) {
				System.out.println("\nVui long nhap dung dinh dang so nguyen duong!");
			}
		}
	}
	
	public boolean kiemTraSoNguyenTo(int n) {
		if(n < 2) {
			return false;
		}
		
		if(n == 2) {
			return true;
		}
		
		if(n % 2 == 0) {
			return false;
		}
		
		for(int i = 3; i <= n / i; i += 2) {
			if(n % i == 0) {
				return false;
			}
		}
		
		return true;
	}
	
	public void lietKeSoNguyenToBeHonN(int n) {
		System.out.println("\nCac so nguyen to nho hon " + n + ":");
		for(int i = 2; i < n; i++) {
			if(kiemTraSoNguyenTo(i)) {
				System.out.print(i + " ");
			}
		}
	}
	
}
