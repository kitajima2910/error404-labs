package vn.info.error404labs.Bai7;

public class Example {

	public static void main(String[] args) {
		
		// Chuyển hệ 10 -> hệ 2
		// 30(10) -> 11110
		
		int n = 30;
		
		int[] save01 = new int[1000];
		int count = 0;
		
		while(n > 0) {
			int r = n % 2;
			save01[count++] = r;
			
			n /= 2;
		}
		
		System.out.print("Hệ 2: ");
		for (int i = count - 1; i >= 0; i--) {
			System.out.print(save01[i]);
		}
		
		// Chuyển hệ 2 -> hệ 10
		// 11110(2) -> 30
		// 30 = 0*2^0 + 1*2^1 + 1*2^2 + 1*2^3 + 1*2^4
		
		int sum = 0;
		for(int i = 0; i < count; i++) {
			sum += save01[i] * (int)Math.pow(2, i); 
		}
		
		System.out.println("\nHệ 10: " + sum);

	}

}
