#include <iostream>

using namespace std;

#define NAME "PXH2910"

int main() {
	
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	
	if(fopen(NAME".INP", "r")) {
		freopen(NAME".INP", "r", stdin);
		freopen(NAME".OUT", "w", stdout);
	}
	
	long long x;
	long long n;
	
	cin >> x >> n;
	
	long long S = 0;
	long long T = 1;
	
	for(int i = 1; i <= n; i++) {
		T *= x;
		S += T;
	}
	
	cout << S;
	
	return 0;
}