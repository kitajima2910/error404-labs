#include <stdio.h>
#include <string.h>

typedef struct {
    int ma;
    char ten[50];
    char ngaySinh[20];
    float d1, d2, d3;
    float tong;
} ThiSinh;

int main() {
	
	int n;
    ThiSinh a[100];
    
    scanf("%d", &n);
    getchar();
    
    for (int i = 0; i < n; i++) {
    	a[i].ma = i + 1;
    	
    	fgets(a[i].ten, 50, stdin);
        a[i].ten[strcspn(a[i].ten, "\n")] = '\0';
        
        fgets(a[i].ngaySinh, 20, stdin);
        a[i].ngaySinh[strcspn(a[i].ngaySinh, "\n")] = '\0';
        
        scanf("%f %f %f", &a[i].d1, &a[i].d2, &a[i].d3);
        getchar();

        a[i].tong = a[i].d1 + a[i].d2 + a[i].d3;
	}
	
	for (int i = 0; i < n - 1; i++) {
        for (int j = i + 1; j < n; j++) {
            if (a[i].tong < a[j].tong) {
                ThiSinh temp = a[i];
                a[i] = a[j];
                a[j] = temp;
            }
        }
    }
    
    for (int i = 0; i < n; i++) {
        printf("%-5d %-20s %-12s %8.2f\n", a[i].ma, a[i].ten, a[i].ngaySinh, a[i].tong);
    }
	
	return 0;
}