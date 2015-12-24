angular.module('pagamento.controllers', [])

.controller('PagamentoCtrl', function($scope,$localstorage,Cardapios,$state,$ionicPopup,$ionicLoading,$ionicHistory, LoginService) {

    $scope.pedido = {};
    var valor = 0;
    var CarregarFormas = function() {
    Cardapios.allFormaPagamento($localstorage.get('idempresa')).success(function (data) {
        $scope.pagamentos = data;
        console.log($scope.pagamentos);
      }).error(function (data, status) {
        $scope.message = "Aconteceu um problema: " + data;
      });
    };
  
  $scope.$on('$ionicView.enter', function(e) {
   //recarrega toda vez que abre
    $scope.pedido = {};
    // monta scope de pedido
    $scope.pedido.nome = $localstorage.getObject('login').nome;
    $scope.pedido.nomeprato = $localstorage.get('prato');
    $scope.pedido.idcardapio = $localstorage.get('idcardapio');
    $scope.pedido.idpreco = $localstorage.getObject('preco').idpreco;
    $scope.pedido.quantidade = $localstorage.getObject('quantidade').valor;;
    $scope.pedido.localentrega =  $localstorage.getObject('localentrega');
    $scope.pedido.idempresa =  $localstorage.get('idempresa');
    if(typeof $localstorage.get('remover') == 'undefined' ){
      $scope.pedido.remover =  '';
    }else{
      $scope.pedido.remover =  $localstorage.get('remover');
    }

    //apresenta
    $scope.preco = $localstorage.getObject('preco');
    $scope.valor = $scope.preco.valor;
    valor = $scope.valor;
    $scope.valor = valor.replace(',','.');
    $scope.tamanho = $scope.preco.tamanho;
    $scope.total = parseFloat($scope.valor) * parseFloat($scope.pedido.quantidade);
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
     $localstorage.removeKey('idcardapio');
     $localstorage.removeKey('idempresa');
  };
  

  $scope.finalizarpedido = function(){
     if (typeof $localstorage.get('login') == 'undefined') {
      LoginService.init('templates/login.html', $scope).then(function(modal) {
        modal.show();
        $scope.$on();
      });
      return
     }

     if( typeof $scope.pedido.pagamento == 'undefined'){
         $ionicLoading.show({ template: 'Por favor selecione uma forma de pagamento', noBackdrop: true, duration: 3000 });
      }else if(typeof $localstorage.get('preco') == 'undefined'){
         $ionicLoading.show({ template: 'Você deve fazer o pedido antes de finalizar', noBackdrop: true, duration: 3000 });
      }else{
        Cardapios.postPedido( $scope.pedido )
        .success(function (data) { 
          console.log(data);
          if(data > 0){
            $ionicPopup.alert({
               title: 'MarmitApp',
               template: 'Pedido finalizado com sucesso!'
               }).then(function(res) {
                  $ionicHistory.clearHistory()
                  $state.go('tab.dash');
             });
            //devo pegar o idpedido do usuário e depois buscar o status do mesmo
            if(typeof $localstorage.get('idpedido') == 'undefined' ){
              $localstorage.set('idpedido',data);
            }else{
              $localstorage.set('idpedido',$localstorage.get('idpedido')+','+data);
            }
            limpa();      
          }else{
            $ionicPopup.alert({
               title: 'MarmitApp',
               template: 'Houve um problema ao finalizar o pedido tente novamente!' + data
               }).then(function(res) {
               //   $state.go('tab.dash');
             });
          }
        })

        .error(function (data, status) {
          console.log(data);
          $ionicPopup.alert({
             title: 'MarmitApp',
             template: 'Houve um problema ao finalizar o pedido tente novamente!' + data
             }).then(function(res) {
             //   $state.go('tab.dash');
           });
        });
      }

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
        //limpa tudo
        limpa();
        $ionicHistory.clearHistory()
        $state.go('tab.dash');
       } else {
         console.log(res);
       }
     });

  }
   
});

