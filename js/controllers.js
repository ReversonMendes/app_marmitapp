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

.controller('IngredienteCtrl', function($scope,Cardapios, $ionicActionSheet,$stateParams,$localstorage,$state) {

  // $scope.$on('$ionicView.enter', function(e) {
  //  //   $stateParams = null;
  //  //limpar toda vez
  //     CarregarIngredientes();
  // });

  $scope.ingredientes = [];
  $scope.precos = [];
  $scope.nomeprato = "";
  $scope.quantidade = 1;
  $scope.nomeprato = $stateParams.nomeprato;
  console.log($scope.nomeprato);
  $localstorage.set('prato',$scope.nomeprato);

   $scope.doRefresh = function() {
    $scope.ingredientes.unshift(CarregarIngredientes())
    $scope.$broadcast('scroll.refreshComplete');
  };

  var CarregarIngredientes = function () {
    $localstorage.removeKey("remover");
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
    console.log(ingrediente.nomeingrediente);
   // $localstorage.set('tirar', $localstorage.get('tirar') +', '+ ingrediente.nomeingrediente);
   if(typeof $localstorage.get('remover') == 'undefined' ){
    $localstorage.set('remover',ingrediente.nomeingrediente );
   }else{
    var junta =  $localstorage.get('remover')
    $localstorage.set('remover', junta +', '+ ingrediente.nomeingrediente);
   }
    

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
        $localstorage.setObject("preco",$scope.precos[index]);
        $localstorage.set('quantidade',$scope.quantidade);
        $state.go('tab.entrega');
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

.controller('EntregaCtrl', function($scope,$ionicPopup,$cordovaGeolocation,$ionicLoading,$localstorage,$state) {
  $scope.localentrega = {};
  $scope.mensagem = '';

  if(typeof $localstorage.get('preco') != 'undefined'){
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    //Busca o endereço do usuário
    $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        // $ionicLoading.show({
        //   content: 'Obtendo localização atual ...',
        //   showBackdrop: false
        // });
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
              console.log(result.address_components[i]);
            }

              $scope.localentrega = {
                  "cidade" : cidade,
                  "bairro" : bairro,
                  "rua" : rua,
                  "numero" : numero
              }
          } 
        });
        // $ionicLoading.hide();
      }, function(error) {
          $ionicPopup.alert({
            title: 'Atenção',
            content: 'Não é possível obter a localização: ' + error.message
          });
      });
      
    $scope.localizacao = function(localentrega){
        //guarda a localizacao
        $localstorage.setObject('localentrega',localentrega);
        $state.go('tab.pagamento');
      }
    }else{
      $scope.mensagem = 'Nenhum cardápio escolhido';
    }
})

.controller('PagamentoCtrl', function($scope,$localstorage,$stateParams,Cardapios,$state,$ionicPopup) {

    var CarregarFormas = function() {
    Cardapios.allFormaPagamento(12).success(function (data) {
      $scope.pagamentos = data;
    }).error(function (data, status) {
      $scope.message = "Aconteceu um problema: " + data;
    });
  };
  
  CarregarFormas();

  $scope.$on('$ionicView.enter', function(e) {
   //recarrega toda vez que abre
    $scope.nome = $localstorage.get('nome');
    $scope.nomeprato = $localstorage.get('prato');
    $scope.preco = $localstorage.getObject('preco');
    $scope.valor = $scope.preco.valor;
    $scope.quantidade = $localstorage.get('quantidade');
    $scope.tamanho = $scope.preco.tamanho;
    $scope.pagamentos = [];
    $scope.pagamentoSelected = $scope.pagamentos[1];
    $scope.localentrega =  $localstorage.getObject('localentrega');
    $scope.remover =  'Tirar '+ $localstorage.get('remover');
    CarregarFormas();
  });

  var limpa = function() {
    // Após fazer o pedido limpa
     $localstorage.removeKey('prato');
     $localstorage.removeKey('quantidade');
     $localstorage.removeKey('preco');
     $localstorage.removeKey('remover');
     $localstorage.removeKey('localentrega');
  };
  

  $scope.pedido = function(){
    limpa();

    $ionicPopup.alert({
     title: 'MarmitApp',
     template: 'Pedido finalizado com sucesso!'
     }).then(function(res) {
        $state.go('tab.dash');
     });
      
  }
   
});

