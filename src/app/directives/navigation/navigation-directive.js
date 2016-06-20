angular.module('apf.navigation').directive('apfNavigation', ['$location', '$rootScope', function (location, rootScope) {
  'use strict';
  var navigationController = ['$scope', function ($scope) {
    rootScope.$on( "$routeChangeSuccess", function (event, next, current) {
      var updatedRoute = "#" + location.path();

      clearActiveItems($scope);

      //Setting active state on load
      $scope.items.forEach(function (topLevel) {
        if (topLevel.children) {
          topLevel.children.forEach(function (secondLevel) {
            if (updatedRoute.indexOf(secondLevel.href) > -1) {
              secondLevel.class = "active";
              topLevel.class = "active";
            }
          });
        }
      });

    });
  }];

  var clearActiveItems = function ($scope) {
    $scope.items.forEach(function eachItem (item) {
      if (item.children) {
        item.class = "";
        item.children.forEach(eachItem);
      } else {
        item.class = "";
      }
    });
  };

  return {
    restrict: 'A',
    scope: {
      items: '='
    },
    replace: true,
    templateUrl: 'src/app/directives/navigation/navigation.html',

    link: function ($scope) {
      //wrapping this in a watcher to make sure state is set correctly
      $scope.$watch('items', function (newVal, oldVal) {
        var updatedRoute = "#" + location.path();
        if (oldVal.length === 0) {
          //Setting active state on load
          $scope.items.forEach(function (topLevel) {
            if (topLevel.children) {
              topLevel.children.forEach(function (secondLevel) {
                if (updatedRoute.indexOf(secondLevel.href) > -1) {
                  secondLevel.class = "active";
                  topLevel.class = "active";
                }
              });
            }
          });
        }
      }, true);
    },
    controller: navigationController
  };
}]);

