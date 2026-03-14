#include <stdio.h>
#include <string.h>

struct SinhVien {
	char ten[50];
	int tuoi;
	float diem;
};

int main() {
	
	struct SinhVien sv;
	char buffer[100];
	
	printf("Nhap ten sinh vien: ");
	fgets(sv.ten, sizeof(sv.ten), stdin);
	sv.ten[strcspn(sv.ten, "\n")] = '\0';
	
	printf("Nhap tuoi: ");
	fgets(buffer, sizeof(buffer), stdin);
	sscanf(buffer, "%d", &sv.tuoi);
	
	printf("Nhap diem: ");
	fgets(buffer, sizeof(buffer), stdin);
	sscanf(buffer, "%f", &sv.diem);
	
	printf("\nThong tin sinh vien\n");
	printf("Ten: %s\n", sv.ten);
	printf("Tuoi: %d\n", sv.tuoi);
	printf("Diem: %.2f\n", sv.diem);
	
	return 0;
}