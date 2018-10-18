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
    $scope.selectedOrder = '';
    $scope.action = '';

    $scope.sysMsg = {
        show: false,
        content: ''
    };

    $scope.msg = {
        show: false,
        title: '',
        content: '',
        confirm: '确定',
        cancel: '取消',
        fn: function () {
            OrderSvc.orderOpt($scope.selectedOrder.orderNo, $scope.action).then(function success(res) {
                $scope.sysMsg.content = res.msg;
                $scope.sysMsg.show = true;
                if (res.code === '200') {
                    var index = getIndex($scope.orders, 'orderNo', res.order.orderno);
                    $scope.orders[index].orderStatus = res.order.orderstatus;
                } else {
                }
            })
        }
    };

    ProductSvc.getRecommends().then(function success(res) {
        $scope.prods = res.list.slice(0, 12);
        $scope.getData(1);
    });
    OrderSvc.getOrderList($scope.user, '').then(function success(res) {
        if (res.code === '200') {
            $scope.orders = res.result;
            console.log($scope.orders);
        } else if (res.code === '201') {
            $location.path('/login');
        }
    });

    $scope.showMsg = function (opt, order, action) {
        $scope.msg.show = true;
        $scope.msg.content = opt.content;
        $scope.selectedOrder = order;
        $scope.action = action;
    };

    $scope.showSysMsg = function (opt) {
        $scope.sysMsg = opt
    };

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
    }
}]);