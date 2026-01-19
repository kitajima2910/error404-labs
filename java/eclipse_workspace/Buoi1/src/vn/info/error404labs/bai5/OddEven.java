package vn.info.error404labs.bai5;

import java.util.Scanner;

public class OddEven {
	
	@SuppressWarnings("resource")
	public int nhapSo() {
		int n;
		Scanner sc = new Scanner(System.in);
		n = Integer.valueOf(sc.nextLine());
		return n;
	}
	
	public void kiemTraChanLe(int so) {
		if(so % 2 == 0) {
			System.out.println(so + " la so chan");
		} else {
			System.out.println(so + " la so le");
		}
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		OddEven even = new OddEven();
		
		System.out.print("Nhap so: ");
		int m = even.nhapSo();
		
		even.kiemTraChanLe(m);
	}

}
