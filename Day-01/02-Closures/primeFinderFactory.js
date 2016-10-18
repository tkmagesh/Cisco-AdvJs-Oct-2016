

isPrime(100); //run the algo
isPrime(101); //run the algo
isPrime(102); //run the algo

isPrime(101); //SHOULD NOT run the algo, but returns the result

function primeFinderFactory(){
	var cache = {};
	return function(n){
		if (typeof cache[n] !== 'undefined')
			return cache[n];
		console.log('processing ', n);
		if (n <= 3) {
			cache[n] = true;
			return cache[n];
		}
		cache[n] = true;
		for(var i=2; i <= (n/2); i++)
			if (n % i === 0){
				cache[n] = false;
				break;
			}
		return cache[n];
	}
}