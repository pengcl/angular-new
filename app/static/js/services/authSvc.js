"use strict";
appServices.factory("AuthSvc", ['$http', '$cookieStore', '$location', '$q', function ($http, $cookieStore, $location, $q) {
    var service = {};

    service.isLogin = function () {
        var user = $cookieStore.get('user') || false;
        if (user) {
            return user;
        } else {
            if ($location.path() === '/login') {
                return false;
            }
            $location.path('/login');
        }
    };

    service.getCode = function (mobile) {
        var d = $q.defer();
        $http.get('/api/productinf/sendValidCode.ht?recieverMobile=' + mobile).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.checkCode = function (mobile, code) {//获取订单列表 promise对象
        var d = $q.defer();
        $http.get('/api/order/getActivityOrder.ht?recieverMobile=' + mobile + '&code=' + code).success(function (data) {
            return d.resolve(angular.fromJson(data));
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);