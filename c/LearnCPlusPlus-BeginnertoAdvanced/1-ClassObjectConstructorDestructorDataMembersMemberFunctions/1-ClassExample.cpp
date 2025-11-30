using namespace std;
#include <iostream>

class Sample {
	
	private:
		int a, b;
	
	public:
	
		Sample() {
			a = 10;
			b = 5;
			cout << "Constructor mac dinh\n";
			showData();
		}
		
		Sample(int x, int y) {
			a = x;
			b = y;
			cout << "Constructor co tham so\n";
			showData();
		}
		
		~Sample() {
			cout << "Destructor\n";
		}
	
		void getData() {
			cout << "Nhap so dau tien: ";
			cin >> a;
			
			cout << "Nhap so thu hai: ";
			cin >> b;
		}
	
		void showData() {
			cout << "Gia tri a = " << a << endl;
			cout << "Gia tri b = " << b << endl;
		}
	
};

int main() {
	

	// Vi du 1: getData, showData
	/*
	Sample s1;
	s1.getData();
	s1.showData();
	*/
	
	// Vi du 2: showData trong constructor mac dinh
	Sample s2;
	
	// Vi du 3: showData trong constructor co tham so
	Sample s3(7, 8);

    return 0;

}