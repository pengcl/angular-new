"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/list', { //app首页
            templateUrl: 'views/list/list.html',
            controller: "listController"
        });
}]).controller('listController', ['$scope', '$rootScope', '$window', '$location', '$anchorScroll', 'LogSvc', 'ProductSvc', function ($scope, $rootScope, $window, $location, $anchorScroll, LogSvc, ProductSvc) {

    $location.hash();
    $anchorScroll();

    $scope.imgs = [
        {
            id: '10000097480440',
            list: ['/static/images/banner/list/10000097480440/1.jpg', '/static/images/banner/list/10000097480440/2.jpg']
        },
        {
            id: '10000097480426',
            list: ['/static/images/banner/list/10000097480426/1.jpg', '/static/images/banner/list/10000097480426/2.jpg']
        },
        {
            id: '10000098490415',
            list: ['/static/images/banner/list/10000098490415/1.jpg', '/static/images/banner/list/10000098490415/2.jpg', '/static/images/banner/list/10000098490415/3.jpg', '/static/images/banner/list/10000098490415/4.jpg']
        }
    ];

    $scope.id = $location.search().id || '';
    $scope.subId = $location.search().subId || '';

    $scope.imgUrls = $scope.imgs[getIndex($scope.imgs, 'id', $scope.id || '10000097480440')].list;

    $scope.isLoading = true;
    $scope.page = 1;
    $scope.totalPages = 1;
    $scope.finished = false;

    $scope.cataName = '';

    LogSvc.log('listLoad', $rootScope.activeTag, $rootScope.gh).then();

    $scope.filters = ['', ''];

    ProductSvc.getCatalogs($scope.id).then(function success(res) {
        $scope.catalog = res;
        if ($scope.subId) {
            $scope.cataName = $scope.catalog.childList[getIndex($scope.catalog.childList, 'id', $scope.subId)].name
        } else {
            $scope.cataName = $scope.catalog.name;
        }
    });

    ProductSvc.get($scope.subId || $scope.id, $scope.page, $scope.filters).then(function success(res) {
        $scope.prods = res.list;
        $scope.totalPages = res.totalPage;
        $scope.isLoading = false;
    });

    $scope.getData = function (filters, index) {
        var preIndex = index === 0 ? 1 : 0;
        $scope.filters[preIndex] = '';
        $scope.filters[index] = filters[index] === 'ASC' || filters[index] === '' ? 'DESC' : 'ASC';
        console.log(preIndex, $scope.filters);
        ProductSvc.get($scope.subId || $scope.id, $scope.page, $scope.filters).then(function success(res) {
            $scope.prods = res.list;
            $scope.totalPages = res.totalPage;
            $scope.isLoading = false;
            $scope.finished = false;
            $scope.page = 1;
        });
    };

    $(window).scroll(function (e) {
        var wH = $window.innerHeight, wT = $window.scrollY, sH = document.body.scrollHeight;
        if ((wH + wT) / sH > 0.75 && !$scope.isLoading && !$scope.finished) {
            if ($scope.page < $scope.totalPages) {
                $scope.page = $scope.page + 1;
                $scope.isLoading = true;
                ProductSvc.get($scope.subId || $scope.id, $scope.page, $scope.filters).then(function success(res) {
                    $scope.prods = $scope.prods.concat(res.list);
                    $scope.isLoading = false;
                });
            } else {
                $scope.finished = true;
                $scope.isLoading = false;
            }
        }
    })
}]);