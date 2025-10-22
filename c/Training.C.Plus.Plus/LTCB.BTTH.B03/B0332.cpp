#include <iostream>
using namespace std;

long double toHop(int n, int k)
{
    if (k > n)
        return 0;
    if (k == 0 || k == n)
        return 1;
    if (k == 1 || k == n - 1)
        return n;

    if (k > n - k)
        k = n - k; // tối ưu hoá

    long double result = 1;
    for (int i = 1; i <= k; i++)
    {
        result = result * (n - i + 1) / i;
    }
    return result;
}

int main()
{
    int n, k;

    cout << "Nhap n: ";
    cin >> n;
    cout << "Nhap k: ";
    cin >> k;

    cout << "C(" << n << ", " << k << ") = " << toHop(n, k) << endl;
    return 0;
}
