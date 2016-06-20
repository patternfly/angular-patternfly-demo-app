angular.module('apf.appModule').controller( 'apf.navBarController', ['$scope', '$rootScope', 'apf.notificationService',
  function ($scope, $rootScope, notificationService) {
    'use strict';

    var findNewNotifications = function () {
      var notificationGroups = notificationService.notificationGroups;
      var found = false;
      notificationGroups.forEach(function (group) {
        if (group.unreadCount > 0) {
          found = true;
        }
      });
      return found;
    };

    $scope.toggleNotificationDrawer = function () {
      notificationService.toggleNotficationDrawerHidden();
    };

    $scope.newNotifications = findNewNotifications();

    $scope.$watch(function () {
      return notificationService.notificationGroups;
    },
    function () {
      $scope.newNotifications = findNewNotifications();
    }, true);
  }
]);
