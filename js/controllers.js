angular.module('starter.controllers', [])

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

.controller('IngredienteCtrl', function($scope,Cardapios, $ionicActionSheet,$stateParams) {

  // $scope.$on('$ionicView.enter', function(e) {
  //  //   $stateParams = null;
  //  //limpar toda vez
  //     CarregarIngredientes();
  // });

  $scope.ingredientes = [];
  $scope.precos = [];

   $scope.doRefresh = function() {
    $scope.ingredientes.unshift(CarregarIngredientes())
    $scope.$broadcast('scroll.refreshComplete');
  };

  var CarregarIngredientes = function () {
    Cardapios.allIngredientes($stateParams.cardapioId).success(function (data) {
      $scope.ingredientes = data;
    }).error(function (data, status) {
      $scope.message = "Aconteceu um problema: " + data;
    });
  };

    var CarregarPrecos = function() {
    Cardapios.allprecos($stateParams.empresaId).success(function (data) {
      $scope.precos = data;
    }).error(function (data, status) {
      $scope.message = "Aconteceu um problema: " + data;
    });
  };


  $scope.removeIngrediente = function(ingrediente) {
    $scope.ingredientes.splice($scope.ingredientes.indexOf(ingrediente), 1);
  };

  $scope.showPrecoOptions = function() {
    var precos = $scope.precos;
    var buttonsPrecos = [];

    for (var i = 0; i < precos.length; i++) {
      var text = {"text":"Tamanho "+precos[i].tamanho +" R$ "+precos[i].valor};
      buttonsPrecos.push(text);
     }

    var hideSheet = $ionicActionSheet.show({
      buttons: buttonsPrecos,
      titleText: 'Escolha uma das opções de preços',
      cancelText: 'Cancel',
      cancel: function () {

      },
      buttonClicked: function (index) {
        console.log(buttonsPrecos[index]);
        return true;
      }
    });
  };

  CarregarIngredientes();
  CarregarPrecos();
})

// .controller('CardapioDetailCtrl', function($scope, $stateParams, Cardapios) {
//   console.log($stateParams.cardapioId);
//   $scope.cardapios = Cardapios.get($stateParams.cardapioId);
// })

.controller('EntregaCtrl', function($scope,$ionicPopup,$cordovaGeolocation) {


  var posOptions = {timeout: 10000, enableHighAccuracy: false};

    $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        var lat  = position.coords.latitude
        var long = position.coords.longitude
        console.log(position);
        console.log('lat:'+lat + ' long:'+long);
      }, function(err) {
        // error
      });

  //     var request = {
  //       'position': posOptions
  //     };
  //     plugin.google.maps.Geocoder.geocode(request, function(position) {
  //       if (position.length) {
  //         var result = results[0];
  //         var position = result.position; 
  //         var address = [
  //           result.subThoroughfare || "",
  //           result.thoroughfare || "",
  //           result.locality || "",
  //           result.adminArea || "",
  //           result.postalCode || "",
  //           result.country || ""].join(", ");

  //         map.addMarker({
  //           'position': position,
  //           'title':  address
  //         });
  //       } else {
  //         alert("Not found");
  //       }
  //     });

    // var watchOptions = {
    //   timeout : 3000,
    //   enableHighAccuracy: false // may cause errors if true
    // };

    // var watch = $cordovaGeolocation.watchPosition(watchOptions);
    // watch.then(
    //   null,
    //   function(err) {
    //     // error
    //   },
    //   function(position) {
    //     var lat  = position.coords.latitude
    //     var long = position.coords.longitude
    //     console.log(position);
    //     console.log('lat:'+lat + ' long:'+long);
    // });


  //  watch.clearWatch();
    // OR
    // $cordovaGeolocation.clearWatch(watch)
    //   .then(function(result) {
    //     // success
    //     }, function (error) {
    //     // error
    //   });

      $scope.insert = function() {
      $ionicPopup.prompt({
          title: 'Digite o seu nome',
          inputType: 'text'
      })
      .then(function(result) {
          if(result !== undefined) {
              console.log(result);
          } else {
              console.log("Action not completed");
          }
      });
    }
 
})

.controller('PagamentoCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

