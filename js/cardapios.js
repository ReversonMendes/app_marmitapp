angular.module('cardapios.controllers', [])

.controller('CardapiosCtrl', function($scope, Cardapios) {
  
 $scope.cardapios = [];

 $scope.doRefresh = function() {
    $scope.cardapios.unshift(carregarCardapios())
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply()
  };

  var carregarCardapios = function () {
    Cardapios.all().success(function (data) {
      $scope.cardapios = data;
    }).error(function (data, status) {
      $scope.message = "Aconteceu um problema: " + data;
    });
  };

  carregarCardapios();
})