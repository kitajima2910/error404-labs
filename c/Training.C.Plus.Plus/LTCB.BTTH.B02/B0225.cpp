using namespace std;

#include <iostream>
#include <cmath>

int main()
{
    int n;

    cout << "Nhập n = ";
    cin >> n;

    if (n < 0)
    {
        cout << "Không phải là số chính phương";
        return 0;
    }

    int soNguyen = sqrt(n);

    if (soNguyen * soNguyen == n)
    {
        cout << "Là số chinh phương";
    }
    else
    {
        cout << "Không phải là số chính phương";
    }
    return 0;
}