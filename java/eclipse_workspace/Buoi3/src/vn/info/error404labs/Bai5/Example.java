package vn.info.error404labs.Bai5;

public class Example {

	public static void main(String[] args) {

		// 8545624
		int n = 8545624;
		System.out.println(8 % 10);
		System.out.println(8 / 10);

		int sum = 0;

		while (n > 0) {
			int r = n % 10;
			sum += r;
			n /= 10;
		}

		System.out.println(sum);

	}

}
