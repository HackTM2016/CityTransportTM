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
});
