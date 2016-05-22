/**
 * Created by NM on 5/21/2016.
 */

console.log("map controller loading");

appControllers

  .controller('MapController', function($scope, StationsService, $http, $rootScope) { // uiGmapGoogleMapApi
    console.log("map controller loaded");

    $scope.map = { control: {}, center: { latitude: 45.745139, longitude: 21.241582 }, zoom: 13 };
    $scope.myPosition = {latitude: 45.7456645, longitude: 21.2411096};
    //map = $scope.map.control.getGMap();

    // StationsService.getNearest($scope.myPosition.latitude, $scope.myPosition.longitude, 10).then(function(data) {
    //   data.data.stations.forEach(function(station){
    //     // console.log(station);
    //     var buildingMarker =
    //       new google.maps.Marker(
    //         {
    //           position: new google.maps.LatLng(station.lat, station.lng),
    //           title: station.friendly_name
    //           // icon: '../../img/tramvaie.png'
    //         }
    //       );
    //     $scope.markers.push(buildingMarker);
    //     buildingMarker.setMap($scope.map.control.getGMap());
    //     buildingMarker.addListener('click', $scope.markerClick);
    //   });
    // }).catch(function(data){
    //   console.log("err getting nearest stations");
    //   console.log(data);
    // });

    var stationWindow =  new google.maps.InfoWindow({
      content: contentStr
    });

    $scope.markerClick = function () {
     // console.log("clicked st: ", this, this.station);
      $rootScope.currentStation = this.station;
      $rootScope.$broadcast('loadCurrentStation');
    };
    //
    $scope.markers = [];

    // instantiate google map objects for directions
    // var directionsDisplay = new google.maps.DirectionsRenderer();
    // var directionsService = new google.maps.DirectionsService();
    // var geocoder = new google.maps.Geocoder();

    // // directions object -- with defaults
    // $scope.directions = {
    //   destination: "Strada Arieș 1, Timișoara",
    //   origin: "Strada 1 Decembrie 1918 96, Timișoara",
    //   showList: false
    // };
    //
    // // get directions using google maps api
    //
    // $scope.getDirections = function (origin, destination, transportType) {
    //   var request = {
    //     origin: origin,
    //     destination: destination,
    //     travelMode: google.maps.DirectionsTravelMode.TRANSIT,
    //     transitOptions: {modes: [google.maps.TransitMode[transportType]]}
    //   };

    //   directionsService.route(request, function (response, status) {
    //     if (status === google.maps.DirectionsStatus.OK) {
    //       directionsDisplay.setDirections(response);
    //       directionsDisplay.setMap($scope.map.control.getGMap());
    //       directionsDisplay.setOptions({ suppressMarkers: true });
    //       directionsDisplay.setPanel(document.getElementById('directionsList'));
    //       $scope.directions.showList = true;
    //     } else {
    //       console.log(response, status);
    //       console.log('Google route unsuccesfull!');
    //     }
    //   });
    // };
    var showStations = function (stations) {
      stations.forEach(function (station, i) {
        if (station.lat && station.lng){
          if (i === 0 || i === stations.length-1) {
            var iconUrl = '../../img/start_2.png'
          } else {
            var iconUrl = '../../img/tramvaie.png'
          }
            var marker = new google.maps.Marker(
                {
                  position: {lat: station.lat, lng: station.lng},
                  title: station.friendly_name,
                  icon: iconUrl
                }
              );
              marker.station = station;
              $scope.markers.push(marker)
              marker.setMap($scope.map.control.getGMap());
              marker.addListener('click', $scope.markerClick);
        } else {
          // console.log(station.lat);
          // console.log(station.lng);
        }
      });
    };
    var showRoute = function () {
      $http.get(backendApi + 'get_stations')
        .then(function (res) {
          var stations = res.data.stations;
          console.log(stations);
          // var start = {lat: stations[0].lat, lng: stations[0].lng};
          // var end = {lat: stations[stations.length-1].lat, lng: stations[stations.length-1].lng};
          // console.log(end);
          // console.log(start);
          // $scope.getDirections(start, end, transportType);
          showStations(stations);
        })
    };
    showRoute();

  });

var contentStr = "<div><h2>Mergeee!</h2></div>";
