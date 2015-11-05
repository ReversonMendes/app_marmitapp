angular.module('localentrega.controllers', [])

.controller('EntregaCtrl', function($scope,$ionicPopup,$cordovaGeolocation,$ionicLoading,$localstorage,$state) {
  $scope.localentrega = {};
  $scope.mensagem = '';

  // if(typeof $localstorage.get('preco') != 'undefined'){
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    //Busca o endereço do usuário
    $ionicLoading.show({
      content: 'Obtendo localização atual ...'
      // showBackdrop: false
    });
    $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        var geocoder = new google.maps.Geocoder();
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);

        geocoder.geocode({'latLng': latlng}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {

            var result = results[0];
            var cidade = "";
            var rua = "";
            var numero = 0;
            var bairro = "";

            for(var i=0, len=result.address_components.length; i<len; i++) {
              var ac = result.address_components[i];
              if(ac.types.indexOf("locality") >= 0) cidade = ac.long_name;
              if(ac.types.indexOf("route") >= 0) rua = ac.long_name;
              if(ac.types.indexOf("street_number") >= 0) numero = ac.long_name;
              if(ac.types.indexOf("sublocality_level_1") >= 0) bairro = ac.long_name;
            }

              $scope.localentrega = {
                  "cidade" : cidade,
                  "bairro" : bairro,
                  "rua" : rua,
                  "numero" : numero,
                  "complemento" : ""
              };
              $scope.$apply()
              $ionicLoading.hide();
          } 
        });
        // $ionicLoading.hide();
      }, function(error) {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Atenção',
          content: 'Não é possível obter a localização: ' + error.message
        });      
    })
      
    $scope.localizacao = function(localentrega){
        //guarda a localizacao
        $localstorage.setObject('localentrega',localentrega);
        $state.go('tab.pagamento');
      }
    // }else{
      // $scope.mensagem = 'Nenhum cardápio escolhido';
    // }
})
