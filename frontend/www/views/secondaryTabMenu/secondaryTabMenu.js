/**
 * Created by NM on 5/21/2016.
 */

appControllers
  .controller('SecondaryMenuController', function($scope, $rootScope) {
    console.log("secondary tabs menu controller loaded");
    $scope.selectedTT = 'bus';
    $scope.toogleTT = function (tt) {
        $scope.selectedTT = $rootScope.selectedTT = tt;
        $rootScope.$broadcast('toggleTT');
    };
  });

