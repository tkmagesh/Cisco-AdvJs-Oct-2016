/*create an object and assign it to a variable 'spinner'

the object must exhibit the following behavior*/



function spinnerFactory(){
	var counter = 0;

	function up(){
		return ++counter;
	}

	function down(){
		return --counter;
	}
	return {
		up : up,
		down : down
	}
}

var spinner = spinnerFactory();

spinner.up(); //=> 1
spinner.up(); //=> 2
spinner.up(); //=> 3
spinner.up(); //=> 4

spinner.down(); //=> 3
spinner.down(); //=> 2
spinner.down(); //=> 1
spinner.down(); //=> 0
spinner.down(); //=> -1

