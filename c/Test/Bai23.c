#include <stdio.h>
#include <string.h>

int main() {
    char chuois[1000];
    char tus[100][50];
    int dem[100] = {0};
    int n = 0;

    fgets(chuois, 1000, stdin);
    chuois[strcspn(chuois, "\n")] = '\0';
    
    char *p = strtok(chuois, " ");
    while(p != NULL) {
    	strcpy(tus[n++], p);
    	p = strtok(NULL, " ");
	}
	
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
	
	for(int i = 0; i < n; i++) {
		if(dem[i] > 0) {
			printf("%s\t%d\n", tus[i], dem[i]);
		}
	}

    return 0;
}
