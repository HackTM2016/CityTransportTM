/**
 * Created by NM on 5/22/2016.
 */

console.log("route map controller loading");

appControllers

  .controller('RouteMapController', function($scope, StationsService) { // uiGmapGoogleMapApi
    console.log("route map controller loaded");
    $scope.map = { control: {}, center: { latitude: 45.745139, longitude: 21.241582 }, zoom: 13 };
    $scope.myPosition = {latitude: 45.7456645, longitude: 21.2411096};
  });
