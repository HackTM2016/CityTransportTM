// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'google-maps'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
  .config(['$ionicConfigProvider', function($ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('top'); // other values: top

}])
.config(function($stateProvider, $urlRouterProvider) { //uiGmapGoogleMapApiProvider

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'views/tabs/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
    .state('view', {
      url: '/view',
      abstract: true,
      templateUrl: 'views/tabs/tabs.html'
    })
    .state('view.map', {
      url: '/map',
      views: {
        'view-map': {
          templateUrl: 'views/map/map.html',
          controller: 'MapController'
        }
      }
    })
    .state('view.route', {
      url: '/route',
      views: {
        'view-route': {
          templateUrl: 'views/route/route.html',
          controller: 'RouteController'
        }
      }
    })
    .state('view.routeMap', {
      url: '/routeMap',
      views: {
        'view-route-map': {
          templateUrl: 'views/routeMap/routeMap.html',
          controller: 'RouteMapController'
        }
      }
    })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

  // uiGmapGoogleMapApiProvider.configure({
  //   //    key: 'your api key',
  //   v: '3.22', //defaults to latest 3.X anyhow
  //   libraries: 'weather,geometry,visualization'
  // });
});
