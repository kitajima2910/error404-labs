#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

#define MAX 300

int process(char s[]);

int main() {
    
    int T;
    scanf("%d", &T);
    scanf("\n");
    
//    printf("%d\n", strlen(s));
//    printf("%s", s);
    
    // "   lap  trinh C  va  C++  "
    while(T--) {
        char s[MAX];
        fgets(s, MAX, stdin);
        s[strcspn(s, "\n")] = '\0';
        
        printf("%d\n", process(s));
    }
    
    return 0;
}

int process(char s[]) {
    
    int len = strlen(s);
        
    int count = 0;
    for(int i = 0; i < len; i++) {
        if(s[i] != ' ' && (s[i + 1] == ' ' || s[i + 1] == '\0')) {
            count++;
        }
    }
    return count;
}