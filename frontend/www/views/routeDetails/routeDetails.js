/**
 * Created by NM on 5/22/2016.
 */

console.log("route details controller loading");

appControllers

  .controller('RouteDetailsController', function($scope, StationsService, $rootScope, $location) {
    console.log("route details controller loaded");

    $scope.init = function () {
      if($rootScope.selectedRoute == undefined) {
        $location.path('/view/route');
      }
      $scope.$on('openRouteDetails', function() {
        $scope.loadRoute($rootScope.selectedRoute);
      });
      $scope.loadRoute($rootScope.selectedRoute);
    };

    $scope.loadRoute = function(route) {
      console.log("loading route(details): ", route);
    };

    $scope.init();
  });
