using namespace std;

#include <iostream>

int main()
{

    double d, r;

    cout << "Chiều dài : ";
    cin >> d;
    cout << "Chiều rộng: ";
    cin >> r;

    cout << "Chu vi hình chữ nhật   : " << (d + r) * 2 << "\n";
    cout << "Diện tích hình chữ nhật: " << (d * r);

    return 0;
}