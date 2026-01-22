package vn.info.error404labs.bai10;

import java.util.Scanner;

public class Example {
	
	private Scanner sc = new Scanner(System.in);

	public static void main(String[] args) {
		
		Example ex = new Example();
		
		int n = ex.nhapInt("Nhap n: ");
		
		ex.tinhTong(n);
		
	}
	
	public int nhapInt(String label) {
		while(true) {
			try {
				System.out.print(label);
				int n = Integer.valueOf(sc.nextLine());
				
				if(n <= 0) {
					System.out.println("\nVui long nhap so lon hon 0!");
					continue;
				}
				
				return n;
				
			} catch (Exception e) {
				System.out.println("\nVui long nhap dung dinh dang!");
			}
		}
	}
	
	public void tinhTong(int n) {
		
		int tongChan = 0;
		int tongLe = 0;
		
		for(int i = 1; i < n; i++) {
			if(i % 2 == 0) {
				tongChan += i;
			} else {
				tongLe += i;
			}
		}
		
		System.out.println("\nTong chan: " + tongChan);
		System.out.println("Tong le: " + tongLe);
	}

}
