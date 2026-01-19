package vn.info.error404labs.bai3;

import java.util.Scanner;

public class VD {
	
	@SuppressWarnings("resource")
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		Scanner sc = new Scanner(System.in);
		
		System.out.print("Nhap ma sinh vien: ");
		String masv = sc.nextLine();
		
		System.out.print("Nhap ho ten: ");
		String hoTen = sc.nextLine();
		
		System.out.print("Nhap tuoi: ");
		int tuoi = Integer.valueOf(sc.nextLine());
		
		System.out.print("Nhap nam sinh: ");
		int namSinh = Integer.valueOf(sc.nextLine());
		
		System.out.print("Nhap diem trung binh: ");
		double diemTrungBinh = Double.valueOf(sc.nextLine());
		
		System.out.printf("\n%-20s %-20s %-15s %-15s %-20s\n", "MSV", "Ho & Ten", "Tuoi", "Nam Sinh", "Diem Trung Binh");
		System.out.printf("%-20s %-20s %-15d %-15d %-20.2f", masv, hoTen, tuoi, namSinh, diemTrungBinh);
		
	}

}
