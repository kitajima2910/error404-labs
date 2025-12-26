#include <stdio.h>
#include <string.h>

#define MAX 200

int process(char str[]);



int main() {
	
	long long T;
	scanf("%lld", &T);
	getchar();
	
	for(; T--; ) {
		char str[MAX];

	    fgets(str, sizeof(str), stdin);
	    str[strcspn(str, "\n")] = '\0';
	    
	    printf("%d\n", process(str));	
	}
	
	return 0;
}

int process(char str[]) {
	
	/*
		Lap trinh     C va C++
		ACBDSDS kdfjdkgfdgkhfgjlfgdkjfdgdgfdgfd
	*/
	
	int i, count = 0;
	
    for (i = 0; str[i] != '\0'; i++) {
        if(str[i] != ' ' && (i == 0 || str[i - 1] == ' ')) {
        	count++;
		}
    }
	
	return count;
}