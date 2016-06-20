angular.module('apf.appModule').directive('apfNotificationList', function () {
  'use strict';

  return {
    restrict: 'A',
    templateUrl: 'src/app/directives/notifications/notification-list.html',
    controller: function ($scope, $rootScope) {
//      $scope.notifications = $rootScope.notifications;
    }
  };
});
