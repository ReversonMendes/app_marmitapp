// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova','starter.controllers', 'starter.services'])

.run(function($ionicPlatform,$ionicPopup) {
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
      if(navigator.connection.type == Connection.NONE){
        $ionicPopup.alert({
          title: 'Atenção',
          content: 'você não está conectado na internet.'
        });
      }
    }
    var div = document.getElementById("map_canvas");
    var map = plugin.google.maps.Map.getMap(div);

    // if (window.plugin) {
    //    // map = window.plugin.google.maps.Map;//.getMap(div);
    //     console.log("map");
    //   // var request = {
    //   //   'position': -25.729435499999997
    //   // };
    //   // plugin.google.maps.Geocoder.geocode(request, function(position) {
    //   //   if (position.length) {
    //   //     var result = results[0];
    //   //     var position = result.position; 
    //   //     var address = [
    //   //       result.subThoroughfare || "",
    //   //       result.thoroughfare || "",
    //   //       result.locality || "",
    //   //       result.adminArea || "",
    //   //       result.postalCode || "",
    //   //       result.country || ""].join(", ");

    //   //       console.log(address);

    //   //     map.addMarker({
    //   //       'position': position,
    //   //       'title':  address
    //   //     });
    //   //   } else {
    //   //     alert("Not found");
    //   //   }
    //   // });
    // }

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
      url: '/pedido/:cardapioId/:empresaId',
      views: {
        'tab-pedido': {
          templateUrl: 'templates/tab-pedido.html',
          controller: 'IngredienteCtrl'
        }
      }
    })

    // .state('tab.pedido-detail', {
    //   url: '/pedido/:cardapioId',
    //   views: {
    //     'tab-pedido': {
    //       templateUrl: 'templates/pedido-detail.html',
    //       controller: 'CardapioDetailCtrl'
    //     }
    //   }
    // })

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
    url: '/pagamento',
    views: {
      'tab-pagamento': {
        templateUrl: 'templates/tab-pagamento.html',
        controller: 'PagamentoCtrl'
      }
    }
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
