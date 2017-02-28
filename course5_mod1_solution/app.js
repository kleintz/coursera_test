(function(){
		'use strict';

		angular.module('LunchCheck',[])
		.controller('LunchCheckController',LunchCheckController);

		LunchCheckController.$inject=['$scope'];
		function LunchCheckController($scope){


		$scope.checkLunch=function(){
		var listItemsStr = $scope.list;
		if(listItemsStr==""||listItemsStr==null){
			$scope.recommendMessageRed="Please enter data first";
			$scope.recommendMessageGreen=null;
		}
		else{
		var items=listItemsStr.split(",");
		var count=items.length;
		for (var i in items) {			
			items[i] = items[i].trim();
			if (items[i]==""){
				count= count -1;
			}
		}
		if (count == 0) {
			$scope.recommendMessageRed="Please enter data first";
			$scope.recommendMessageGreen=null;
		}
		else if(count<=3){
			$scope.recommendMessageGreen="Enjoy!";
			$scope.recommendMessageRed=null;
		}else{
			$scope.recommendMessageGreen="Too much!";
			$scope.recommendMessageRed=null;
		};
		};
		};
		}

		})();