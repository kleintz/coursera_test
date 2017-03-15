(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    }
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.findMatches = function () {
	  var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
	  promise.then(function (resultList) {
      menu.found = resultList;
	  console.log(menu.found);
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });
  }

menu.removeItem = function (itemIndex) {
    menu.found.splice(itemIndex, 1);
  };
  
menu.isEmptyResult = function () {
	if (menu.found == undefined) {
		return false;
	}
    else if (menu.found.length == 0) {
		return true;
	}
	return false;
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
   return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
    var list = result.data.menu_items;
    var resultList = [];
    for (var i in list) {
        if (list[i].description.indexOf(searchTerm)!=-1) {			
          resultList.push(list[i]);
        }
      }
    // return processed items
    return resultList;
});
  };
  
}

})();
