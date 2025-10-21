using namespace std;

#include <iostream>
#include <cmath>

int main()
{

    double R;

    cout << "Nhập bán kính R: ";
    cin >> R;

    double chuViHinhTron = 3.14 * 2 * R;
    double dienTichHinhTron = 3.14 * R * R;

    printf("Chu vi hình tròn: %.2f\n", round(chuViHinhTron * 100) / 100);
    printf("Diện tích hình tròn: %.2f\n", round(dienTichHinhTron * 100) / 100);

    // round to even
    // printf("%.2f\n", round(19.625 * 100) / 100);
    // printf("%.2f", 19.635);

    return 0;
}