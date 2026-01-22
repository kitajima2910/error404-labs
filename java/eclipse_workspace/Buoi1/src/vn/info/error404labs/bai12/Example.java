package vn.info.error404labs.bai12;

import java.util.Scanner;

public class Example {

    private Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {

        Example ex = new Example();

        int a = ex.nhapInt("Nhap a: ");
        int b = ex.nhapInt("Nhap b: ");
        int c = ex.nhapInt("Nhap c: ");

        ex.tinhPhuongTrinhBacHai(a, b, c);
    }

    public int nhapInt(String label) {
        while (true) {
            try {
                System.out.print(label);
                return Integer.parseInt(sc.nextLine());
            } catch (Exception e) {
                System.out.println("Vui long nhap so nguyen!");
            }
        }
    }

    // ax^2 + bx + c = 0
    public void tinhPhuongTrinhBacHai(int a, int b, int c) {

        if (a == 0) {
            // bx + c = 0
            if (b == 0) {
                if (c == 0) {
                    System.out.println("Phuong trinh vo so nghiem");
                } else {
                    System.out.println("Phuong trinh vo nghiem");
                }
            } else {
                double x = -1.0 * c / b;
                System.out.printf("Phuong trinh bac nhat, x = %.2f\n", x);
            }
            return;
        }
        
        /*
		 	delta = b^2 - 4 * a * c
		 	delta < 0: Phuong trinh vo nghiem
		 	delta = 0: Phuong trinh nghiem kep x1 = x2 = -b / (2 * a)
		 	delta > 0: Phuong trinh co hai nghiem:
		 		x1 = (-b + sqrt(delta)) / (2 * a)
		 		x2 = (-b - sqrt(delta)) / (2 * a)
		 */

        double delta = b * b - 4.0 * a * c;

        if (delta < 0) {
            System.out.println("Phuong trinh vo nghiem");
        } else if (delta == 0) {
            double x = -1.0 * b / (2 * a);
            System.out.printf("Phuong trinh co nghiem kep x1 = x2 = %.2f\n", x);
        } else {
            double x1 = (-b + Math.sqrt(delta)) / (2 * a);
            double x2 = (-b - Math.sqrt(delta)) / (2 * a);

            System.out.printf("x1 = %.2f\n", x1);
            System.out.printf("x2 = %.2f\n", x2);
        }
    }
}
