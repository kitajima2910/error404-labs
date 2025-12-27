#include <stdio.h>
#include <math.h>

typedef struct {
	double a, b, c;
} tamgiac;

void nhapTamGiac(tamgiac *tg) {
	scanf("%lf %lf %lf", &tg->a, &tg->b, &tg->c);
}

/*

Heron:
	nua chuvi: p = (a + b + c) / 2
	dien tich: S = sqrt(p * (p - a) * (p - b) * (p - c))

*/ 

double dienTich(tamgiac tg) {
	double p = (tg.a + tg.b + tg.c) / 2;
	return sqrt(p * (p - tg.a) * (p - tg.b) * (p - tg.c));
}

void inTamGiac(tamgiac tg) {
	printf("%.0lf %.0lf %.0lf\n", tg.a, tg.b, tg.c);
}

void ghiFile(long long n, tamgiac tg[n]) {
	FILE *f = fopen("FPLSP22GxxmsvTG.fpl", "wb");
	if(f != NULL) {
		fwrite(tg, sizeof(tamgiac), n, f);
		fclose(f);
	}
}

int main() {
	
	long long n;
	scanf("%lld", &n);
	
	tamgiac tg[n];
	
	for(long long i = 0; i < n; i++) {
		nhapTamGiac(&tg[i]);
	}
	
	for(long long i = 0; i < n - 1; i++) {
		for(long long j = i + 1; j < n; j++) {
			if(dienTich(tg[i]) > dienTich(tg[j])) {
				tamgiac temp = tg[i];
				tg[i] = tg[j];
				tg[j] = temp;
			}
		}
	}
	
	ghiFile(n, tg);
	
	for (int i = 0; i < n; i++) {
        inTamGiac(tg[i]);
    }
	
	return 0;
}