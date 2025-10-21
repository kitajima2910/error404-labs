#include <iostream>

using namespace std;

int main()
{

    char kyTu;
    int soNguyen;
    float soThuc;

    cout << "Nhập vào ký tự: ";
    cin >> kyTu;

    cout << "Nhập vào số nguyên: ";
    cin >> soNguyen;

    cout << "Nhập vao số thực: ";
    cin >> soThuc;

    printf("\n");
    printf("Ký tự    :%3c\n", kyTu);
    printf("Số nguyên:%6d\n", soNguyen);
    printf("Số thực  :%8.3f", soThuc);

    // printf("\n%3c%6d%8.3f\n", kyTu, soNguyen, soThuc);

    return 0;
}
