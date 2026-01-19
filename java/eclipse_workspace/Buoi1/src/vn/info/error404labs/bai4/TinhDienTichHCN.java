package vn.info.error404labs.bai4;

import java.util.Scanner;

public class TinhDienTichHCN {
	
	@SuppressWarnings("resource")
	public float nhapSo() {
		float n;
		Scanner sc = new Scanner(System.in);
		n = Float.valueOf(sc.nextLine());
		return n;
	}
	
	public float tinhDienTich(float d, float r) {
		float S;
		S = d * r;
		return S;
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		TinhDienTichHCN hcn = new TinhDienTichHCN();
		
		System.out.print("Nhap chieu dai: ");
		float dai = hcn.nhapSo();
		
		System.out.print("Nhap chieu rong: ");
		float rong = hcn.nhapSo();
		
		float dienTich = hcn.tinhDienTich(dai, rong);
		System.out.print("Dien tich: " + dienTich);	
		
	}

}
