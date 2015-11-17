angular.module('pedidos.controllers', [])

.controller('IngredienteCtrl', function($scope,Cardapios, $ionicActionSheet,$stateParams,$localstorage,$state,$ionicLoading) {

    var limpa = function() {
    // Após fazer o pedido limpa
     $localstorage.removeKey('quantidade');
     $localstorage.removeKey('preco');
     $localstorage.removeKey('remover');
     $localstorage.removeKey('localentrega');
     $localstorage.removeKey('idcardapio');
     $localstorage.removeKey('idempresa');
      $scope.quantidade = {
          valor: 1
      };
  };

  $scope.$on('$ionicView.enter', function(e) {
   limpa();
   $scope.ingredientes.unshift(CarregarIngredientes())
   $scope.$broadcast('scroll.refreshComplete');
  });

  $scope.ingredientes = [];
  $scope.obs = {dados: ""};
  $scope.precos = [];
  $scope.nomeprato = "";
  //$scope.quantidade = 1;
  $scope.quantidade = {
        valor: 1
    };

  $scope.nomeprato = $stateParams.nomeprato;
  console.log($scope.nomeprato);
  

   $scope.doRefresh = function() {
    $scope.ingredientes.unshift(CarregarIngredientes())
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply()
  };

  var CarregarIngredientes = function () {
    $localstorage.removeKey("remover");
    $scope.obs.dados = '';
    $ionicLoading.show();
    Cardapios.allIngredientes($stateParams.cardapioId).success(function (data) {
      $scope.ingredientes = data;
      $ionicLoading.hide();
    }).error(function (data, status) {
      $ionicLoading.hide();
      $ionicPopup.alert({
          title: 'MarmitApp',
          content: 'Desculpe mas algo aconteceu'
        });
    });
  };

    var CarregarPrecos = function() {
    $ionicLoading.show();
    Cardapios.allprecos($stateParams.empresaId).success(function (data) {
      $scope.precos = data;
      $ionicLoading.hide();
    }).error(function (data, status) {
      $ionicLoading.hide();
      $ionicPopup.alert({
          title: 'MarmitApp',
          content: 'Desculpe mas algo aconteceu'
        });
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
    if(typeof $localstorage.get('remover') == 'undefined' ){
      $scope.obs.dados =  '';
    }else{
      $scope.obs.dados +=  'Tirar '+ $localstorage.get('remover');
    }
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
      cancelText: 'Cancelar',
      cancel: function () {

      },
      buttonClicked: function (index) {
        $localstorage.setObject("preco",$scope.precos[index]);
        $localstorage.setObject('quantidade',$scope.quantidade);
        $localstorage.set('prato',$scope.nomeprato);
        $localstorage.set('idcardapio',$stateParams.cardapioId);
        $localstorage.set('idempresa',$stateParams.empresaId);
        $state.go('tab.entrega');
      }
    });
  };

  CarregarIngredientes();
  CarregarPrecos();
})