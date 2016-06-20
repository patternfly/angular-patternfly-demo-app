angular.module('apf.containers.projectsModule').controller('containers.projectController', ['$scope', 'ChartsDataMixin', 'DashboardUtils', '$translate', '$resource', '$routeParams',
  function ($scope, chartsDataMixin, dashboardUtils, $translate, $resource, $routeParams) {
    'use strict';

    var currentId = $routeParams.id;

    $scope.chartHeight = chartsDataMixin.dashboardSparklineChartHeight;
    $scope.dashboardHeatmapChartHeight = chartsDataMixin.dashboardHeatmapChartHeight;

    if (typeof(currentId) === "undefined") {
      currentId = "openshift";
    }

    //This needs to come from a base request
    $scope.navigaition = currentId;

    $scope.objectStatus = {
      pods:       dashboardUtils.createPodsStatus(),
      routes:     dashboardUtils.createRoutesStatus(),
      images:     dashboardUtils.createImagesStatus(),
      containers: dashboardUtils.createContainersStatus(),
      services:   dashboardUtils.createServicesStatus(),
      registries: dashboardUtils.createRegistriesStatus()
    };

    // Status Cards
    $resource('mock_data/containers/projects/status/:id').get({id: currentId}, function (response) {
      var data = response.data;
      dashboardUtils.updateStatus($scope.objectStatus.pods, data.pods);
      dashboardUtils.updateStatus($scope.objectStatus.routes, data.routes);
      dashboardUtils.updateStatus($scope.objectStatus.images, data.images);
      dashboardUtils.updateStatus($scope.objectStatus.containers, data.containers);
      dashboardUtils.updateStatus($scope.objectStatus.services, data.services);
      dashboardUtils.updateStatus($scope.objectStatus.registries, data.registries);
    });


    // Quotas

    $resource('mock_data/containers/projects/quotas/:id').get({id: currentId}, function (response) {
      var data = response.data;
      $scope.quotas = data;
    });
    // Node Utilization

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
