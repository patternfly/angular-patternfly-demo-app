angular.module('apf.containers.providersModule').controller('containers.providerController', ['$scope','ChartsDataMixin', 'DashboardUtils', '$translate', '$resource', '$routeParams',
    function ( $scope, chartsDataMixin, dashboardUtils, $translate, $resource, $routeParams ) {
      'use strict';

      var currentId = $routeParams.id;

      $scope.chartHeight = chartsDataMixin.dashboardSparklineChartHeight;
      $scope.dashboardHeatmapChartHeight = chartsDataMixin.dashboardHeatmapChartHeight;

      if (typeof(currentId) === "undefined") {
        currentId = "openshift";
      }
      $scope.navigaition = currentId;

      $scope.providerCount = 0;
      $scope.providerType = 'openshift';

      $scope.getProviderTypeImage = function () {
        if ($scope.providerType === 'openshift') {
          return "bower_components/patternfly/dist/img/Openshift-Logo-Notext.svg";
        } else if ($scope.providerType === 'kubernetes') {
          return "bower_components/patternfly/dist/img/kubernetes.svg";
        } else if ($scope.providerType === 'atomic') {
          return "bower_components/patternfly/dist/img/RH_Atomic-Logo-NoText.svg";
        } else {
          return '';
        }
      };

      $scope.objectStatus = {
        nodes:      dashboardUtils.createNodesStatus(),
        containers: dashboardUtils.createContainersStatus(),
        registries: dashboardUtils.createRegistriesStatus(),
        projects:   dashboardUtils.createProjectsStatus(),
        pods:       dashboardUtils.createPodsStatus(),
        services:   dashboardUtils.createServicesStatus(),
        images:     dashboardUtils.createImagesStatus(),
        routes:     dashboardUtils.createRoutesStatus()
      };

      //Get the container data
      $resource('mock_data/containers/providers/status/' + currentId).get(function (response) {
        var data = response.data;
        $scope.providerType = data.providers.type;
        $scope.providerCount = data.providers.count;
        dashboardUtils.updateStatus($scope.objectStatus.nodes, data.nodes);
        dashboardUtils.updateStatus($scope.objectStatus.containers, data.containers);
        dashboardUtils.updateStatus($scope.objectStatus.registries, data.registries);
        dashboardUtils.updateStatus($scope.objectStatus.projects, data.projects);
        dashboardUtils.updateStatus($scope.objectStatus.pods, data.pods);
        dashboardUtils.updateStatus($scope.objectStatus.services, data.services);
        dashboardUtils.updateStatus($scope.objectStatus.images, data.images);
        dashboardUtils.updateStatus($scope.objectStatus.routes, data.routes);
      });

      $scope.cpuUsageConfig = chartConfig.cpuUsageConfig;
      $scope.cpuUsageSparklineConfig = {
        tooltipType: 'valuePerDay',
        chartId: 'cpuSparklineChart'
      };
      $scope.cpuUsageDonutConfig = {
        chartId: 'cpuDonutChart',
        thresholds: {'warning':'60','error':'90'}
      };
      $scope.memoryUsageConfig = chartConfig.memoryUsageConfig;
      $scope.memoryUsageSparklineConfig = {
        tooltipType: 'valuePerDay',
        chartId: 'memorySparklineChart'
      };
      $scope.memoryUsageDonutConfig = {
        chartId: 'memoryDonutChart',
        thresholds: {'warning':'60','error':'90'}
      };

      $scope.utilizationLoadingDone = false;
      $resource('mock_data/containers/dashboard/utilization').get(function (response) {
        $scope.cpuUsageData = chartsDataMixin.getCpuUsageDataFromResponse(response, $scope.cpuUsageConfig.usageDataName);
        $scope.memoryUsageData = chartsDataMixin.getMemoryUsageDataFromResponse(response, $scope.memoryUsageConfig.usageDataName);
        $scope.utilizationLoadingDone = true;
      });

      // Network Utilization

      $scope.networkUtilizationCurrentConfig = chartConfig.currentNetworkUsageConfig;
      $scope.networkUtilizationCurrentConfig.tooltipFn = chartsDataMixin.sparklineTimeTooltip;

      $scope.networkUtilizationDailyConfig = chartConfig.dailyNetworkUsageConfig;

      $scope.networkUtilizationLoadingDone = false;
      $resource('mock_data/containers/dashboard/utilization').get(function (response) {
        var data = response.data;
        $scope.currentNetworkUtilization = chartsDataMixin.getSparklineData(data.currentNetworkUsageData, $scope.networkUtilizationCurrentConfig.dataName, 60);
        chartsDataMixin.continuouslyUpdateData($scope.currentNetworkUtilization, 60 * 1000);
        $scope.dailyNetworkUtilization = chartsDataMixin.getSparklineData(data.dailyNetworkUsageData, $scope.networkUtilizationDailyConfig.dataName);
        $scope.networkUtilizationLoadingDone = true;
      });

      // Trends

      $scope.podTrendConfig = chartConfig.podTrendConfig;
      $scope.podTrendsLoadingDone = false;
      $resource('mock_data/containers/dashboard/pods').get(function (response) {
        var data = response.data;
        $scope.podTrends = chartsDataMixin.getSparklineData(data.podTrends, $scope.podTrendConfig.dataName);
        $scope.podTrendsLoadingDone = true;
      });

      $scope.imageTrendConfig = chartConfig.imageTrendConfig;
      $scope.imageTrendLoadingDone = false;
      $resource('mock_data/containers/dashboard/image-trends').get(function (response) {
        var data = response.data;
        $scope.imageTrends = chartsDataMixin.getSparklineData(data.imageTrends, $scope.imageTrendConfig.dataName);
        $scope.imageTrendLoadingDone = true;
      });

      // HeatMaps

      $scope.nodeCpuUsage = {
        title: 'CPU',
        id: 'nodeCpuUsageMap',
        loadingDone: false
      };
      $scope.nodeMemoryUsage = {
        title: 'Memory',
        id: 'nodeMemoryUsageMap',
        loadingDone: false
      };

      $scope.heatmaps = [$scope.nodeCpuUsage, $scope.nodeMemoryUsage];

      $resource('mock_data/containers/dashboard/node-cpu-usage').get(function (response) {
        var data = response.data;
        $scope.nodeCpuUsage.data = data.nodeCpuUsage;
        $scope.nodeCpuUsage.loadingDone = true;
      });

      $resource('mock_data/containers/dashboard/node-memory-usage').get(function (response) {
        var data = response.data;
        $scope.nodeMemoryUsage.data = data.nodeMemoryUsage;
        $scope.nodeMemoryUsage.loadingDone = true;
      });

      $scope.nodeHeatMapUsageLegendLabels = chartsDataMixin.nodeHeatMapUsageLegendLabels;
    }
]);
