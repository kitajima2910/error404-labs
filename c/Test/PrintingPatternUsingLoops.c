#include <stdio.h>

void process(int a[][20], int k, int offset);

int main() {
    int n = 2;
    int size = 2 * n - 1;
    int a[20][20] = {0};

    int offset = 0;

    for (int k = n; k >= 1; k--) {
        process(a, k, offset);
        offset++;
    }

    // in ma trận
    for (int i = 0; i < size; i++) {
        for (int j = 0; j < size; j++)
            printf("%d ", a[i][j]);
        printf("\n");
    }

    return 0;
}

void process(int a[][20], int k, int offset) {
    int len = 2 * k - 1;

    // cạnh trên
    for (int j = offset; j < offset + len; j++)
        a[offset][j] = k;

//    // cạnh dưới
//    for (int j = offset; j < offset + len; j++)
//        a[offset + len - 1][j] = k;
//
//    // cạnh trái
//    for (int i = offset; i < offset + len; i++)
//        a[i][offset] = k;
//
//    // cạnh phải
//    for (int i = offset; i < offset + len; i++)
//        a[i][offset + len - 1] = k;
}
