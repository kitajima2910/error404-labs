#include <stdio.h>

void process(int size, int a[][size], int offset, int value);

int main() {
    int n;
    scanf("%d", &n);

    int size = 2 * n - 1;
    int a[size][size];

    for (int i = 0; i < size; i++)
        for (int j = 0; j < size; j++)
            a[i][j] = 0;

    int offset = 0;
    for (int value = n; value >= 1; value--) {
        process(size, a, offset++, value);
    }

    for (int i = 0; i < size; i++) {
        for (int j = 0; j < size; j++) {
            printf("%d", a[i][j]);
            if (j < size - 1) printf(" ");
        }
        printf("\n");
    }

    return 0;
}

void process(int size, int a[][size], int offset, int value) {

    // canh tren
    for (int j = offset; j < size - offset; j++)
        a[offset][j] = value;

    // canh duoi
    for (int j = offset; j < size - offset; j++)
        a[size - 1 - offset][j] = value;

    // canh trai
    for (int i = offset; i < size - offset; i++)
        a[i][offset] = value;

    // canh phai
    for (int i = offset; i < size - offset; i++)
        a[i][size - 1 - offset] = value;
}
