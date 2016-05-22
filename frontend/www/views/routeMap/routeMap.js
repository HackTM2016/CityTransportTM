/**
 * Created by NM on 5/22/2016.
 */

console.log("route map controller loading");

appControllers

  .controller('RouteMapController', function($scope, StationsService, $rootScope, $location) { // uiGmapGoogleMapApi
    console.log("route map controller loaded");
    $scope.map = { control: {}, center: { latitude: 45.745139, longitude: 21.241582 }, zoom: 13 };
    $scope.myPosition = {latitude: 45.7456645, longitude: 21.2411096};

    $scope.$on('loadRouteOnMap', function(){
      var selectedRoute = $rootScope.selectedRoute;
      console.log("loading map for route ", selectedRoute);
    });

    $scope.init = function () {
      if($rootScope.selectedRoute == undefined) {
        $location.path('/view/route');
        return;
      }
      $scope.$on('loadRouteOnMap', function() {
        $scope.loadRoute($rootScope.selectedRoute);
      });
      $scope.loadRoute($rootScope.selectedRoute);
    };

    $scope.loadRoute = function(route) {
      console.log("loading route(maps): ", route);
    };

    $scope.init();
  });
