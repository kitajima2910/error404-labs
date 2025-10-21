using namespace std;

#include <iostream>

int main()
{
    // 2x + 3y = 5

    for (int x = -10; x <= 10; x++)
    {
        for (int y = -5; y <= 5; y++)
        {
            if (2 * x + 3 * y == 5)
            {
                cout << "[" << x << ", " << y << "]\n";
            }
        }
    }

    return 0;
}