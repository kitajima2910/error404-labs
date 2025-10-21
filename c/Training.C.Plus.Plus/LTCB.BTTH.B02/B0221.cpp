using namespace std;

#include <iostream>

int main()
{
    /*
        ax + b = 0

        a = 0 & b = 0 => phương trình vô số nghiệm
        a = 0 & b != 0 => phương trình vô nghiệm

        a != 0 => x = -b / a

        ✔ Trường hợp 1: Có 1 nghiệm duy nhất (a ≠ 0)
        | a    | b   | Nghiệm x |
        | ---- | --- | -------- |
        | 1    | 2   | -2       |
        | 2    | 4   | -2       |
        | -3   | 9   | -3       |
        | 5    | -15 | 3        |
        | 0.5  | 7   | -14      |
        | -0.2 | 1   | -5       |

        ✔ Trường hợp 2: Vô số nghiệm (a = 0, b = 0)
        | a | b |
        | - | - |
        | 0 | 0 |

        ✔ Trường hợp 3: Vô nghiệm (a = 0, b ≠ 0)
        | a | b   |
        | - | --- |
        | 0 | 1   |
        | 0 | -5  |
        | 0 | 100 |
    */

    double a, b;

    cout << "Nhập a = ";
    cin >> a;
    cout << "Nhập b = ";
    cin >> b;

    if (a == 0)
    {
        if (b == 0)
        {
            cout << "Phương trình vô số nghiệm";
        }
        else if (b != 0)
        {
            cout << "Phương trình vô nghiệm";
        }
    }
    else if (a != 0)
    {
        cout << "x = " << -b / a;
    }

    return 0;
}