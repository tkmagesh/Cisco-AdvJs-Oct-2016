var products = [
	{id : 4, name : 'Pen', cost : 90, units : 40, category : 1},
	{id : 8, name : 'Hen', cost : 50, units : 70, category : 1},
	{id : 7, name : 'Ten', cost : 60, units : 90, category : 2},
	{id : 3, name : 'Den', cost : 30, units : 80, category : 2},
	{id : 2, name : 'Zen', cost : 70, units : 20, category : 1},
]

/*
sort
filter
all
any
groupBy
map
forEach
*/

function describe(title, fn){
	console.group(title);
	fn();
	console.groupEnd();
}

describe('Default list', function(){
	console.table(products);
});

describe('Sort', function(){
	describe('Default Sort [Products by id]', function(){
		function sort(){

		}
		sort()
		console.table(products);
	});
	describe('Any list by any attribute', function(){
		function sort(){

		}
		describe('Products by cost', function(){
			sort();
			console.table(products);
		});
		describe('Products by units', function(){
			sort();
			console.table(products);
		});
	})
});


