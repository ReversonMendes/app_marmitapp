angular.module('pagamento.controllers', [])

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

    if(typeof $localstorage.get('remover') == 'undefined' ){
      $scope.remover =  '';
    }else{
      $scope.remover =  'Tirar '+ $localstorage.get('remover');
    }
    
    $scope.total = parseFloat($scope.valor) * parseFloat($scope.quantidade);
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

