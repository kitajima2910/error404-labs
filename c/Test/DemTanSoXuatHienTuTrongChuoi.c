#include <stdio.h>
#include <string.h>

int main() {
	
	char text[1000];
	char words[1000][500];
	int wordCount = 0;

    printf("\nInput: ");
    fgets(text, sizeof(text), stdin);
    text[strcspn(text, "\n")] = '\0';
    
    printf("\nOutput: %s", text);
    
    char *token = strtok(text, " ");
    
    while(token != NULL) {
    	//printf("\n%s", token);
    	strcpy(words[wordCount++], token);
    	token = strtok(NULL, " ");
	}
	
	printf("\nWords array:\n");
    for(int i = 0; i < wordCount; i++) {
        printf("\nwords[%d] = %s", i, words[i]);
    }
    
    int freq[wordCount];
    //for(int i = 0; i < wordCount; i++) {
    //    freq[i] = 0;
    //}
    memset(freq, 0, sizeof(freq));
    
    for(int i = 0; i < wordCount; i++) {
    	
    	if(freq[i] == -2910) {
    		continue;
		}
    	
    	freq[i] = 1;
    	
    	for(int j = i + 1; j < wordCount; j++) {
    		if(strcmp(words[i], words[j]) == 0) {
	    		freq[i]++;
	    		freq[j] = -2910;
			}
		}
    
	}
	
	printf("\n\nResult:\n");
	for(int i = 0; i < wordCount; i++) {
		if(freq[i] != -2910) {
            printf("%s - %d\n", words[i], freq[i]);
        }
	}
	
	return 0;
}