"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/mem/odr/list', { //app首页
            templateUrl: 'views/member/order/list/list.html',
            controller: "memOdrListController"
        });
}]).controller('memOdrListController', ['$scope', '$location', 'AuthSvc', 'ProductSvc', 'OrderSvc', function ($scope, $location, AuthSvc, ProductSvc, OrderSvc) {

    $scope.user = AuthSvc.isLogin();

    $scope.page = 1;

    ProductSvc.getRecommends().then(function success(res) {
        $scope.prods = res.list.slice(0, 12);
        $scope.getData(1);
    });
    OrderSvc.getOrderList($scope.user, '').then(function success(res) {
        if (res.code === '200') {
            $scope.orders = res.result;
        } else if (res.code === '201') {
            $location.path('/login');
        }
    });

    $scope.prev = function () {
        if ($scope.page === 1) {
            return false;
        }
        $scope.page = $scope.page - 1;
        $scope.getData($scope.page);
    };

    $scope.next = function () {
        if ($scope.page === 3) {
            return false;
        }
        $scope.page = $scope.page + 1;
        $scope.getData($scope.page);
    };

    $scope.getData = function (page) {
        $scope.recommends = $scope.prods.slice((page - 1) * 4, page * 4);
        console.log($scope.recommends);
    }
}]);