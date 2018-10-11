"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/success', { //app首页
            templateUrl: 'views/success/success.html',
            controller: "successController"
        });
}]).controller('successController', ['$scope', '$window', '$location', 'OrderSvc', function ($scope, $window, $location, OrderSvc) {

    OrderSvc.getOrder($location.search().orderNo).then(function success(res) {
        $scope.order = res.salesOrder;
        $scope.product = res.product;
    });

    $scope.back = function () {
        window.history.back();
    }
}]);