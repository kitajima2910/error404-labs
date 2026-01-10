#include <stdio.h>
#include <string.h>

int main() {
    char chuois[1000];
    int dem = 0;
    
    fgets(chuois, 1000, stdin);
	chuois[strcspn(chuois, "\n")] = '\0';
  
    char *p = strtok(chuois, " ");
    while(p != NULL) {
    	dem++;
    	p = strtok(NULL, " ");
	}
	
	printf("%d", dem);
    return 0;
}