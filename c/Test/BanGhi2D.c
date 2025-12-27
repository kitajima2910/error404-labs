#include <stdio.h>
#include <math.h>

double dienTich(double a, double b, double c) {
    double p = (a + b + c) / 2;
    return sqrt(p * (p - a) * (p - b) * (p - c));
}

int main() {
    int n;
    scanf("%d", &n);

    double tg[n][3];

    for (int i = 0; i < n; i++) {
        scanf("%lf %lf %lf", &tg[i][0], &tg[i][1], &tg[i][2]);
    }

    for (int i = 0; i < n - 1; i++) {
        for (int j = i + 1; j < n; j++) {
            if (dienTich(tg[i][0], tg[i][1], tg[i][2]) >
                dienTich(tg[j][0], tg[j][1], tg[j][2])) {

                for (int k = 0; k < 3; k++) {
                    double temp = tg[i][k];
                    tg[i][k] = tg[j][k];
                    tg[j][k] = temp;
                }
            }
        }
    }

    for (int i = 0; i < n; i++) {
        printf("%.0lf %.0lf %.0lf\n",
               tg[i][0], tg[i][1], tg[i][2]);
    }

    return 0;
}
