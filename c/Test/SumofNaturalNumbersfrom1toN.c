#include <stdio.h>
#include <string.h>
#include <math.h>
#include <stdlib.h>

int main()
{

    /* Enter your code here. Read input from STDIN. Print output to STDOUT */
    long long n;
    scanf("%lld", &n);

    long long sum = 0;

    long long i;

    for (i = 1; i <= n; i++)
    {
        sum += i;
    }

    printf("%lld", sum);

    return 0;
}
