#include <stdio.h>

void process(long long);

int main() {
    
    long long T;
    scanf("%lld", &T);
    
    for(;T--; ) {
        long long n;
        scanf("%lld", &n);
        process(n);
        printf("\n");
    }    
    
    return 0;
}

void process(long long n) {
    
    int opt = 1;
    
    for(;n % 2 == 0; n /=2) {
        if(!opt) {
            printf(" x ");
        }
        printf("2");
        opt = 0;
    }
    
    long long i;
    for(i = 3; i <= n / i; i += 2) {
        for(; n % i == 0; n /= i) {
            if(!opt) {
                printf(" x ");
            }
            printf("%lld", i);
            opt = 0;
        }
    }
    
    if(n > 1) {
        if(!opt) {
            printf(" x ");
        }
        printf("%lld", n);
    }
}