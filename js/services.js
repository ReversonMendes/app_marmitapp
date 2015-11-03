angular.module('starter.services', [])

.factory('Cardapios', function($http) {
  var cardapios = [];
  var ingredientes = [];

  //Busca todos os cardapios publicado de todas as empresas
  var getCardapios = function () {
    return $http.get("http://www.marmitapp.com.br/api/listaCardapio.php");
  };
  //Busca todos os ingrdientes de um prato ou cardapio
  var getIngredientes = function (idcardapio) {
    return $http.get("http://www.marmitapp.com.br/api/listaIngrediente.php?cardapio_id="+idcardapio)
  };

  //Busca todos os preços de uma empresa
  var getPrecos = function (idempresa) {
    return $http.get("http://www.marmitapp.com.br/api/listaPrecos.php?empresa_id="+idempresa);
  };

    //Busca todos os preços de uma empresa
  var getFormaPagamento = function (idempresa) {
    return $http.get("http://www.marmitapp.com.br/api/listaFormaPagamento.php?empresa_id="+idempresa);
  };

      //Manda o pedido do usuário
  var postPedido = function (pedido) {
    return $http.post("http://localhost/api/postPedido.php", {dados: pedido});
  };


  return {
    all: function() {
      return getCardapios();
    },

    allIngredientes: function(idcardapio) {
      return getIngredientes(idcardapio);
    },


    allprecos: function(idempresa) {
      return getPrecos(idempresa);
    },

    allFormaPagamento: function(idempresa) {
      return getFormaPagamento(idempresa);
    },

    postPedido: postPedido

  };
});