package vn.info.error404labs.bai8;

import java.util.Scanner;

public class Example {
	
	static Scanner sc = new Scanner(System.in);
	
	static int nhap(String label) {
		while(true) {
			try {
				System.out.print(label);
				return Integer.parseInt(sc.nextLine());
			} catch (Exception e) {
				System.out.println("\nVui lòng nhập đúng định dạng!");
			}
		}
	}

	public static void main(String[] args) {
		
		int n = nhap("Nhập n: ");
		int sum = 0;
		
		for(int i = 1; i <= n; i++) {
			sum += i;
		}
		
		System.out.println(sum);
		
		// n = (số_cuối − số_đầu) / khoảng_cách + 1
		int m = (n - 1) / 1 + 1;
		
		// S = (số_đầu + số_cuối) × n / 2
		int S = (1 + m) * m / 2;
		
		System.out.println(S);

	}

}
