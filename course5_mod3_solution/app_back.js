(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundList.html',
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

  menu.showFoundItems = function () {
    menu.found =  MenuSearchService.getMatchedMenuItems(menu.searchTerm);
  }
	
  menu.onRemove = function (index) {
	  menu.found.splice(index, 1)
  }
}


MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  service.getMenuItems = function () {
    var response = $http({
      method: "GET",
       url: "https://davids-restaurant.herokuapp.com/menu_items.json"
    });

    return response;
  };
  
  service.getMatchedMenuItems = function (searchTerm) {
	  var promise = service.getMenuItems();

      promise.then(function (response) {
      var list = response.data;
	   console.log("Data: " + response.data);
      for (var i in list) {
        if (list[i].description.includes(searchTerm)) {
          foundItems.append(list[i]);
        }
      }
	  console.log("Found items: " + foundItems);
      return foundItems;
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });
  };
}

})();
