/**
 * Created by NM on 5/21/2016.
 */

app.service("StationsService", function ($http) {
  this.getAll = function() {
    console.log("getting all stations");
    return $http.get(backendApi + "get_stations");
  };

  this.getNearest = function(lat, lng, count) {
    return $http.get(backendApi + "get_nearby_stations?lat=" + lat + "&lng=" + lng + "&count=" + count);
  };

});
