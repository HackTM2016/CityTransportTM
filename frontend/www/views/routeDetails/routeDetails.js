/**
 * Created by NM on 5/22/2016.
 */

console.log("route details controller loading");

appControllers
  .controller('RouteDetailsController', function($scope, StationsService, RoutesService, $rootScope, $location) {
    console.log("route details controller loaded");
    $scope.routes = [];
    $scope.route_id = 0;
    $scope.route = null;
    $scope.interval = null;

    $scope.$on('$ionicView.leave', function() {
      console.log("on leave routeDetails");
      if($scope.interval){
        clearInterval($scope.interval);
      }
    });
    $scope.$on('$ionicView.enter', function() {
      console.log("on enter routeDetails");
      if($scope.interval){
        clearInterval($scope.interval);
      }
      $scope.interval = setInterval(function() {$scope.getTimes();}, 30000);
    });

    $scope.init = function () {
      $scope.$on('openRouteDetails', function() {
        $scope.loadRoute($rootScope.selectedRoute);
      });

      if($rootScope.selectedRoute == undefined) {
        $location.path('/view/route');
        return;
      }

      $scope.loadRoute($rootScope.selectedRoute);

      console.log($rootScope.selectedRoute);

    };

    $scope.loadRoute = function(route) {
      $scope.routes = [];
      $scope.route = route;
      console.log("loading route(details): ", route);
      RoutesService.getRoute(route.line_id).then(function (data) {
        //console.log("sdfdsf", data);
        $scope.routes = data.data.routes;
        $scope.getTimes();
      });

    };


    $scope.getTimes = function () {
      var crtRouteId = $scope.route_id;
      RoutesService.getTimes($scope.route.line_id, crtRouteId).then(function (data) {
        //console.log("got times");
        //console.log(data);
        data.data.arrivals.forEach(function (arrival) {

          $scope.routes[crtRouteId].stations.forEach(function (station) {
            if(station.station_id == arrival.station_id){
              station.arrivalTime = arrival.arrival;
              station.minutesLeft = arrival.minutes_left;
            }
          });
        });
      });
    };

    $scope.init();
  });
