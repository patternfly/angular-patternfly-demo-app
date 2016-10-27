angular.module('apf.appModule').controller( 'apf.notificationsController', ['$scope', '$rootScope', 'apf.notificationService',
  function ( $scope, $rootScope, notificationService ) {
    'use strict';

    $scope.drawerTitle = 'Notifications Drawer';
    $scope.clearAllTitle = 'Clear All';

    $scope.titleHtml = 'src/app/controllers/drawer-title.html';
    $scope.headingHTML = 'src/app/controllers/heading.html';
    $scope.notificationHTML = 'src/app/controllers/notification-body.html';
    $scope.notificationFooterHTML = 'src/app/controllers/notification-footer.html';

    $scope.hideDrawer = true;
    $rootScope.$on('toggle-notification-drawer', function () {
      $scope.hideDrawer = !$scope.hideDrawer;
    });

    $scope.groups = notificationService.notificationGroups;
    $scope.$watch(function () {
      return notificationService.notificationDrawerHidden;
    },
    function () {
      $scope.hideDrawer = notificationService.notificationDrawerHidden;
    });
    $scope.toastNotifications = notificationService.toastNotifications;

    $scope.updateViewingToast = function (viewing, toastNotification) {
      notificationService.setViewingToastNotification(toastNotification, viewing);
    };

    $scope.customScope = {
      drawerExpanded: false,
      getNotficationStatusIconClass: function (notification) {
        var retClass = '';
        if (notification && notification.data && notification.data.status) {
          if (notification.data.status === 'info') {
            retClass = "pficon pficon-info";
          } else if (notification.data.status === 'error') {
            retClass = "pficon pficon-error-circle-o";
          } else if (notification.data.status === 'warning') {
            retClass = "pficon pficon-warning-triangle-o";
          } else if (notification.data.status === 'success') {
            retClass = "pficon pficon-ok";
          }
        }
        return retClass;
      },
      markNotificationRead: function (notification, group) {
        notificationService.markNotificationRead(notification, group);
      },
      clearNotification: function (notification, group) {
        notificationService.clearNotifcation(notification, group);
      },
      clearAllNotifications: function (group) {
        notificationService.clearAllNotifications(group);
      },
      toggleExpandDrawer: function () {
        $scope.customScope.drawerExpanded = !$scope.customScope.drawerExpanded;

      }
    };
  }
]);
