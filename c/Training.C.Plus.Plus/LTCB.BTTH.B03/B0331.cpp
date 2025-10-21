using namespace std;

#include <iostream>

bool laSoHoanHao(long long n);

int main()
{

    long long n;
    cout << "Nhập n: ";
    cin >> n;

    if (laSoHoanHao(n))
    {
        cout << n << " là số hoàn hảo\n";
    }
    else
    {
        cout << n << " không là số hoàn hảo\n";
    }

    return 0;
}

bool laSoHoanHao(long long n)
{
    if (n <= 1)
        return false;

    long long sum = 1;

    for (long long i = 2; i <= n / 2; i++)
    {
        if (n % i == 0)
        {
            sum += i;
        }
    }
    return sum == n;
}