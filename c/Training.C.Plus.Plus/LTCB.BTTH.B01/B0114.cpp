using namespace std;

#include <iostream>

int main()
{
    int a, b;

    cout << "Nhập số a: ";
    cin >> a;
    cout << "Nhập số b: ";
    cin >> b;

    // float trungBinh = (float)a / b;
    // float trungBinh = a / (float)b;
    float trungBinh = a / (1.0 * b);

    cout << endl;
    cout << "Trung bình cộng: " << trungBinh;

    return 0;
}