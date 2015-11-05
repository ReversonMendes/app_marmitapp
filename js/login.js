angular.module('login.controllers', [])

.controller('LoginCtrl', function($scope, $cordovaOauth, $ionicModal, $ionicPlatform,$state,$localstorage) {

   // Dados de login
  $scope.loginData = {};
  usuario = $scope.loginData;
  
   $ionicPlatform.ready(function(){
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope,
      animation: 'slide-in-up',
      backdropClickToClose: false,
      focusFirstInput: true
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
      console.log($scope.modal);
    });

  });

  // Abre o login modal
  $scope.login = function() {  
    usuario = "";
   $scope.modal.show();
  };

  $ionicPlatform.onHardwareBackButton(function(){
    window.close();
    ionic.Platform.exitApp()
  });

  // Valida Login
  $scope.validaLogin = function() {
    //
  };

  $scope.googleLogin = function() {
        $cordovaOauth.google("687075048028-e5h0pfp3ma0g3u3go0ujr7ifne5c58s8.apps.googleusercontent.com", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
        	$scope.loginData = JSON.stringify(result);
          $localstorage.setObject("loginGoogle",$scope.loginData);
          console.log(JSON.stringify(result));
        }, function(error) {
            console.log(error);
        });
    }

  //Fecha o Modal
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };


  $scope.conta = function(){
    console.log($scope.loginData.usuario);
   // $location.path("/app/conta/"+$scope.loginData.usuario);
    $scope.modal.hide();
  };

   $scope.cadastro = function(){
    console.log("cadastro()")
   // $location.path("/cadastroUsuario");
    $scope.modal.hide();
  };

  $scope.sair = function(){
    $scope.modal.hide();
    $state.go('tab.conta')
  };

  //teste
  $scope.groups = [];
  $scope.groups[0] = {
    items: []
  };
  for (var j=0; j<3; j++) {
    $scope.groups[0].items.push(1 + '-' + j);
  }

  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
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