#include <iostream>
#include <cmath>
using namespace std;

bool laSoHoanHao(long long n)
{
    if (n <= 1)
        return false;

    long long sum = 1;

    for (long long i = 2; i <= sqrt(n); i++)
    {
        if (n % i == 0)
        {
            sum += i;
            if (i != n / i) // tránh cộng trùng nếu là số chính phương
                sum += n / i;
        }
    }

    return sum == n;
}

int main()
{
    long long n;
    cout << "Nhập n: ";
    cin >> n;

    if (laSoHoanHao(n))
        cout << "So vua nhap la so hoan hao\n";
    else
        cout << "So vua nhap khong phai la so hoan hao\n";

    return 0;
}