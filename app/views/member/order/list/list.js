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

    ProductSvc.getRecommends().then(function success(res) {
        $scope.recommends = res.list;
    })
    OrderSvc.getOrderList($scope.user, '').then(function success(res) {
        if (res.code === '200') {
            $scope.orders = res.result;
        } else if (res.code === '201') {
            $location.path('/login');
        }
    })
}]);