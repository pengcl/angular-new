"use strict";

appServices.factory("OrderSvc", ['$http', '$q', function ($http, $q) {
    var service = {};

    service.getCounts = function (receiverMobile) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.get('/api/product/findOrderStatusCounts.ht?receiverMobile=' + receiverMobile).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getOrderList = function (receiverMobile, orderStatus) {//获取订单列表 promise对象
        var d = $q.defer();
        $http.get('/api/order/getActivityOrder.ht?recieverMobile=' + receiverMobile + '&orderStatus=' + orderStatus).success(function (data) {
            return d.resolve(angular.fromJson(data));
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    /*service.getOrder = function (orderNo) {
        var d = $q.defer();
        $http.get('/api/order/getSalesOrder.ht?orderNo=' + orderNo).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };*/

    service.getOrder = function (orderNo) {
        var d = $q.defer();
        $http.get('/api/order/getSalesOrderDetail.ht?orderNo=' + orderNo).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.exchange = function (memberId, productId, productFlowPriceId) {
        var d = $q.defer();
        $http.get('/api/order/rechargeGiveFlow.ht?memberId=' + memberId + '&productId=' + productId + '&productFlowPriceId=' + productFlowPriceId + '&channelCode=?&category=').success(function (data) {
            return d.resolve(angular.fromJson(data));
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getLogistics = function (orderNo) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.get('/api/product/findLogistics.ht?orderNo=' + orderNo).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.submit = function (body) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: '/api/productinf/submitIntentOrder.ht',
            data: $.param(body),
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
        }).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);