#include <iostream>
#include <iomanip>

using namespace std;

#define NAME "PXH2910"

int main() {
	
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	
	if(fopen(NAME".INP", "r")) {
		freopen(NAME".INP", "r", stdin);
		freopen(NAME".OUT", "w", stdout);
	}
	
	long long n;
	
	cin >> n;
	
	double S = 0;
	long long M = 0;
	
	for(int i = 1; i <= n; i++) {
		M += i;
		S += 1.0 / M;
	}
	
	cout << fixed << setprecision(6) << S;
	
	return 0;
}