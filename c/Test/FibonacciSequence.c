#include <stdio.h>

int main()
{

    int n;
    scanf("%d", &n);

    // 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
    int a = 0, b = 1, next;

    if (n == 1)
    {
        printf("%d", a);
        return 0;
    }

    if (n == 2)
    {
        printf(" %d", b);
        return 0;
    }

    printf("%d %d", a, b);

    int i;
    for (i = 3; i <= n; i++)
    {
        next = a + b;
        a = b;
        b = next;
        printf(" %d", next);
    }

    return 0;
}