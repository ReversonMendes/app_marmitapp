angular.module('cardapios.controllers', [])

.controller('CardapiosCtrl', function($scope, Cardapios, $ionicLoading, $ionicPopup) {
  
 $scope.cardapios = [];

 $scope.doRefresh = function() {
    $scope.cardapios.unshift(carregarCardapios())
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply()
  };

  var carregarCardapios = function () {
    $ionicLoading.show();
    Cardapios.all().success(function (data) {
      $scope.cardapios = data;
      $ionicLoading.hide();
    }).error(function (data, status) {
      $ionicLoading.hide();
    });
  };

  carregarCardapios();
})