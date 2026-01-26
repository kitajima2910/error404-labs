package vn.info.error404labs.test;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class Example {

	public static void main(String[] args) {
		BigDecimal a = BigDecimal.valueOf(10);
		BigDecimal b = BigDecimal.valueOf(3);

		// Chia với 2 chữ số sau dấu phẩy
		BigDecimal result = a.divide(
		    b,
		    2,
		    BigDecimal.ROUND_HALF_UP
		);




	}

}
