var products = [
	{id : 4, name : 'Pen', cost : 90, units : 40, category : 1},
	{id : 8, name : 'Hen', cost : 50, units : 70, category : 3},
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
			for(var i=0; i < products.length -1; i++)
				for(var j = i+1; j < products.length; j++)
					if (products[i].id > products[j].id){
						var temp = products[i];
						products[i] = products[j];
						products[j] = temp;
					}
		}
		sort()
		console.table(products);
	});
	describe('Any list by any attribute', function(){
		function sort(list, attrName){
			for(var i=0; i < list.length -1; i++)
				for(var j = i+1; j < list.length; j++)
					if (list[i][attrName] > list[j][attrName]){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		}
		describe('Products by cost', function(){
			sort(products, 'cost');
			console.table(products);
		});
		describe('Products by units', function(){
			sort(products, 'units');
			console.table(products);
		});
	});

	describe("Any list by anything", function(){
		function sort(list, comparerFn){
			for(var i=0; i < list.length -1; i++)
				for(var j = i+1; j < list.length; j++)
					if (comparerFn(list[i], list[j]) > 0){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		}
		describe("Products by value [cost * units]", function(){
			var productComparerByValue = function(p1, p2){
				var p1Value = p1.cost * p1.units,
					p2Value = p2.cost * p2.units;
				if (p1Value < p2Value) return -1;
				if (p1Value === p2Value) return 0;
				return 1;
			}
			sort(products, productComparerByValue);
			console.table(products);
		});
	});
});

describe('Filter', function(){
	describe("All category 1 products", function(){
		function filterCategory1Products(){
			var result = [];
			for(var i=0; i < products.length; i++)
				if (products[i].category === 1)
					result.push(products[i]);
			return result;
		}
		var category1Products = filterCategory1Products();
		console.table(category1Products);
	});
	describe("Any list by any criteria", function(){
		function filter(list,criteriaFn){
			var result = [];
			for(var i=0; i < list.length; i++)
				if (criteriaFn(list[i]))
					result.push(list[i]);
			return result;
		}
		function negate(criteriaFn){
			return function(){
				return !criteriaFn.apply(this, arguments);
			}
		}
		describe("Products By Category", function(){
			var category1Criteria = function(product){
				return product.category === 1;
			}
			describe("Products by category [category = 1]", function(){
				var category1Products = filter(products, category1Criteria);
				console.table(category1Products);
			});

		});
		describe("Products by Cost", function(){
			var costlyProductCriteria = function(product){
				return product.cost > 60;
			};
			describe("Costly products [ cost > 60 ]", function(){
				var costlyProducts = filter(products, costlyProductCriteria);
				console.table(costlyProducts);
			});
			/*var affordableProductCriteria = function(product){
				return !costlyProductCriteria(product);
			};*/
			var affordableProductCriteria = negate(costlyProductCriteria);

			describe("Affordable products [ cost <= 50 ]", function(){
				var affordableProducts = filter(products, affordableProductCriteria);
				console.table(affordableProducts);
			});
		});

		describe("Products by units", function(){
			var overStockedProductCriteria = function(product){
				return product.units > 50;
			};
			describe("Over stocked products [units > 50 ]", function(){
				var overStockedProducts = filter(products, overStockedProductCriteria);
				console.table(overStockedProducts);
			});
			/*var underStockedProductCriteria = function(product){
				return !overStockedProductCriteria(product);
			};*/
			var underStockedProductCriteria = negate(overStockedProductCriteria);

			describe("Under stocked products [!overStockedProduct]", function(){
				var underStockedProducts = filter(products, underStockedProductCriteria);
				console.table(underStockedProducts);
			})
		})
		
	})
});

describe("All", function(){
	function all(list, criteriaFn){
		for(var i=0; i < list.length; i++)
			if (!criteriaFn(list[i]))
				return false;
		return true;
	}
	describe("Are all the products costly [cost > 50]", function(){
		var areAllProductsCostly = all(products, function(product){
			return product.cost > 50;
		});
		console.log(areAllProductsCostly);
	});
});

describe("Any", function(){
	function any(list, criteriaFn){
		for(var i=0; i < list.length; i++)
			if (criteriaFn(list[i]))
				return true;
		return false;
	}
	describe("Are there any costly products [cost > 50]", function(){
		var areAnyProductsCostly = any(products, function(product){
			return product.cost > 50;
		});
		console.log(areAnyProductsCostly);
	});
});



describe("Group", function(){
	function groupBy(list, keySelectorFn){
		var result = {};
		for(var i=0; i < list.length; i++){
			var key = keySelectorFn(list[i]);
			if (typeof result[key] === 'undefined')
				result[key] = [];
			result[key].push(list[i]);
		}
		return result;
	}
	function printGroup(groupedItems){
		for(var key in groupedItems)
			describe('Key - [' + key + ']', function(){
				console.table(groupedItems[key]);
			});
	}
	describe("Products by category", function(){
		var categoryKeySelector = function(product){
			return 'category - ' + product.category;
		};
		var productsByCategory = groupBy(products, categoryKeySelector);
		printGroup(productsByCategory);
	});

	describe("Products by affordability", function(){
		var costKeySelector = function(product){
			return product.cost > 50 ? "costly" : "affordable";
		};
		var productsByAffordability = groupBy(products, costKeySelector);
		printGroup(productsByAffordability);
	});
});

describe("Map", function(){
	function map(list, transformFn){
		var result = [];
		for(var i=0; i < list.length; i++)
			result.push(transformFn(list[i]));
		return result;
	}
	describe("Products after 10% discount", function(){
		var productsAfterDiscount = map(products, function(product){
			var newProduct = Object.assign(product, {});
			newProduct.cost = newProduct.cost * 0.9;
			return newProduct;
		});
		console.table(productsAfterDiscount);
	})
})



