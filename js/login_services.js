angular.module('login.controllers', [])

.service('LoginService', function($ionicModal, $rootScope, $cordovaOauth,$localstorage,$http,$ionicLoading) {
  
  
  var init = function(tpl, $scope) {

    var promise;
    // Dados de login
    $scope.loginData = {};


    $scope = $scope || $rootScope.$new();
    
    promise = $ionicModal.fromTemplateUrl(tpl, {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      return modal;
    });

    $scope.openModal = function() {
       $scope.modal.show();
     };
     
    $scope.closeLogin = function() {
       $scope.modal.hide();
     };

    $scope.$on('$destroy', function() {
       $scope.modal.remove();
     });

    $scope.showMessage = function(){
      $ionicLoading.show({ template: 'Não foi possível realizar o login. Tente novamente', noBackdrop: true, duration: 3000 });
    }

    $scope.getProfileInfoGoogle = function() {
      console.log(window.localStorage.getItem('access_token'));
      if(typeof $localstorage.get('access_token')!= 'undefined') {
        $http.defaults.headers.common.Authorization = "Bearer " + window.localStorage.getItem("access_token");
        $http.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json").success(function(data) {
          $scope.loginData = {
            "nome": data.name,
            "email": data.email,
            "foto": data.picture
          }; 
        $localstorage.setObject("login",$scope.loginData);
        $scope.closeLogin();   
        })
        .error(function(error) {
            $scope.showMessage();
            console.log(error);
        });
     }else{
        $scope.showMessage();
    }
  }



  $scope.googleLogin = function() {
        $cordovaOauth.google("687075048028-e5h0pfp3ma0g3u3go0ujr7ifne5c58s8.apps.googleusercontent.com", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
          //grava o token
          window.localStorage.setItem("access_token", result.access_token);
          //Busca as informação apartir do token do goole
          $scope.getProfileInfoGoogle();
        }, function(error) {
          $scope.showMessage();
            console.log(error);
        });
  }

    $scope.getProfileInfoFace = function() {
      console.log(window.localStorage.getItem('access_token'));
     if(typeof $localstorage.get('access_token')!= 'undefined') {
            $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: window.localStorage.getItem("access_token"), fields: "id,name,email,picture{url}", format: "json" }}).then(function(result) {
                $scope.loginData = {
                  "nome": result.data.name,
                  "email": result.data.email,
                  "foto": result.data.picture.data.url
                }; 
              $localstorage.setObject("login",$scope.loginData);
              $scope.closeLogin();
            }, function(error) {
                $scope.showMessage();
                console.log(error);
            });
        } else {
          //erro
           $scope.showMessage();
       }
    }



  $scope.facebookLogin = function() {
        $cordovaOauth.facebook("906005396153968", ["email", "public_profile"]).then(function(result) {
          //grava o token
          window.localStorage.setItem("access_token", result.access_token);
          //Busca as informação apartir do token do facebook
          $scope.getProfileInfoFace();
        }, function(error) {
            $scope.showMessage();
            console.log(error);
        });
  }
    
    return promise;
  }
  
  return {
    init: init
  }
  
})
