angular.module('starter.services', [])

.factory('Cardapios', function($http) {
  var cardapios = [];
  var ingredientes = [];

  //Busca todos os cardapios publicado de todas as empresas
  var getCardapios = function () {
    return $http.get("http://localhost:80/api/listaCardapio.php");
  };
  //Busca todos os ingrdientes de um prato ou cardapio
  var getIngredientes = function (idcardapio) {
    return $http.get("http://localhost:80/api/listaIngrediente.php?cardapio_id="+idcardapio)
  };

  //Busca todos os preços de uma empresa
  var getPrecos = function (idempresa) {
    return $http.get("http://localhost:80/api/listaPrecos.php?empresa_id="+idempresa);
  };

  return {
    all: function() {
      return getCardapios();
    },
    get: function(chatId) {
      for (var i = 0; i < cardapios.length; i++) {
        if (cardapios[i].id === parseInt(chatId)) {
          return cardapios[i];
        }
      }
      return null;
    },

    allIngredientes: function(idcardapio) {
      return getIngredientes(idcardapio);
    },
    // getIngrediente: function(chatId) {
    //   for (var i = 0; i < cardapios.length; i++) {
    //     if (cardapios[i].id === parseInt(chatId)) {
    //       return cardapios[i];
    //     }
    //   }
    //   return null;
    // }

    allprecos: function(idempresa) {
      return getPrecos(idempresa);
    }
    // getIngrediente: function(chatId) {
    //   for (var i = 0; i < cardapios.length; i++) {
    //     if (cardapios[i].id === parseInt(chatId)) {
    //       return cardapios[i];
    //     }
    //   }
    //   return null;
    // }

  };
});