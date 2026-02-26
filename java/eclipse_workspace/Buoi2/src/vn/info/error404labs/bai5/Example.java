package vn.info.error404labs.bai5;

public class Example {

	public static void main(String[] args) {
		
		int count = 0;
		int sum = 0;
		
		for(int i = 2; count != 10; i += 2, count++) {
			
			sum += i;
			
		}
		
		System.out.println("Tổng: " + sum);
		
	}

}
