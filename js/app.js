// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova','cardapios.controllers','pedidos.controllers', 'localentrega.controllers','pagamento.controllers' ,'starter.services','pedido.services','login.controllers'])

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

    if($localstorage.get('nome') == '' || $localstorage.get('nome') == null){
        $ionicPopup.prompt({
            title: 'Informe o seu nome',
            inputType: 'text',
            showBackdrop: false
        })
        .then(function(result) {
            if(result !== undefined) {
                $localstorage.set('nome',result)
            } else {
                console.log("Action not completed");
            }
        });
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

    .state('tab.login', {
      url: '/login',
      views: {
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl' 
      }
    })

  .state('tab.conta', {
      url: '/conta',
      views: {
        'tab-conta': {  
          templateUrl: 'templates/conta.html',
          controller: 'LoginCtrl'
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
