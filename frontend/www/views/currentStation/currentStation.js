/**
 * Created by NM on 5/21/2016.
 */

console.log("current controller loading");

appControllers

  .controller('CurrentStationController', function($scope, $rootScope, RoutesService, $http) { // uiGmapGoogleMapApi
    console.log("current station controller loaded");
    $scope.visible = false;
    $scope.lines = [];
    $scope.station = [];

    $scope.init = function () {
      $scope.$on('loadCurrentStation', function() {
        if($scope.currentStation) {
          $scope.loadStation($rootScope.currentStation);
        }
      });
      if(!$rootScope.currentStation){
        $scope.visible = false;
        return;
      }
      $scope.loadStation($rootScope.currentStation);
    };

    $scope.loadStation = function (station) {
      if(!$scope.station || ($scope.station.station_id != station.station_id)){
        lines = [];
      }
      $scope.visible = true;
      $scope.station = station;
      console.log("currentStation: ", station);
      $scope.loadData();
    };

    $scope.loadData = function() {
      RoutesService.getRoutesForStation($scope.station.station_id).then(function(data){

        console.log("got routes for station", data);
        $scope.lines = data.data.lines;
    });
    };

    $scope.init();
  });
