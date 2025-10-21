using namespace std;

#include <iostream>
#include <cmath>

int main()
{

    long a, b;

    cout << "Nhap a: ";
    cin >> a;
    cout << "Nhap b: ";
    cin >> b;

    // long ketQua = (a + b) * (a + b);
    long ketQua = pow((a + b), 2.0f);

    cout << "Kết quả: " << ketQua;

    return 0;
}