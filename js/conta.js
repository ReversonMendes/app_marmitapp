angular.module('conta.controllers', [])

.controller('ContaCtrl', function($scope, $localstorage,$state,LoginService) {

  $scope.getPerfilInfo = function() {
   	$scope.perfilData = $localstorage.getObject('login');
    $scope.logado = typeof $localstorage.get('login') != 'undefined';
    if(!$scope.logado) {
      $scope.perfilData.nome = 'você não está logado'
      $scope.perfilData.foto = 'img/user_avatar.png'
    };
  }

  $scope.getPerfilInfo();

  $scope.sair = function(){
    $localstorage.removeKey('access_token');
    $localstorage.removeKey('login');
    $scope.getPerfilInfo();
  };

   $scope.entrar = function() {
    LoginService
      .init('templates/login.html', $scope)
      .then(function(modal) {
        modal.show();
      });
      $scope.getPerfilInfo();
  };
  

  // verifica se está logado
  $scope.logado = typeof $localstorage.get('login') != 'undefined';
  console.log($scope.logado)

  $scope.$on('$ionicView.enter', function(e) {
   $scope.getPerfilInfo();
   $scope.$broadcast('scroll.refreshComplete');
  });

  //ver pedido
  $scope.groups = [];
  $scope.groups[0] = {
    items: []
  };
  for (var j=0; j<3; j++) {
    $scope.groups[0].items.push(1 + '-' + j);
  }

  
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

  
})