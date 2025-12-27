#include <stdio.h>

long long process(long long n);

int main() {
	
	long long T;
	scanf("%lld", &T);
	
	while(T--) {
		long long n;
		scanf("%lld", &n);
		printf("%lld\n", process(n));
	}
	
	
	return 0;
}

long long process(long long n) {

    if (n % 2 == 1) return 0;

    n /= 2;

    long long count = 0;
    for (long long i = 1; i * i <= n; i++) {
        if (n % i == 0) {
            count++;                 // i
            if (i != n / i)
                count++;             // n/i
        }
    }
    return count;
}
