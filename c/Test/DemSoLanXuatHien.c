#include <stdio.h>

typedef struct {
    char key;
    int value;
} Map;

int main() {
    int n;
    scanf("%d", &n);

    Map map[n];
    int size = 0;

    for (int i = 0; i < n; i++) {
        char c;
        do {
            c = getchar();
        } while (c == '\n' || c == ' ');

        int found = 0;
        for (int j = 0; j < size; j++) {
            if (map[j].key == c) {
                map[j].value++;
                found = 1;
                break;
            }
        }

        if (!found) {
            map[size].key = c;
            map[size].value = 1;
            size++;
        }
    }

    for (int i = 0; i < size; i++) {
        printf("%c - %d\n", map[i].key, map[i].value);
    }

    return 0;
}
