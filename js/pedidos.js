angular.module('pedidos.controllers', [])

.controller('IngredienteCtrl', function($scope,Cardapios, $ionicActionSheet,$stateParams,$localstorage,$state,$ionicLoading) {

  $scope.$on('$ionicView.enter', function(e) {
   $localstorage.removeKey('quantidade');
   $localstorage.removeKey('remover');
  });

  $scope.ingredientes = [];
  $scope.precos = [];
  $scope.nomeprato = "";
  $scope.quantidade = 1;
  $scope.nomeprato = $stateParams.nomeprato;
  console.log($scope.nomeprato);
  $localstorage.set('prato',$scope.nomeprato);
  $localstorage.set('idcardapio',$stateParams.cardapioId);

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
      cancelText: 'Cancelar',
      cancel: function () {

      },
      buttonClicked: function (index) {
        $localstorage.setObject("preco",$scope.precos[index]);
        $localstorage.set('quantidade',$scope.quantidade);
        $state.go('tab.entrega');
      }
    });
  };

  $ionicLoading.show({
      showBackdrop: false
    });
  CarregarIngredientes();
  CarregarPrecos();
  $ionicLoading.hide();
})