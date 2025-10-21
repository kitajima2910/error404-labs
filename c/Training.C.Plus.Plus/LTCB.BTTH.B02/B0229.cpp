using namespace std;

#include <iostream>

int main()
{
    long long n;

    do
    {

        cout << "Nhập n: ";
        cin >> n;
        if (n < 0)
        {
            cout << "Phải nhập n > 0 !\n\n";
        }

    } while (n < 0);

    long long sum = 0;

    while (n > 0)
    {
        /*
            269
            269 % 10 = 9
        */

        sum = sum * 10 + (n % 10);
        n /= 10;
    }

    cout << sum;

    return 0;
}