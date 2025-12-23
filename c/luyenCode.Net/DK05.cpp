using namespace std;
#include <bits/stdc++.h>

#define name "PXH2910"

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	if(fopen(name".INP", "r")) {
		freopen(name".INP", "r", stdin);
		freopen(name".OUT", "w", stdout);
	}
	long long n;
	cin >> n;
	double resultSQRT = sqrt(n);
	if((long long)resultSQRT * (long long)resultSQRT == n) {
		cout << "YES";
	} else {
		cout << "NO";
	}
	return 0;
}