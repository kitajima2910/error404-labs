#include <stdio.h>
#include <string.h>
#include <math.h>
#include <stdlib.h>

int main()
{

    /* Enter your code here. Read input from STDIN. Print output to STDOUT */
    long long T;
    scanf("%lld", &T);

    long long i;
    for (i = 1; i <= T; i++)
    {
        double n;
        scanf("%lf", &n);
        printf("%.15lf\n", 1 / n);
    }

    return 0;
}
