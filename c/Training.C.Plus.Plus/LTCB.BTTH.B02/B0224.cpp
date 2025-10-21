using namespace std;

#include <iostream>
#include <cmath>

int main()
{
    int n;

    do
    {
        cout << "Nhập vào số n > 0: ";
        cin >> n;
        if (n <= 0)
        {
            cout << "Nhập n > 0!\n";
        }
    } while (n <= 0);

    bool flag = true;

    if (n < 2)
        flag = false;
    else if (n == 2)
        flag = true;
    else if (n % 2 == 0)
        flag = false;
    else
    {
        for (int i = 3; i <= sqrt(n); i += 2)
        {
            if (n % i == 0)
            {
                flag = false;
                break;
            }
        }
    }

    if (flag)
        cout << "Là số nguyên tố";
    else
        cout << "Không là số nguyên tố";
    return 0;
}