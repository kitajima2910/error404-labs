using namespace std;

#include <iostream>
#include <algorithm>

int main()
{
    long long n, sum = 0;

    while (true)
    {

        do
        {
            cout << "Nhập n = ";
            cin >> n;
            if (n < 1)
            {
                cout << "Nhập n > 0!\n\n";
            }
        } while (n < 1);

        sum += n;

        if (sum > 100)
        {
            break;
        }
    }

    cout << "Sum = " << sum;

    return 0;
}