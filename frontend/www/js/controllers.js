var appControllers = angular.module('starter.controllers', [])

  .controller('NavMenuController', function($scope, $rootScope, RoutesService, $location, $ionicHistory) {
    console.log("NavMenuController loaded");
    $scope.backButtonPressed = function() {
      $backView = $ionicHistory.backView();
      if($backView)
        $backView.go();
      console.log("backButtonPressed");
    };
  })
;
