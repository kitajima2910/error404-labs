package vn.info.error404labs.Bai6;

public class Example {

	public static void main(String[] args) {

		int n = 28;

		for (int i = 2; i <= n / i; i++) {
			while (n % i == 0) {
				System.out.print(i);
				n /= i;
				if (n > 1) {
					System.out.print(" x ");
				}
			}
		}
		
		if(n > 1) {
			System.out.print(n);
		}
	}

}
