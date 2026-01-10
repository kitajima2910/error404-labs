#include <stdio.h>
#include <string.h>

int main() {
    char chuois[1000];
    char tus[100][50];
    int dem[100] = {0};
    int n = 0;

    printf("Nhap chuoi: ");
    fgets(chuois, 1000, stdin);
    chuois[strcspn(chuois, "\n")] = '\0';

	// Tach va luu vao mang tu
    char *p = strtok(chuois, " ");
    while(p != NULL) {
    	strcpy(tus[n++], p);
    	p = strtok(NULL, " ");
	}
	
	// In mang tus ra xem
	printf("\nIn ra cac tu trong mang tu:\n");
	for(int i = 0; i < n; i++) {
		printf("%s\n", tus[i]);
	}
	printf("\n");
	
	// Duyet tu va dem
	int daDemRoi[1000] = {0};
	for(int i = 0; i < n; i++) {
		if(daDemRoi[i] == 1) {
			continue;
		}
		dem[i] = 1;
		for(int j = i + 1; j < n; j++) {
			if(strcmp(tus[i], tus[j]) == 0) {
				dem[i]++;
				daDemRoi[j] = 1;
			}
		}
	}
	
	// In mang daDemRoi ra xem
	printf("\nIn ra gia tri trong mang daDemRoi:\n");
	for(int i = 0; i < n; i++) {
		printf("%d ", daDemRoi[i]);
	}
	printf("\n");
	
	// In mang daDemRoi ra xem
	printf("\nIn ra gia tri trong mang dem:\n");
	for(int i = 0; i < n; i++) {
		printf("%d ", dem[i]);
	}
	printf("\n");
	
	// In mang tus va dem ra xem
	printf("\nIn ra ket qua:\n");
	for(int i = 0; i < n; i++) {
		if(dem[i] > 0) {
			printf("%s\t%d\n", tus[i], dem[i]);
		}
	}

    return 0;
}
