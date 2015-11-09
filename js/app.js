angular.module('starter', ['ionic', 'ngCordova','cardapios.controllers','pedidos.controllers', 'localentrega.controllers','pagamento.controllers' ,'api.services','local.services','login.controllers','conta.controllers'])

.run(function($ionicPlatform,$ionicPopup,$localstorage,$state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    if(window.Connection){
      if(navigator.connection.type == Connection.NONE ){
        $ionicPopup.alert({
          title: 'Atenção',
          content: 'você não está conectado na internet.'
        });
      }
    }

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'CardapiosCtrl'
      }
    }
  })
  

  .state('tab.pedido', {
      url: '/pedido/:cardapioId/:empresaId/:nomeprato',
      views: {
        'tab-pedido': {
          templateUrl: 'templates/tab-pedido.html',
          controller: 'IngredienteCtrl'
        }
      }
    })


  .state('tab.conta', {
      url: '/conta',
      views: {
        'tab-conta': {  
          templateUrl: 'templates/conta.html',
          controller: 'ContaCtrl'
        }
      }
    })

  .state('tab.entrega', {
    url: '/entrega',
    views: {
      'tab-entrega': {
        templateUrl: 'templates/tab-entrega.html',
        controller: 'EntregaCtrl'
      }
    }
  })

    .state('tab.pagamento', {
    url: '/entrega',
    views: {
      'tab-entrega': {
        templateUrl: 'templates/tab-pagamento.html',
        controller: 'PagamentoCtrl'
      }
    }
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
