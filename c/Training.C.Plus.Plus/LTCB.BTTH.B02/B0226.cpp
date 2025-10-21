using namespace std;

#include <iostream>
#include <algorithm>

int main()
{
    long long a, b;

    do
    {
        cout << "Nhập a = ";
        cin >> a;
        if (a < 1)
        {
            cout << "Nhập a > 0!\n\n";
        }
    } while (a < 1);

    do
    {
        cout << "Nhập b = ";
        cin >> b;
        if (b < 1)
        {
            cout << "Nhập b > 0!\n\n";
        }
    } while (b < 1);

    cout << "UCLN = " << __gcd(a, b);

    return 0;
}