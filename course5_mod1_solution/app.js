(function(){
		'use strict';

		angular.module('LunchCheck',[])
		.controller('LunchCheckController',LunchCheckController);

		LunchCheckController.$inject=['$scope'];
		function LunchCheckController($scope){


		$scope.checkLunch=function(){
		var listItemsStr=$scope.list;
		if(listItemsStr==""){
		$scope.recommendMessage="Please enter data first";
		}else{
		var items=listItemsStr.split(",");
		var count=items.length;
		if(count<=3){
		$scope.recommendMessage="Enjoy!";
		}else{
		$scope.recommendMessage="Too much!";
		};
		};
		};
		}

		})();