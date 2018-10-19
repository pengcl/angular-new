"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/index', { //app首页
            templateUrl: 'views/index/index.html',
            controller: "indexController"
        });
}]).controller('indexController', ['$scope', '$rootScope', 'LogSvc', 'ProductSvc', function ($scope, $rootScope, LogSvc, ProductSvc) {

    $scope.floor_1 = false;
    $scope.floor_2 = false;
    $scope.floor_3 = false;

    $scope.imgUrls = [
        {
            img: '/static/images/banner/1.jpg',
            url: '/list?id=10000097480440'
        }, {
            img: '/static/images/banner/2.jpg',
            url: '/list?id=10000097480426'
        }, {
            img: '/static/images/banner/3.jpg',
            url: '/item?id=10000098601144'
        }
    ];

    var $container = $("html,body");
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        if (scrollTop >= 1080 && scrollTop < 2350 && !$scope.floor_1) {
            $scope.floor_1 = true;
            LogSvc.log('indexScroll_1', $rootScope.activeTag, $rootScope.gh).then();
        }

        if (scrollTop >= 2350 && scrollTop < 3640 && !$scope.floor_2) {
            $scope.floor_2 = true;
            LogSvc.log('indexScroll_2', $rootScope.activeTag, $rootScope.gh).then();
        }

        if (scrollTop >= 3640 && !$scope.floor_3) {
            $scope.floor_3 = true;
            LogSvc.log('indexScroll_3', $rootScope.activeTag, $rootScope.gh).then();
        }
    });

    LogSvc.log('indexLoad', $rootScope.activeTag, $rootScope.gh).then();

    ProductSvc.getCatalogs().then(function success(res) {
        var catalogs = [null, null, null];
        var count = 0;
        res.childList.forEach(function (item) {
            var catalog = {};
            ProductSvc.get(item.id).then(function success(product) {
                catalog.id = item.id;
                catalog.name = item.name;
                catalog.sub = item.childList;
                catalog.products = product.list;
                if (item.id == '10000098490415') {
                    catalogs[0] = catalog;
                }
                if (item.id == '10000097480440') {
                    catalogs[1] = catalog;
                }
                if (item.id == '10000097480426') {
                    catalogs[2] = catalog;
                }
                count = count + 1;
                if (count === res.childList.length) {
                    $scope.catalogs = catalogs;
                }
            })
        })
    });

    ProductSvc.getRecommends().then(function success(res) {
        $scope.recommends = res.list;
    })
}]);