using namespace std;

#include <iostream>

int main()
{
    int soThuNhat;
    int soThuHai;
    cout << "Nhập số thứ nhất: ";
    cin >> soThuNhat;
    cout << "Nhập số thứ hai : ";
    cin >> soThuHai;

    int tong = soThuNhat + soThuHai;
    int tich = soThuNhat * soThuHai;

    cout << endl;
    cout << soThuNhat << " + " << soThuHai << " = " << tong << endl;
    cout << soThuNhat << " x " << soThuHai << " = " << tich;

    return 0;
}