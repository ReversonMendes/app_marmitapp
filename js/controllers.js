angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('CardapiosCtrl', function($scope, Cardapios,$ionicActionSheet, $timeout) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.cardapios = Cardapios.all();

  $scope.remove = function(cardapio) {
    Cardapios.remove(cardapio);
  };

    $scope.showShareOptions = function() {
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        {text: 'Facebook'},
        {text: 'Twitter'},
        {text: 'Whatsapp'}
      ],
      titleText: 'Share your album',
      cancelText: 'Cancel',
      cancel: function () {

      },
      buttonClicked: function (index) {
        return true;
      }
    });

    // $timeout(function () {
    //   hideSheet();
    // }, 2000);
  };

})

.controller('CardapioDetailCtrl', function($scope, $stateParams, Cardapios) {
  console.log($stateParams.cardapioId);
  $scope.cardapios = Cardapios.get($stateParams.cardapioId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('PagamentoCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});