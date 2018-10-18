"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/checkout', { //app首页
            templateUrl: 'views/checkout/checkout.html',
            controller: "checkoutController"
        });
}]).controller('checkoutController', ['$scope', '$rootScope', '$interval', '$location', '$cookieStore', 'LogSvc', 'AuthSvc', 'OrderSvc', 'ProductSvc', function ($scope, $rootScope, $interval, $location, $cookieStore, LogSvc, AuthSvc, OrderSvc, ProductSvc) {

    $scope.itemForm = {
        productId: '',
        totalQuantity: 1,
        receiverName: '',
        receiverMobile: '',
        code: '',
        receiverCity: '',
        receiverRoom: '',
        feedback: '',
        condition: '',
        payType: 1,
        buyerMemo: '',
        isHasInvoice: 0,
        invoiceType: 0,
        invoiceTitle: '',
        invoicecontent: '',
        activeTag: $rootScope.activeTag,
        gh: $rootScope.gh
    };

    var $container = $("html,body");
    $container.animate({scrollTop: 0});

    $scope.prod = $cookieStore.get('itemForm');

    LogSvc.log('checkoutLoad', $rootScope.activeTag, $rootScope.gh, $scope.prod.productId).then();

    if (!$scope.prod) {
        $location.path('/');
    } else {
        $scope.itemForm.productId = $scope.prod.productId;
        $scope.itemForm.totalQuantity = $scope.prod.totalQuantity;

        if ($scope.prod.attrs) {
            $scope.attrs = JSON.parse($scope.prod.attrs);
            $scope.attrs.forEach(function (item) {
                if ($scope.itemForm.condition) {
                    $scope.itemForm.condition = $scope.itemForm.condition + ';' + item.id + ':' + item.selected.id;
                } else {
                    $scope.itemForm.condition = item.id + ':' + item.selected.id;
                }
            });
        }
    }

    $scope.address = $cookieStore.get('address') || {
        name: '',
        mobile: '',
        code: '',
        city: '',
        room: '',
        feedback: ''
    };

    $scope.invoice = {
        need: false,
        name: '',
        type: 0,
        no: ''
    };


    $scope.showSelector = function () {
        $scope.show = true;
        LogSvc.log('showSelector', $rootScope.activeTag, $rootScope.gh, $scope.prod.productId).then();
    };

    $scope.activeText = "获取验证码";
    $scope.activeClass = true;

    var second = 59, timePromise = undefined;
    $scope.getCode = function (e, mobile) {
        if ($(e.currentTarget).hasClass("disabled")) {
            return false;
        }
        LogSvc.log('getCode', $rootScope.activeTag, $rootScope.gh, $scope.prod.productId).then();
        $scope.activeClass = false;
        timePromise = $interval(function () {
            if (second <= 0) {
                $interval.cancel(timePromise);
                timePromise = undefined;

                second = 59;
                $scope.activeText = "重发验证码";
                $scope.activeClass = true;
            } else {
                $scope.activeText = second;
                $scope.activeClass = false;
                second--;

            }
        }, 1000, 100);
        AuthSvc.getCode(mobile).then(function success(data) {
        });
    };

    $scope.invoiceShow = false;
    $scope.showInvoice = function () {
        $scope.invoiceShow = !$scope.invoiceShow;
        LogSvc.log('showInvoice', $rootScope.activeTag, $rootScope.gh, $scope.prod.productId).then();
    };

    $scope.setType = function (type) {
        $scope.invoice.type = type;
        LogSvc.log('setType', $rootScope.activeTag, $rootScope.gh, $scope.prod.productId).then();
    };

    $scope.$watch('area', function (n, o) {
        if (n) {
            $scope.address.city = n;
        }
    }, true);

    $scope.$watch('address', function (n, o) {
        if (n) {
            $scope.address = n;
            $scope.itemForm.receiverCity = $scope.address.city;
            $scope.itemForm.receiverRoom = $scope.address.room;
            $scope.itemForm.receiverName = $scope.address.name;
            $scope.itemForm.receiverMobile = $scope.address.mobile;
            $scope.itemForm.code = $scope.address.code;
            $scope.itemForm.feedback = $scope.address.feedback;
            $scope.invoice.name = $scope.address.name;
            $cookieStore.put('address', $scope.address);
        }
    }, true);

    /*$scope.$watch('invoice', function (n, o) {
        if (n) {
            $scope.itemForm.isHasInvoice = n.need;
            $scope.itemForm.invoiceType = n.type;
            $scope.itemForm.invoiceTitle = n.name;
            $scope.itemForm.invoicecontent = n.no;
            console.log($scope.itemForm);
        }
    }, true);*/

    $scope.cancel = function () {
        $scope.showInvoice();
        $scope.invoice.need = false;
    };

    $scope.isSave = false;
    $scope.save = function () {
        $scope.isSave = true;
        if ($scope.invoiceForm.$invalid) {
            return false;
        }

        $scope.itemForm.isHasInvoice = $scope.invoice.need ? 1 : 0;
        $scope.itemForm.invoiceType = $scope.invoice.type;
        $scope.itemForm.invoiceTitle = $scope.invoice.name;
        $scope.itemForm.invoicecontent = $scope.invoice.no;

        $scope.showInvoice();
        $scope.invoice.need = true;

        LogSvc.log('save', $rootScope.activeTag, $rootScope.gh, $scope.prod.productId).then();
    };

    $scope.resultShow = false;
    $scope.showResult = function () {
        $scope.resultShow = !$scope.resultShow;
        LogSvc.log('showResult', $rootScope.activeTag, $rootScope.gh, $scope.prod.productId).then();
    };

    $scope.isSubmit = false;
    $scope.loading = false;
    $scope.submit = function () {
        $scope.isSubmit = true;
        if ($scope.loadding || $scope.orderForm.$invalid) {
            return false;
        }

        LogSvc.log('submit', $rootScope.activeTag, $rootScope.gh, $scope.prod.productId).then();
        $scope.loading = true;
        OrderSvc.submit($scope.itemForm).then(function success(res) {
            $scope.loading = false;
            if (res.code === '200') {
                $location.url("/success?orderNo=" + res.orderNo);
            } else {
                $scope.resultMsg = res.msg;
                $scope.address.code = '';
                $scope.showResult();
                $container.animate({scrollTop: 0});
            }
        });
    }
}]);