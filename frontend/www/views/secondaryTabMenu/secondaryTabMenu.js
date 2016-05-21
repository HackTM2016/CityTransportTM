/**
 * Created by NM on 5/21/2016.
 */

appControllers
  .controller('SecondaryMenuController', function($scope, $rootScope) {
    console.log("secondary tabs menu controller loaded");
    $scope.toogleTT = function (tt) {
        $rootScope.$broadcast('toggleTT');
    };
  });

