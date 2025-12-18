#include <stdio.h>

int main()
{
    int c;

    while ((c = getchar()) != EOF)
    {
        if (c == ' ')
            break;

        if (c == '\n')
            continue;

        printf("%c %d\n", c, c);
    }

    return 0;
}
