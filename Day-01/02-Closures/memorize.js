function primeFinderFactory(){
	var cache = {};

	function checkPrime(n){
		console.log('processing ', n);
		if (n <= 3) return true;
		for(var i=2; i <= (n/2); i++)
			if (n % i === 0)
				return false;
		return true;
	}

	return function(n){
		if (typeof cache[n] === 'undefined')
			cache[n] = checkPrime(n);
		return cache[n];
	}
}

function oddEvenFinderFactory(){
	var cache = {};

	function isOddOrEven(n){
		return n % 2 === 0 ? 'even' :'odd';
	}

	return function(n){
		if (typeof cache[n] === 'undefined')
			cache[n] = isOddOrEven(n);
		return cache[n];
	}
}

function memorize(alogFn){
	var cache = {};

	return function(n){
		if (typeof cache[n] === 'undefined')
			cache[n] = alogFn(n);
		return cache[n];
	}
}

function memorize(alogFn){
	var cache = {};

	return function(){
		var key = JSON.stringify(arguments);
		if (typeof cache[key] === 'undefined')
			cache[key] = alogFn.apply(this, arguments);
		return cache[key];
	}
}