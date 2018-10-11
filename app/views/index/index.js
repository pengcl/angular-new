"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/index', { //app首页
            templateUrl: 'views/index/index.html',
            controller: "indexController"
        });
}]).controller('indexController', ['$scope', '$rootScope', 'LogSvc', 'ProductSvc', function ($scope, $rootScope, LogSvc, ProductSvc) {
    $scope.imgUrls = ['/static/images/banner/1.jpg', '/static/images/banner/2.jpg', '/static/images/banner/3.jpg'];

    LogSvc.log('indexLoad', $rootScope.activeTag, $rootScope.gh).then();

    ProductSvc.getCatalogs().then(function success(res) {
        var catalogs = [];
        var count = 0;
        res.childList.forEach(function (item) {
            var catalog = {};
            ProductSvc.get(item.id).then(function success(product) {
                catalog.id = item.id;
                catalog.name = item.name;
                catalog.sub = item.childList;
                catalog.products = product.list;
                catalogs.push(catalog);
                count = count + 1;
                if (count === res.childList.length) {
                    console.log(catalogs);
                    $scope.catalogs = catalogs;
                }
            })
        })
    });

    ProductSvc.getRecommends().then(function success(res) {
        $scope.recommends = res.list;
    })
}]);