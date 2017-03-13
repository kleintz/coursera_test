(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.found = function (searchTerm) {
    return MenuSearchService.getMatchedMenuItems(searchTerm);
}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;


  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    }).then(function(result)) {
      var foundItems = [];
      list = result.data;
      for (i in result) {
        if (list[i].description.includes(searchTerm)) {
          foundItems.append(list[i]);
        }
      }
      return foundItems;
    }
  };

}

})();
