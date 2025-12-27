#include <stdio.h>

long long kiemTraSoNT(long long n);

int main() {
    long long T;
    scanf("%lld", &T);

    while(T--) {
        long long n;
        scanf("%lld", &n);

        long long arr[n];
        for(long long i = 0; i < n; i++) {
            scanf("%lld", &arr[i]);
        }

        for(long long i = 0; i < n; i++) {
            if(kiemTraSoNT(arr[i])) {
                printf("%lld ", arr[i]);
            }
        }
        printf("\n"); // ? quan tr?ng
    }

    return 0;
}

long long kiemTraSoNT(long long n) {
    if(n < 2) return 0;
    if(n == 2) return 1;
    if(n % 2 == 0) return 0;

    for(long long i = 3; i <= n / i; i += 2) {
        if(n % i == 0) return 0;
    }
    return 1;
}
