angular.module('pagamento.controllers', [])

.controller('PagamentoCtrl', function($scope,$localstorage,$stateParams,Cardapios,$state,$ionicPopup) {

    $scope.pedido = {};

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
    // monta scope de pedido
    $scope.pedido.nome = $localstorage.get('nome');
    $scope.pedido.nomeprato = $localstorage.get('prato');
    $scope.pedido.idcardapio = $localstorage.get('idcardapio');
    $scope.pedido.quantidade = $localstorage.get('quantidade');
    $scope.pedido.localentrega =  $localstorage.getObject('localentrega');
    if(typeof $localstorage.get('remover') == 'undefined' ){
      $scope.pedido.remover =  '';
    }else{
      $scope.pedido.remover =  'Tirar '+ $localstorage.get('remover');
    }

    //apresenta
    $scope.preco = $localstorage.getObject('preco');
    $scope.valor = $scope.preco.valor;
    console.log($scope.valor);
    $scope.tamanho = $scope.preco.tamanho;
    $scope.total = parseFloat($scope.valor) * parseFloat($scope.quantidade);


    console.log($scope.pedido);
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
  

  $scope.finalizarpedido = function(){
    //$scope.$apply()
    console.log($scope.pedido);
    Cardapios.postPedido( $scope.pedido )

    .success(function (data) {    
      $ionicPopup.alert({
         title: 'MarmitApp',
         template: 'Pedido finalizado com sucesso!'
         }).then(function(res) {
            $state.go('tab.dash');
       });
      limpa();
    })

    .error(function (data, status) {
      $ionicPopup.alert({
         title: 'MarmitApp',
         template: 'Pedido finalizado com sucesso!' + data
         }).then(function(res) {
            $state.go('tab.dash');
       });
    });
  }

   $scope.cancela = function(){

     var confirmPopup = $ionicPopup.confirm({
       title: 'MarmitApp',
       template: 'Deseja realmente cancelar o seu pedido?',
        cancelText: 'Não',
        cancelType: 'button-default',
        okText: 'Sim',
        okType: 'button-positive'
     });

     confirmPopup.then(function(res) {
       if(res) {
        limpa();
        $state.go('tab.dash');
       } else {
         console.log(res);
       }
     });

  }
   
});

