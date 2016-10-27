angular.module('apf.appModule').service( 'apf.notificationService', ['Notifications', '$timeout',
  function (Notifications, $timeout) {
    'use strict';

    var $this = this;

    var currentTime = (new Date()).getTime();

    var updateUnreadCount = function (group) {
      if (group) {
        group.unreadCount = group.notifications.filter(function (notification) {
          return notification.unread;
        }).length;
      }
    };

    this.notificationDrawerHidden = true;
    this.toastDelay = 8000;

    this.toggleNotficationDrawerHidden = function () {
      var found = false;

      this.notificationDrawerHidden = !this.notificationDrawerHidden;
      if (!this.notificationDrawerHidden) {
        this.notificationGroups.forEach(function (group) {
          if (!found && group.unreadCount > 0) {
            group.open = true;
            found = true;
          } else {
            group.open = false;
          }
        });
      }
    };

    this.tasks = {
      notificationType: 'task',
      heading: "Tasks",
      unreadCount: 0,
      notifications: [
        {
          id: 1001,
          unread: true,
          notificationType: 'task',
          data: {
            message: 'Deployment "OSE Deploy" was canceled',
            status: 'warning',
            inProgress: false,
            percentComplete: 100,
            startTime: currentTime - (22 * 60 * 60 * 1000),
            endTime: currentTime - (24 * 60 * 60 * 1000)
          },
          timeStamp: currentTime - (24 * 60 * 60 * 1000)
        }
      ]
    };


    this.events = {
      notificationType: 'event',
      heading: "Events",
      unreadCount: 0,
      notifications: [
        {
          id: 2001,
          unread: false,
          data: {
            message: '2 Servers with RHEL 7.2 were retired',
            status: 'info'
          },
          timeStamp: currentTime - (1 * 60 * 60 * 1000)
        },
        {
          id: 2002,
          unread: false,
          data: {
            message: 'Request denied for provisioning a server',
            status: 'error'
          },
          timeStamp: currentTime - (2 * 60 * 60 * 1000)
        },
        {
          id: 2003,
          unread: false,
          data: {
            message: '2 Servers with RHEL 7.2 were edited',
            status: 'info'
          },
          timeStamp: currentTime - (10 * 60 * 60 * 1000)
        },
        {
          id: 2004,
          unread: false,
          data: {
            message: 'Request create for provisioning a server',
            status: 'info'
          },
          timeStamp: currentTime - (12 * 60 * 60 * 1000)
        },
        {
          id: 2005,
          unread: false,
          data: {
            message: '2 Servers with RHEL 7.2 will retire in 10 days',
            status: 'warning'
          },
          timeStamp: currentTime - ((24 * 10 + 1) * 60 * 60 * 1000)
        },
        {
          id: 2006,
          unread: false,
          data: {
            message: '2 Servers with RHEL 7.2 were scheduled to be retired in 14 days',
            status: 'info'
          },
          timeStamp: currentTime - ((24 * 14 + 1) * 60 * 60 * 1000)
        },
        {
          id: 2007,
          unread: false,
          data: {
            message: 'Request to provision a server succeeded',
            status: 'success'
          },
          timeStamp: currentTime - ((24 * 16 - 5) * 60 * 60 * 1000)
        }
      ]
    };

    this.notificationGroups = [this.tasks, this.events];
    updateUnreadCount(this.tasks);
    updateUnreadCount(this.events);

    this.toastNotifications = [];

    this.removeToast = function (notification) {
      var index = $this.toastNotifications.indexOf(notification);
      if (index > -1) {
        $this.toastNotifications.splice(index, 1);
      }
    };

    this.showToast = function (notification) {
      notification.show = true;
      console.log("Adding toast notification");
      this.toastNotifications.push(notification);

      if (notification.status !== 'danger' && notification.status !== 'error') {
        $timeout(function () {
          notification.show = false;
          if (!notification.viewing) {
            $this.removeToast(notification);
          }
        }, this.toastDelay);
      }
    };

    this.addNotification = function (notificationType, status, message, notificationData, id) {
      var newNotification = {
        id: id,
        notificationType: notificationType,
        unread: true,
        status: status,
        type: status,
        message: message,
        data: notificationData,
        timeStamp: (new Date()).getTime()
      };
      var group = this.notificationGroups.find(function (notificationGroup) {
        return notificationGroup.notificationType === notificationType;
      });

      if (group) {
        if (group.notifications) {
          group.notifications.splice(0, 0, newNotification);
        } else {
          group.notifications = [newNotification];
        }
        updateUnreadCount(group);
      }
      this.showToast(newNotification);
    };

    this.updateNotification = function (notificationType, status, message, notificationData, id, showToast) {
      var notification;
      var group = this.notificationGroups.find(function (notificationGroup) {
        return notificationGroup.notificationType === notificationType;
      });

      if (group) {
        notification = group.notifications.find(function (notification) {
          return notification.id === id;
        });

        if (notification) {
          if (showToast) {
            notification.unread = true;
          }
          notification.status = status;
          notification.type = status;
          notification.message = message;
          notification.data = notificationData;
          notification.timeStamp = (new Date()).getTime();
          updateUnreadCount(group);
        }
      }

      if (showToast) {
        if (!notification) {
          notification = {
            status: status,
            type: status,
            message: message
          };
        }

        this.showToast(notification);
      }
    };

    this.setViewingToastNotification = function (notification, viewing) {
      notification.viewing = viewing;
      if (!viewing && !notification.show) {
        this.removeToast(notification);
      }
    };

    this.dismissToastNotification = function (notification) {
      notification.show = false;
      this.removeToast(notification);
    };

    this.markNotificationRead = function (notification, group) {
      if (notification) {
        notification.unread = false;
      }
      if (group) {
        updateUnreadCount(group);
      } else {
        this.notificationGroups.forEach(function (group) {
          updateUnreadCount(group);
        });
      }
    };

    this.markNotificationUnread = function (notification, group) {
      if (notification) {
        notification.unread = true;
      }
      if (group) {
        updateUnreadCount(group);
      } else {
        this.notificationGroups.forEach(function (group) {
          updateUnreadCount(group);
        });
      }
    };

    this.markAllNotificationsRead = function (group) {
      if (group) {
        group.notifications.forEach(function (notification) {
          notification.unread = false;
        });
        group.unreadCount = 0;
      }
    };

    this.markAllNotificationsUnread = function (group) {
      if (group) {
        group.notifications.forEach(function (notification) {
          notification.unread = true;
        });
        group.unreadCount = group.notifications.length();
      }
    };

    this.clearNotifcation = function (notification, group) {
      var index;

      if (!group) {
        group = this.notificationGroups.find(function (nextGroup) {
          return notification.notificationType === nextGroup.notificationType;
        });
      }

      if (group) {
        index = group.notifications.indexOf(notification);
        if (index > -1) {
          group.notifications.splice(index, 1);
          updateUnreadCount(group);
        }
      }
    };

    this.clearAllNotifications = function (group) {
      if (group) {
        group.notifications = [];
        updateUnreadCount(group);
      }
    };
  }
]);
