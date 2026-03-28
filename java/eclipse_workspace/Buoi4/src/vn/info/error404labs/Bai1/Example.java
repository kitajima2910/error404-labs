package vn.info.error404labs.Bai1;

import java.util.Scanner;

public class Example {
	
	static Scanner sc = new Scanner(System.in);
	
	static int nhapSoNguyen(String label, String condition, int mode) {
		while(true) {
			try {
				System.out.print(label);
				int n = Integer.parseInt(sc.nextLine());
				
				if(n < 1 && mode == 0) {
					System.out.println("\n" + condition);
				}
				
				return n;
			
			} catch (Exception e) {
				System.out.println("\nVui lòng nhập đúng định dạng!");
			}
		}
	}
	
	static void nhapMang(int a[]) {
		for(int i = 0; i < a.length; i++) {
			a[i] = nhapSoNguyen("a[" + i + "] = ", "", 1);
		}
	}
	
	static void xuatMang(int a[], String lable) {
		System.out.println("\n" + lable);
		for(int i = 0; i < a.length; i++) {
			System.out.print(a[i] + " ");
		}
	}
	
	static void sapXepTang(int a[]) {
		for(int i = 0; i < a.length - 1; i++) {
			for(int j = i + 1; j < a.length; j++) {
				if(a[i] > a[j]) {
					int temp = a[i];
					a[i] = a[j];
					a[j] = temp;
				}
			}
		}
	}
	
	static int timMax(int a[]) {
		int max = a[0];
		for(int i = 1; i < a.length; i++) {
			max = a[i] > max ? a[i] : max;
		}
		return max;
	}
	
	static int timMin(int a[]) {
		int min = a[0];
		for(int i = 1; i < a.length; i++) {
			min = a[i] < min ? a[i] : min;
		}
		return min;
	}
	
	
	public static void main(String[] args) {
		int n = nhapSoNguyen("Nhập số nguyên: ", "Vui lòng nhập n > 0!", 0);
		
		int a[] = new int[n];
		
		nhapMang(a);
		xuatMang(a, "Mảng đã nhập:");
		sapXepTang(a);
		xuatMang(a, "Mảng đã sắp xếp tăng:");
		System.out.println("\nMax = " + timMax(a));
		System.out.println("Min = " + timMin(a));
	}
	
}
