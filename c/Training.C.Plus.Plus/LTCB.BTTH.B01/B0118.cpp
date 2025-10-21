using namespace std;

#include <iostream>

int main()
{
    long long n;

    cout << "Nhập n: ";
    cin >> n;

    cout << "Phần nguyên: " << (n / 6) << endl;
    cout << "Phần dư    : " << (n % 6);

    return 0;
}