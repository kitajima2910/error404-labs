using namespace std;

#include <iostream>

int main()
{
    for (int i = 100; i <= 999; i++)
    {
        int donVi = i % 10;
        int chuc = (i % 100) / 10;
        int tram = i / 100;
        int tich = donVi * chuc * tram;

        if (tich % 9 == 0)
        {
            cout << i << " ";
        }
    }
    return 0;
}