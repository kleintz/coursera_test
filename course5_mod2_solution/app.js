(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListCheckOffService.getItemsToBuy();
  console.log("To buy items: ", toBuyList.items.length);
  toBuyList.moveItem = function (itemIndex) {
    ShoppingListCheckOffService.moveItem(itemIndex);
  }
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.getItemsBought();
  console.log("Bought items: ", boughtList.items.length);
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of to buy items
  var itemsToBuy = [
  {name: "cookies", quantity: 10},
  {name: "milk", quantity: 2},
  {name: "water", quantity: 5},
  {name: "chips", quantity: 5},
  {name: "butter", quantity: 10}];

  var itemsBought = [];

  service.moveItem = function (itemIndex) {
    var item = itemsToBuy[itemIndex];
    console.log("Item to move: ", item);
    itemsToBuy.splice(itemIndex, 1);
    itemsBought.push(item);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

   service.getItemsBought = function () {
    return itemsBought;
  };
}

})();
