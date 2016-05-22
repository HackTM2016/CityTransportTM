/**
 * Created by NM on 5/21/2016.
 */

app.service("StationsService", function ($http) {
  this.getAll = function() {
    console.log("getting all stations");
    return $http.get(backendApi + "get_stations");
  };
  this.get = function(line_types) {
      return $http.get(backendApi + "get_stations?line_types=" +line_types );
  };
  this.getNearest = function(lat, lng, count) {
    return $http.get(backendApi + "get_nearby_stations?lat=" + lat + "&lng=" + lng + "&count=" + count);
  };

});
