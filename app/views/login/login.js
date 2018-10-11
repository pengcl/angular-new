"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/login', { //app首页
            templateUrl: 'views/login/login.html',
            controller: "loginController"
        });
}]).controller('loginController', ['$scope', '$location', '$interval', '$cookieStore', 'AuthSvc', function ($scope, $location, $interval, $cookieStore, AuthSvc) {
    $scope.isSubmit = false;
    $scope.loading = false;

    $scope.activeText = "获取验证码";
    $scope.activeClass = true;

    var second = 59, timePromise = undefined;
    $scope.getCode = function (e, mobile) {
        if ($(e.currentTarget).hasClass("disabled")) {
            return false;
        }
        AuthSvc.getCode(mobile).then(function success(data) {
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
        });
    };

    $scope.submit = function (mobile, code) {
        $scope.isSubmit = true;
        if ($scope.loginForm.invalid) {
            return false;
        }
        $scope.loading = true;
        AuthSvc.checkCode(mobile, code).then(function success(res) {
            if (res.code === '200') {
                $cookieStore.put('user', mobile);
                $location.path('/mem/odr/list');
            } else {
                $scope.loginError = res.msg;
            }
        })
    };

    $scope.keyPress = function (e, mobile, code) {
        if (e.keyCode === 13) {
            $scope.submit(mobile, code);
        }
    }
}]);