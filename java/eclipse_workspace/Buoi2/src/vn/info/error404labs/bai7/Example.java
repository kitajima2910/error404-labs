package vn.info.error404labs.bai7;

public class Example {

	public static void main(String[] args) {
		
		int sum = 0;
		
		for(int i = 5; i <= 100; i += 5) {
			sum += i;
		}
		
		System.out.println(sum);
		
		// n = (số_cuối − số_đầu) / khoảng_cách + 1
		int n = (100 - 5) / 5 + 1;
		
		// S = (số_đầu + số_cuối) × n / 2
		int S = (5 + 100) * n / 2;
		
		System.out.println(S);

	}

}
