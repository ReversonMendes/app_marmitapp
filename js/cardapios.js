angular.module('cardapios.controllers', [])

.controller('CardapiosCtrl', function($scope, Cardapios, $ionicLoading, $localstorage, LoginService) {
  
 $scope.cardapios = [];

 $scope.doRefresh = function() {
    $scope.logado = typeof $localstorage.get('login') != 'undefined';
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
      console.log(data,status);
      $ionicLoading.hide();
    });
  };

  // verifica se está logado
  $scope.logado = typeof $localstorage.get('login') != 'undefined';
  //chama login
  $scope.entrar = function() {
    LoginService
      .init('templates/login.html', $scope)
      .then(function(modal) {
        modal.show();
      });
    $scope.doRefresh();
  };

  carregarCardapios();
})