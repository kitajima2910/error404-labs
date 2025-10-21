using namespace std;

#include <iostream>
#include <cmath>

int main()
{

    long a, b;

    cout << "Nhập a = ";
    cin >> a;
    cout << "Nhập b = ";
    cin >> b;

    // long tong = a * a + b * b;
    long tong = pow(a, 2.0f) + pow(b, 2.0f);

    cout << "Tong binh phuong = " << tong;

    return 0;
}