package vn.info.error404labs.bai9;

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
		
		// n = (số_cuối − số_đầu) / khoảng_cách + 1
		// S = (số_đầu + số_cuối) × n / 2
		
		// 1 + 3 + 5 + ... + n
		
		
		// 2 + 4 + 6 + ... + m
		
		int n = nhap("Nhập n: ");
		
		int soDau = n % 2 == 1 ? 1 : 2;
		
		int sum = 0;
		
		for(int i = soDau; i <= n; i += 2) {
			sum += i;
		}
		
		System.out.println(sum);
		
		int m = (n - soDau) / 2 + 1;
		int S = (soDau + n) * m / 2;
		
		System.out.println(S);

	}

}
