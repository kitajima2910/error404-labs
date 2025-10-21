using namespace std;

#include <iostream>

int main()
{
    int n;

    // do {
    //     cout << "Nhập n = "; cin >> n;
    // } while((n < 0 || n > 100) && cout << "Nhập lại n [0, 100]!\n\n");

    do
    {
        cout << "Nhập n = ";
        cin >> n;

        if (n < 0 || n > 100)
        {
            cout << "Nhập lại n [0, 100]!\n\n";
        }
    } while (n < 0 || n > 100);

    cout << "n = " << n;
    return 0;
}