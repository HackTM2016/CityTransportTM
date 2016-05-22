/**
 * Created by NM on 5/21/2016.
 */


app.service("RoutesService", function ($http) {
  this.getAll = function() {
    return $http.get(backendApi + "get_lines");
  };
  this.get = function(line_types) {
    return $http.get(backendApi + "get_lines?line_types=" + line_types);
  };
  this.getRoute = function(line_id) {
    return $http.get(backendApi + "get_routes?line_id=" + line_id);
  };
  this.getTimes = function(line_id, route_id) {
    return $http.get(backendApi + "get_arrival_times?line_id=" + line_id + "&route_id=" + route_id );
  };
});
